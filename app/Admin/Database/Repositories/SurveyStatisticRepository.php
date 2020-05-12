<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Admin\Database\Models\SurveyStatistic;
use Carbon\Carbon;
use DemeterChain\C;

class SurveyStatisticRepository implements SurveyStatisticRepositoryContract
{
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

    public function findBySurveyId(string $surveyId):  \App\Admin\DTO\SurveyStatistic
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