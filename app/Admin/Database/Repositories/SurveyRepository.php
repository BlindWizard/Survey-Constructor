<?php

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Database\Models\Survey;

class SurveyRepository implements SurveyRepositoryContract
{
    /**
     * @inheritDoc
     */
    public function findById(string $id): SurveyContract
    {
        $survey = Survey::query()->where(Survey::ATTR_ID, '=', $id)->first();/** @var Survey $survey */

        return $survey;
    }

    /**
     * @inheritDoc
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

    /**
     * @inheritDoc
     */
    public function getAvailableSurveys(string $ownerId): array
    {
        $surveys = Survey::query()->where(Survey::ATTR_OWNER_ID, '=', $ownerId)->get()->all();/** @var Survey[] $surveys */

        return $surveys;
    }
}