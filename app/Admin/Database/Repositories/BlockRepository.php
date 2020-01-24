<?php

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Reporitories\BlockRepositoryContract;
use App\Admin\Database\Models\Block;
use App\Admin\Database\Models\BlockData;
use App\Admin\DTO\Header;
use App\Admin\DTO\Option;
use App\Admin\DTO\OptionsList;
use App\Admin\Exceptions\BlockTypeException;
use App\Admin\Factories\BlockFactory;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

class BlockRepository implements BlockRepositoryContract
{
    /** @var BlockFactory */
    protected $factory;

    public function __construct(BlockFactory $factory)
    {
        $this->factory = $factory;
    }

    public function findById(string $blockId): ?BlockContract
    {
        $block = Block::query()->find($blockId);/** @var Block $block */

        return  $block;
    }

    /**
     * @inheritDoc
     */
    public function save(BlockContract $element): BlockContract
    {
        DB::beginTransaction();
        try {
            $model            = new Block();
            $model->id        = $element->getId();
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
            $result[] = $this->factory->getDTO($model);
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

    /**
     * @inheritDoc
     */
    public function setElementData(string $blockId, array $data): BlockContract
    {
        $blockData = BlockData::query()->find($blockId);/** @var BlockData $blockData */
        $blockData->data = \GuzzleHttp\json_encode($data);
        $blockData->save();

        $block = Block::query()->find($blockId);/** @var Block $block */

        return $block;
    }

    /**
     * @inheritDoc
     */
    public function setElementsPositions(array $blockPosition): void
    {
        DB::beginTransaction();
        try {
            foreach ($blockPosition as $blockId => $position) {
                $this->setElementPosition($blockId, $position);
            }

            DB::commit();
        }
        catch (\Throwable $e) {
            DB::rollBack();

            throw $e;
        }
    }

    /**
     * @inheritDoc
     */
    public function setElementPosition(string $blockId, int $position): void
    {
        $block = Block::query()->find($blockId);/** @var Block $block */
        $block->position = $position;
        $block->save();
    }

    /**
     * @inheritDoc
     */
    public function deleteElement(string $blockId)
    {
        DB::beginTransaction();
        try {
            Block::query()->find($blockId)->delete();
            BlockData::query()->find($blockId)->delete();

            DB::commit();
        }
        catch (\Throwable $e) {
            DB::rollBack();

            throw $e;
        }
    }
}