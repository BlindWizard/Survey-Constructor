<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Admin\Database\Models\BlockData;
use App\Admin\Database\Models\Page;
use App\Admin\Database\Models\SurveyStatistic;
use App\Admin\DTO\BlockOptionStatistic;
use App\Admin\DTO\BlocksStatistics;
use App\Admin\DTO\BlockStatistic;
use App\Admin\DTO\StatisticSampleAction;
use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Database\Models\Event;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SurveyStatisticRepository implements SurveyStatisticRepositoryContract
{
    /** @var SurveyRepositoryContract */
    protected $surveyRepository;

    /** @var ApiTokenRepositoryContract */
    protected $tokenRepository;

    /**
     * @param SurveyRepositoryContract   $surveyRepository
     * @param ApiTokenRepositoryContract $apiTokenRepository
     */
    public function __construct(SurveyRepositoryContract $surveyRepository, ApiTokenRepositoryContract $apiTokenRepository)
    {
        $this->surveyRepository = $surveyRepository;
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

        $object->lastUpdated = !empty($statistic) ? (new Carbon($statistic->updated_at))->format(Carbon::DEFAULT_TO_STRING_FORMAT): null;

        return $object;
    }

    /**
     * @inheritDoc
     */
    public function findBlockStatisticsBySurveyId(string $surveyId, ?Carbon $dateFrom, ?Carbon $dataTo, ?array $options): array
    {
        $survey = $this->surveyRepository->findById($surveyId);

        $dateFromSql = (null !== $dateFrom) ? ' AND created_at >= \'' . $dateFrom->format('Y-m-d') . '\'' : '';
        $dateToSql = (null !== $dataTo) ? ' AND created_at <= \'' . $dataTo->format('Y-m-d 23:59:59') . '\'' : '';

        $samplesSql = '';

        $samples = null;
        if ($options) {
            $optionsData = [];
            foreach ($options as $blockId => $optionIds) {
                foreach ($optionIds as $option) {
                    $optionsData[] = ['blockId' => $blockId, 'option' => $option];
                }
            }

            $samplesData = DB::select(<<<SQL
                WITH
                    last_actions AS (
                        SELECT * FROM (
                            SELECT id,
                                survey_id,
                                client_id,
                                token_id,
                                type,
                                data,
                                created_at,
                                updated_at,
                                rank() OVER (PARTITION BY client_id, data ->> 'blockId' ORDER BY updated_at DESC) AS rank
                            FROM events
                            WHERE    survey_id = :surveyId
                                 AND type IN ('optionsListSelect', 'optionSelect', 'enterText')
                                 $dateFromSql
                                 $dateToSql
                        ) as t
                        WHERE t.rank = 1
                    ),

                    faceted AS (
                        SELECT
                             client_id,
                             json_build_object(
                                     'blockId',
                                     data ->> 'blockId',
                                     'option',
                                     CASE WHEN type = 'optionsListSelect'
                                              THEN data ->> 'optionId'
                                          WHEN type = 'optionSelect' AND (data -> 'checked')::bool IS TRUE
                                              THEN '1'
                                          WHEN type = 'optionSelect' AND (data -> 'checked')::bool IS FALSE
                                              THEN '0'
                                          WHEN type = 'enterText'
                                              THEN data ->> 'text'
                                         END
                                 )
                             as options
                        FROM last_actions
                        WHERE survey_id = :surveyId AND
                            type IN ('optionsListSelect', 'optionSelect', 'enterText')
                    ),
                    sampled AS (
                        SELECT 
                               client_id,
                               jsonb_agg(options) as options
                        FROM faceted
                        GROUP BY client_id
                    )

                SELECT client_id FROM sampled 
                WHERE options @> :options;
            SQL, ['surveyId' => $surveyId, 'options' => \GuzzleHttp\json_encode($optionsData)]);

            $samples = [];
            foreach ($samplesData as $sampleData) {
                $samples[] = $sampleData->{'client_id'};
            }
        }

        if (null !== $samples) {
            if (count($samples) > 0) {
                $samplesSql = ' AND client_id IN (' . implode(',', array_map(function (string $sampleId) {
                        return '\'' . $sampleId . '\'';
                    }, $samples)) . ')';
            }
            else {
                return [];
            }
        }

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
                        created_at,
                        updated_at,
                        rank() OVER (PARTITION BY client_id, data->>'blockId' ORDER BY updated_at DESC) AS rank
                    FROM
                        events
                    WHERE
                            survey_id = :surveyId
                        AND type IN ('optionsListSelect', 'optionSelect', 'enterText')
                        $dateFromSql
                        $dateToSql
                        $samplesSql
                )
            
            SELECT
                a.client_id,
                a.token_id,
                a.type,
                a.data as action_data,
                d.data as block_data,
                b.position as position,
                (SELECT MIN(created_at) FROM last_actions) as start_date,
                (SELECT MAX(created_at) FROM last_actions) as last_date
            FROM
                last_actions a
            INNER JOIN blocks b
                ON (a.data->>'blockId')::uuid = b.id
            INNER JOIN blocks_data d 
                ON d.id = b.id
            WHERE
                rank = 1
            ORDER BY
                b.position
        SQL, ['surveyId' => $surveyId]);

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
                        $blockStat->blockLabel = !empty($blockData['text']) ? $blockData['text'] : (__('Block') . ' ' . $jsonData->{'position'});
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
                                    $optionStat->count++;
                                    $optionStat->samples[] = $jsonData->{'client_id'};
                                }
                            }

                            if (false === $found) {
                                $newOption = new BlockOptionStatistic();
                                $newOption->optionId = $optionData['id'];
                                $newOption->label = $optionData['text'];
                                $newOption->count = 1;
                                $newOption->samples[] = $jsonData->{'client_id'};

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
                        $optionStat->optionId = 1;
                        $optionStat->label = 'Checked';
                        $optionStat->count = 0;
                        $blockStat->options[] = $optionStat;

                        $optionStat = new BlockOptionStatistic();
                        $optionStat->optionId = 0;
                        $optionStat->label = 'Not checked';
                        $optionStat->count = 0;
                        $blockStat->options[] = $optionStat;
                    }
                    else {
                        $blockStat = $byToken[$tokenId][$actionData['blockId']];
                    }

                    if ($actionData['checked']) {
                        $blockStat->options[0]->count++;
                        $blockStat->options[0]->samples[] = $jsonData->{'client_id'};
                    }
                    else {
                        $blockStat->options[1]->count++;
                        $blockStat->options[1]->samples[] = $jsonData->{'client_id'};
                    }

                    break;
                case ApiEventContract::ENTER_TEXT:
                    if (false === array_key_exists($actionData['blockId'], $byToken[$tokenId])) {
                        $blockStat = new BlockStatistic();
                        $blockStat->blockId = $actionData['blockId'];
                        $blockStat->blockLabel = $blockData['label'] ?: __('Block') . ' ' . $jsonData->{'position'};
                        $blockStat->type = ApiEventContract::ENTER_TEXT;
                    }
                    else {
                        $blockStat = $byToken[$tokenId][$actionData['blockId']];
                    }

                    $found = false;
                    foreach ($blockStat->options as $optionStat) {
                        if ($optionStat->label === $actionData['text']) {
                            $optionStat->count++;
                            $optionStat->samples[] = $jsonData->{'client_id'};
                            $found = true;
                            break;
                        }
                    }

                    if (false === $found) {
                        $optionStat           = new BlockOptionStatistic();
                        $optionStat->optionId = $actionData['text'];
                        $optionStat->label    = $actionData['text'];
                        $optionStat->count    = 1;
                        $blockStat->options[] = $optionStat;
                        $optionStat->samples[] = $jsonData->{'client_id'};
                    }
                    break;
                default:
                    throw new \Exception('Unknown stat data');
            }

            $byToken[$tokenId][$actionData['blockId']] = $blockStat;
        }

        foreach ($byToken as $blockStats) {
            foreach ($blockStats as $blockStat) {
                $total = 0;
                foreach ($blockStat->options as $optionStat) {
                    $total += $optionStat->count;
                }

                foreach ($blockStat->options as $optionStat) {
                    $optionStat->percent = round($optionStat->count * 100 / $total, 2);
                }
            }
        }

        $tokens = $this->tokenRepository->findByIds(array_keys($byToken));

        $result = [];
        foreach ($byToken as $tokenId => $blocksStat) {
            $tokenData = new BlocksStatistics();
            $tokenData->surveyId = $surveyId;
            $tokenData->surveyName = $survey->getTitle();
            $tokenData->tokenId = $tokenId;
            $tokenData->tokenLabel = $tokens[$tokenId]->getName();
            [$tokenData->startDate, $tokenData->lastDate] = [(new Carbon($jsonData->{'start_date'}))->format('m/d/Y'), (new Carbon($jsonData->{'last_date'}))->format('m/d/Y')];

            foreach ($blocksStat as $blockStat) {
                $tokenData->blocks[] = $blockStat;
            }

            $result[] = $tokenData;
        }

        return $result;
    }

    /**
     * @inheritDoc
     */
    public function findStatisticsSampleBySurveyId(string $surveyId, string $sampleId): array
    {
        $events = Event::query()
            ->where(Event::ATTR_SURVEY_ID, '=', $surveyId)
            ->where(Event::ATTR_CLIENT_ID, '=', $sampleId)
            ->orderBy(Event::ATTR_UPDATED_AT)
            ->get()
            ->all()
        ;/** @var Event[] $events */

        $blockIds = [];
        $pagesIds = [];
        foreach ($events as $event) {
            if (!empty($event->getData()['blockId'])) {
                $blockIds[] = $event->getData()['blockId'];
            }

            if (!empty($event->getData()['pageId'])) {
                $pagesIds[] = $event->getData()['pageId'];
            }
        }

        $blocksData = BlockData::query()
            ->whereIn(BlockData::ATTR_ID, $blockIds)
            ->get()
            ->keyBy(BlockData::ATTR_ID)
            ->all()
        ;/** @var BlockData[] $blocksData */

        $pagesData = Page::query()
            ->whereIn(Page::ATTR_ID, $pagesIds)
            ->get()
            ->keyBy(Page::ATTR_ID)
            ->all()
        ;/** @var Page[] $pagesData */

        $sample = [];
        foreach ($events as $event) {
            $sampleAction = new StatisticSampleAction();
            switch ($event->type) {
                case ApiEventContract::RUN:
                    $sampleAction->actionLabel = __('Start survey');
                    $sampleAction->blockLabel = null;
                    break;
                case ApiEventContract::OPTION_SELECT:
                    $sampleAction->actionLabel = __('Check option');
                    $sampleAction->blockLabel = $blocksData[$event->getData()['blockId']]->getData()['text'];
                    break;
                case ApiEventContract::OPTIONS_LIST_SELECT:
                    $sampleAction->actionLabel = __('Select option');

                    $listData = $blocksData[$event->getData()['blockId']]->getData();
                    foreach ($listData['options'] as $optionData) {
                        if ($optionData['id'] === $event->getData()['optionId']) {
                            $sampleAction->blockLabel = (!empty($listData['text']) ? $listData['text'] . ' : ' : '') . $optionData['text'];
                            break;
                        }
                    }

                    break;
                case ApiEventContract::ENTER_TEXT:
                    $sampleAction->actionLabel = __('Enter text');
                    $textFieldData = $blocksData[$event->getData()['blockId']]->getData();
                    $sampleAction->blockLabel = (!empty($textFieldData['label']) ? $textFieldData['label'] . ' : ' : '') . $event->getData()['text'];
                    break;
                case ApiEventContract::PREV_PAGE:
                    $sampleAction->actionLabel = __('Previous page');
                    $sampleAction->blockLabel = 'Step ' . ($pagesData[$event->getData()['pageId']]->step + 1);
                    break;
                case ApiEventContract::NEXT_PAGE:
                    $sampleAction->actionLabel = __('Next page');
                    $sampleAction->blockLabel = 'Step ' . ($pagesData[$event->getData()['pageId']]->step + 1);

                    break;
                default:
                    throw new \Exception('Undefined event type');
            }

            $sampleAction->timestamp = (new Carbon($event->updated_at))->format(Carbon::DEFAULT_TO_STRING_FORMAT);
            $sample[] = $sampleAction;
        }

        return $sample;
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