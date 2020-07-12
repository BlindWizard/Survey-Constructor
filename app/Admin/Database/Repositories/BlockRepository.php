<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Repositories\BlockRepositoryContract;
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
    /**
     * @inheritDoc
     */
    public function findById(string $blockId): ?BlockContract
    {
        $block = Block::query()->find($blockId);/** @var Block $block */

        return  $block;
    }

    /**
     * @inheritDoc
     */
    public function findContainerBySlotId(string $slotId): ?BlockContract
    {
        $block = Block::query()->whereHas(Block::REL_DATA, function ($query) use ($slotId) {
            $query->whereRaw("data->'slots' ?? '$slotId'");
        })->get()->first(); /** @var Block $block */

        return $block;
    }

    /**
     * @inheritDoc
     */
    public function save(BlockContract $element): BlockContract
    {
        DB::beginTransaction();
        try {
            $model           = new Block();
            $model->id       = $element->getId();
            $model->parent_id  = $element->getParentId();
            $model->page_id = $element->getPageId();
            $model->position = $element->getPosition();
            $model->type     = $element->getType();
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
    public function getBlocksByParentId(string $pageId): array
    {
        $models = Block::query()->where(Block::ATTR_PARENT_ID, '=', $pageId)->orderBy(Block::ATTR_POSITION)->get()->all();/** @var Block[] $models */

        return $models;
    }

    /**
     * @inheritDoc
     */
    public function findLastBlock(string $pageId): ?BlockContract
    {
        $block = Block::query()->where(Block::ATTR_PARENT_ID, '=', $pageId)->orderBy(Block::ATTR_POSITION, 'DESC')->first();/** @var BlockContract $block */

        return $block;
    }

    /**
     * @inheritDoc
     */
    public function setElementData(string $blockId, array $data): BlockContract
    {
        $block = Block::query()->find($blockId);/** @var Block $block */

        $children = [];
        if (BlockContract::TYPE_CONTAINER === $block->getType()) {
            $children = $block->getChildren();
        }

        $blockData = BlockData::query()->find($blockId);/** @var BlockData $blockData */
        $blockData->data = \GuzzleHttp\json_encode($data);
        $blockData->save();

        $block->refresh();
        if (BlockContract::TYPE_CONTAINER === $block->getType()) {
            $newChildren = array_column($block->getChildren(), Block::ATTR_ID);
            foreach ($children as $child) {
                if (false === in_array($child->getId(), $newChildren)) {
                    $this->deleteElement($child->getId());
                }
            }
        }

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
        $block->saveOrFail();
    }

    /**
     * @inheritDoc
     */
    public function setElementParent(string $blockId, string $parentId): void
    {
        $block = Block::query()->find($blockId);/** @var Block $block */
        $block->parent_id = $parentId;
        $block->saveOrFail();
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