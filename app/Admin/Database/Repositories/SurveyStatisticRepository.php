<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Admin\Database\Models\SurveyStatistic;
use App\Admin\DTO\BlockOptionStatistic;
use App\Admin\DTO\BlocksStatistics;
use App\Admin\DTO\BlockStatistic;
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
                        client_id,
                        token_id,
                        type,
                        data,
                        updated_at,
                        rank() OVER (PARTITION BY client_id, data->>'blockId' ORDER BY updated_at DESC) AS rank
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
                d.data as block_data,
                b.position as position
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
                    if (false === array_key_exists($actionData['blockId'], $byToken[$tokenId])) {
                        $blockStat = new BlockStatistic();
                        $blockStat->blockId = $actionData['blockId'];
                        $blockStat->blockLabel = $blockData['text'] ?: __('Block') . ' ' . $jsonData->{'position'};
                        $blockStat->type = ApiEventContract::OPTIONS_LIST_SELECT;
                    }
                    else {
                        $blockStat = $byToken[$tokenId][$actionData['blockId']];
                    }

                    foreach ($blockData['options'] as $optionData) {
                        if ($optionData['id'] === $actionData['optionId']) {
                            $found = false;
                            foreach ($blockStat->options as $optionStat) {
                                if ($optionStat->optionId === $actionData['optionId']) {
                                    $found = true;
                                    $blockStat->count++;
                                }
                            }

                            if (false === $found) {
                                $newOption = new BlockOptionStatistic();
                                $newOption->optionId = $optionData['id'];
                                $newOption->label = $optionData['text'];
                                $newOption->count = 1;

                                $blockStat->options[] = $newOption;
                            }
                        }
                    }

                    break;
                case ApiEventContract::OPTION_SELECT:
                    if (false === array_key_exists($actionData['blockId'], $byToken[$tokenId])) {
                        $blockStat = new BlockStatistic();
                        $blockStat->blockId = $actionData['blockId'];
                        $blockStat->blockLabel = $blockData['text'] ?: __('Block') . ' ' . $jsonData->{'position'};
                        $blockStat->type = ApiEventContract::OPTION_SELECT;

                        $optionStat = new BlockOptionStatistic();
                        $optionStat->optionId = 0;
                        $optionStat->label = 'Checked';
                        $optionStat->count = 0;
                        $blockStat->options[] = $optionStat;
                    }
                    else {
                        $blockStat = $byToken[$tokenId][$actionData['blockId']];
                    }

                    $blockStat->options[0]->count++;

                    break;
                default:
                    throw new \Exception('Unknown stat data');
            }

            $byToken[$tokenId][$actionData['blockId']] = $blockStat;
        }

        $tokens = $this->tokenRepository->findByIds(array_keys($byToken));

        $result = [];
        foreach ($byToken as $tokenId => $blocksStat) {
            $tokenData = new BlocksStatistics();
            $tokenData->tokenId = $tokenId;
            $tokenData->tokenLabel = $tokens[$tokenId]->getName();

            foreach ($blocksStat as $blockStat) {
                $tokenData->blocks[] = $blockStat;
            }

            $result[] = $tokenData;
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