<?php

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Reporitories\BlockRepositoryContract;
use App\Admin\Database\Models\Block;
use App\Admin\DTO\OptionsListBlock;
use App\Admin\Exceptions\BlockTypeException;
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
        $model->type = $element->getType();

        $model->saveOrFail();
    }

    /**
     * @inheritdoc
     */
    public function getSurveyBlocks(string $surveyId): array
    {
        $models = Block::query()->where(Block::ATTR_SURVEY_ID, '=', $surveyId)->orderBy(Block::ATTR_POSITION)->get()->all();/** @var Block[] $models */
        $result = [];
        foreach ($models as $model) {
            switch ($model->type) {
                case BlockContract::TYPE_OPTIONS_LIST:
                    $optionsList = new OptionsListBlock();
                    $optionsList->id = $model->id;
                    $optionsList->surveyId = $model->getSurveyId();
                    $optionsList->position = $model->getPosition();

                    $result[] = $optionsList;
                    break;
                default:
                    throw new BlockTypeException('Can\'t transform block from model ' . var_export($model, true));
            }
        }

        return $result;
    }

    /**
     * @inheritdoc
     */
    public function findLastBlock(string $surveyId): ?BlockContract
    {
        $block = Block::query()->where(Block::ATTR_SURVEY_ID, '=', $surveyId)->orderBy(Block::ATTR_POSITION, 'DESC')->first();/** @var BlockContract $block */

        return $block;
    }
}