<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Database\Models\Survey;

interface SurveyRepositoryContract
{
    /**
     * @param string $id
     *
     * @return Survey|null
     */
    public function findById(string $id): ?SurveyContract;

    /**
     * @param SurveyContract $survey
     *
     * @return void
     */
    public function save(SurveyContract $survey): void;

    /**
     * @param string $ownerId
     *
     * @return SurveyContract[]
     */
    public function getAvailableSurveys(string $ownerId): array;
}