<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

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
    public function getPageBlocks(string $pageId): array;

    /**
     * @param string $pageId
     *
     * @return BlockContract|null
     */
    public function findLastBlock(string $pageId): ?BlockContract;

    /**
     * @param string $blockId
     * @param array  $data
     *
     * @return BlockContract
     */
    public function setElementData(string $blockId, array $data): BlockContract;

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
     *
     * @throws Throwable
     */
    public function deleteElement(string $blockId);
}