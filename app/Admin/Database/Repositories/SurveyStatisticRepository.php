<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Admin\Database\Models\SurveyStatistic;
use App\Admin\DTO\BlocksStatistics;
use App\Admin\DTO\OptionSelectedStatistics;
use App\Api\Contracts\Entities\ApiEventContract;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SurveyStatisticRepository implements SurveyStatisticRepositoryContract
{
    /** @var ApiTokenRepositoryContract */
    public $tokenRepository;

    /**
     * @param ApiTokenRepositoryContract $apiTokenRepository
     */
    public function __construct(ApiTokenRepositoryContract $apiTokenRepository)
    {
        $this->tokenRepository = $apiTokenRepository;
    }

    /**
     * @inheritDoc
     */
    public function incrementRuns(string $surveyId, string $tokenId): void
    {
        $statistic = $this->findOrNew($surveyId, $tokenId);

        $statistic->runs_count++;
        $statistic->saveOrFail();
    }

    /**
     * @inheritDoc
     */
    public function incrementCompletes(string $surveyId, string $tokenId): void
    {
        $statistic = $this->findOrNew($surveyId, $tokenId);

        $statistic->completes_count++;
        $statistic->saveOrFail();
    }

    public function findStatisticsBySurveyId(string $surveyId):  \App\Admin\DTO\SurveyStatistic
    {
        /** @var SurveyStatistic[] $statistics */
        $statistics = SurveyStatistic::query()->where(SurveyStatistic::ATTR_SURVEY_ID, '=', $surveyId)->get()->all();

        $object = new \App\Admin\DTO\SurveyStatistic();
        foreach ($statistics as $statistic) {
            $object->runsCount += $statistic->runs_count;
            $object->completesCount += $statistic->completes_count;

            if ($object->lastUpdated < $statistic->updated_at) {
                $object->lastUpdated = $statistic->updated_at;
            }
        }

        $object->lastUpdated = (new Carbon($statistic->updated_at))->format(Carbon::DEFAULT_TO_STRING_FORMAT);

        return $object;
    }

    public function findBlockStatisticsBySurveyId(string $surveyId)
    {
        $bindings = ['surveyId' => $surveyId];

        $data = DB::select(<<<SQL
            WITH
                last_actions AS (
                    SELECT
                        id,
                        survey_id,
                        token_id,
                        type,
                        data,
                        updated_at,
                        rank() OVER (PARTITION BY data->>'blockId' ORDER BY updated_at DESC) AS rank
                    FROM
                        events
                    WHERE
                            survey_id = :surveyId
                        AND type IN ('optionsListSelect', 'optionSelect')
                )
            
            SELECT
                a.token_id,
                a.type,
                a.data as action_data,
                d.data as block_data
            FROM
                last_actions a
            INNER JOIN blocks b
                ON (a.data->>'blockId')::uuid = b.id
            INNER JOIN blocks_data d 
                ON d.id = b.id
            WHERE
                  rank = 1
            ORDER BY
                a.updated_at, b.position
        SQL, $bindings);

        $byToken = [];
        foreach ($data as $jsonData) {
            $actionData = \GuzzleHttp\json_decode($jsonData->{'action_data'}, true);
            $blockData = \GuzzleHttp\json_decode($jsonData->{'block_data'}, true);

            $tokenId = $jsonData->{'token_id'};
            if (false === array_key_exists($tokenId, $byToken)) {
                $byToken[$tokenId] = [];
            }

            switch ($jsonData->{'type'}) {
                case ApiEventContract::OPTIONS_LIST_SELECT:
                    $statId =  $actionData['blockId'] . '.' . $actionData['optionId'];
                    if (false === array_key_exists($statId, $byToken[$tokenId])) {
                        $blockStat = new OptionSelectedStatistics();
                        $blockStat->blockId = $actionData['blockId'];
                        $blockStat->blockLabel = $blockData['text'];
                        $blockStat->type = ApiEventContract::OPTIONS_LIST_SELECT;
                        $blockStat->count = 0;
                    }
                    else {
                        $blockStat = $byToken[$tokenId][$statId];
                    }

                    foreach ($blockData['options'] as $option) {
                        if ($option['id'] === $actionData['optionId']) {
                            $blockStat->valueLabel = $option['text'];
                            $blockStat->count++;
                        }
                    }

                    break;
                case ApiEventContract::OPTION_SELECT:
                    $statId =  $actionData['blockId'];
                    if (false === array_key_exists($statId, $byToken[$tokenId])) {
                        $blockStat = new OptionSelectedStatistics();
                        $blockStat->blockId = $actionData['blockId'];
                        $blockStat->blockLabel = $blockData['text'];
                        $blockStat->type = ApiEventContract::OPTION_SELECT;
                        $blockStat->count = 0;
                    }
                    else {
                        $blockStat = $byToken[$tokenId][$statId];
                    }

                    $blockStat->valueLabel = $blockData['text'];
                    $blockStat->count++;

                    break;
                default:
                    throw new \Exception('Unknown stat data');
            }

            $byToken[$tokenId][$statId] = $blockStat;
        }

        $tokens = $this->tokenRepository->findByIds(array_keys($byToken));

        $result = [];
        foreach ($byToken as $tokenId => $blocksStat) {
            $result = new BlocksStatistics();
            $result->tokenId = $tokenId;
            $result->tokenLabel = $tokens[$tokenId]->getValue();

            foreach ($blocksStat as $blockStat) {
                $result->blocks[] = $blockStat;
            }
        }

        return $result;
    }

    protected function findOrNew(string $surveyId, string $tokenId): SurveyStatistic
    {
        $statistic = SurveyStatistic::query()
            ->where(SurveyStatistic::ATTR_SURVEY_ID, '=', $surveyId)
            ->where(SurveyStatistic::ATTR_TOKEN_ID, '=', $tokenId)
            ->get()
            ->first();

        if (null === $statistic) {
            $statistic = new SurveyStatistic();
            $statistic->survey_id = $surveyId;
            $statistic->token_id = $tokenId;
            $statistic->saveOrFail();
        }

        return $statistic;
    }
}