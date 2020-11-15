<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Contracts\Entities\DataContract;
use App\Admin\Contracts\Entities\SurveyContract;

interface SurveyRepositoryContract
{
    /**
     * @param string $id
     *
     * @return SurveyContract|null
     */
    public function findById(string $id): ?SurveyContract;

    /**
     * @param string $blockId
     *
     * @return SurveyContract|null
     */
    public function findByBlockId(string $blockId): ?SurveyContract;

    /**
     * @param SurveyContract $survey
     *
     * @return void
     */
    public function save(SurveyContract $survey): void;

    /**
     * @param string $id
     */
    public function delete(string $id): void;

    /**
     * @param string $ownerId
     *
     * @return SurveyContract[]
     */
    public function getAvailableSurveys(string $ownerId): array;

    /**
     * @param string       $surveyId
     * @param DataContract $data
     *
     * @return DataContract
     */
    public function addData(string $surveyId, DataContract $data): DataContract;
}