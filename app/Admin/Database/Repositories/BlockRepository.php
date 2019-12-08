<?php

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Reporitories\BlockRepositoryContract;
use App\Admin\Database\Models\Block;
use Ramsey\Uuid\Uuid;

class BlockRepository implements BlockRepositoryContract
{
    /**
     * @inheritdoc
     */
    public function save(BlockContract $element): void
    {
        $model = new Block();
        $model->id = Uuid::uuid4()->toString();
        $model->survey_id = $element->getSurveyId();
        $model->position = $element->getPosition();

        $model->saveOrFail();
    }
}