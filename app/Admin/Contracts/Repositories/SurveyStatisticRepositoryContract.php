<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Database\Models\SurveyStatistic;
use App\Admin\DTO\StatisticSampleAction;

interface SurveyStatisticRepositoryContract
{
    /**
     * @param string $surveyId
     * @param string $tokenId
     *
     * @throws \Throwable
     */
    public function incrementRuns(string $surveyId, string $tokenId): void;

    /**
     * @param string $surveyId
     * @param string $tokenId
     *
     * @throws \Throwable
     */
    public function incrementCompletes(string $surveyId, string $tokenId): void;

    /**
     * @param string $surveyId
     *
     * @return \App\Admin\DTO\SurveyStatistic
     */
    public function findStatisticsBySurveyId(string $surveyId): \App\Admin\DTO\SurveyStatistic;

    /**
     * @param string $surveyId
     *
     * @return \App\Admin\DTO\BlocksStatistics[]
     */
    public function findBlockStatisticsBySurveyId(string $surveyId): array;

    /**
     * @param string $surveyId
     * @param string $sampleId
     *
     * @return StatisticSampleAction[]
     */
    public function findStatisticsSampleBySurveyId(string $surveyId, string $sampleId): array;
}