<?php

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Database\Models\Survey;
use App\Admin\Database\Models\Template;

class SurveyRepository implements SurveyRepositoryContract
{
    /**
     * @param string $id
     *
     * @return Template
     */
    public function findById(string $id): Survey
    {
        $survey = Survey::query()->where(['id' => $id])->first();/** @var Survey $survey */

        return  $survey;
    }

    /**
     * @param SurveyContract $survey
     *
     * @return void
     *
     * @throws \Throwable
     */
    public function save(SurveyContract $survey): void
    {
        $model = new Survey();
        $model->id = $survey->getId();
        $model->title = $survey->getTitle();
        $model->owner_id = $survey->getOwnerId();
        $model->created_at = $survey->getCreatedAt();
        $model->updated_at = $survey->getUpdatedAt();

        $model->saveOrFail();
    }
}