<?php

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Reporitories\BlockRepositoryContract;
use App\Admin\Database\Models\Block;
use App\Admin\Database\Models\BlockData;
use App\Admin\DTO\Option;
use App\Admin\DTO\OptionsList;
use App\Admin\Exceptions\BlockTypeException;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

class BlockRepository implements BlockRepositoryContract
{
    /**
     * @inheritDoc
     */
    public function save(BlockContract $element): BlockContract
    {
        DB::beginTransaction();
        try {
            $model            = new Block();
            $model->id        = Uuid::uuid4()->toString();
            $model->survey_id = $element->getSurveyId();
            $model->position  = $element->getPosition();
            $model->type      = $element->getType();
            $model->saveOrFail();

            $data = new BlockData();
            $data->id = $model->id;
            $data->data = \GuzzleHttp\json_encode($element->getData());
            $data->saveOrFail();

            DB::commit();
        }
        catch (\Throwable $e) {
            DB::rollBack();

            throw $e;
        }

        return $model;
    }

    /**
     * @inheritDoc
     */
    public function getSurveyBlocks(string $surveyId): array
    {
        $models = Block::query()->where(Block::ATTR_SURVEY_ID, '=', $surveyId)->orderBy(Block::ATTR_POSITION)->get()->all();/** @var Block[] $models */
        $result = [];
        foreach ($models as $model) {
            switch ($model->type) {
                case BlockContract::TYPE_OPTIONS_LIST:
                    $optionsList = new OptionsList();
                    $optionsList->id = $model->id;
                    $optionsList->surveyId = $model->getSurveyId();
                    $optionsList->position = $model->getPosition();

                    foreach ($model->getData()['options'] as $optionData) {
                        $option = new Option();
                        $option->id = $optionData['id'];
                        $option->text = $optionData['text'];
                        $option->surveyId = $optionsList->surveyId;
                        $option->position = $optionData['position'];

                        $optionsList->options[] = $option;
                    }

                    $result[] = $optionsList;
                    break;
                default:
                    throw new BlockTypeException('Can\'t transform block from model ' . var_export($model, true));
            }
        }

        return $result;
    }

    /**
     * @inheritDoc
     */
    public function findLastBlock(string $surveyId): ?BlockContract
    {
        $block = Block::query()->where(Block::ATTR_SURVEY_ID, '=', $surveyId)->orderBy(Block::ATTR_POSITION, 'DESC')->first();/** @var BlockContract $block */

        return $block;
    }
}