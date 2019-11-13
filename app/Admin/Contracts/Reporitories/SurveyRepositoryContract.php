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
     * @return Survey
     */
    public function findById(string $id): Survey;

    /**
     * @param SurveyContract $survey
     *
     * @return void
     */
    public function save(SurveyContract $survey): void;
}