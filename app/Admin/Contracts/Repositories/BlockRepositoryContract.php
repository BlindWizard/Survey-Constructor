<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Contracts\Entities\ActionContract;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Database\Models\Block;
use App\Admin\Exceptions\BlockTypeException;
use Throwable;

interface BlockRepositoryContract
{
    /**
     * @param string $blockId
     *
     * @return BlockContract|null
     */
    public function findById(string $blockId): ?BlockContract;

    /**
     * @param string $slotId
     *
     * @return BlockContract|null
     */
    public function findContainerBySlotId(string $slotId): ?BlockContract;

    /**
     * @param BlockContract $block
     *
     * @throws Throwable
     */
    public function save(BlockContract $block): BlockContract;

    /**
     * @param string $pageId
     *
     * @return BlockContract[]
     *
     * @throws BlockTypeException
     */
    public function getBlocksByParentId(string $pageId): array;

    /**
     * @param string $parentId
     *
     * @return BlockContract|null
     */
    public function findLastBlock(string $parentId): ?BlockContract;

    /**
     * @param string $blockId
     * @param array  $data
     *
     * @return BlockContract
     */
    public function setElementData(string $blockId, array $data): BlockContract;

    /**
     * @param string $blockId
     * @param array  $style
     *
     * @return BlockContract
     */
    public function setElementStyle(string $blockId, array $style): BlockContract;

    /**
     * @param string         $blockId
     * @param ActionContract $action
     *
     * @return BlockContract
     */
    public function addAction(string $blockId, ActionContract $action): BlockContract;

    /**
     * @param string $blockId
     * @param string $actionId
     *
     * @return BlockContract
     */
    public function deleteAction(string $blockId, string $actionId): BlockContract;

    /**
     * @param string     $blockId
     * @param string     $actionId
     * @param string     $handle
     * @param array|null $data
     * @param array      $conditions
     *
     * @return BlockContract
     */
    public function saveAction(string $blockId, string $actionId, string $handle, ?array $data = null, array $conditions = []): BlockContract;

    /**
     * @param int[] $blockPosition
     *
     * @throws Throwable
     */
    public function setElementsPositions(array $blockPosition): void;

    /**
     * @param string $blockId
     * @param int    $position
     */
    public function setElementPosition(string $blockId, int $position): void;

    /**
     * @param string $blockId
     * @param string $parentId
     */
    public function setElementParent(string $blockId, string $parentId): void;

    /**
     * @param string $blockId
     *
     * @throws Throwable
     */
    public function deleteElement(string $blockId);
}