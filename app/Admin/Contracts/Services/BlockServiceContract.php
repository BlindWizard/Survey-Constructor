<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Services;

use App\Admin\Contracts\Entities\BlockContract;
use Throwable;

interface BlockServiceContract
{
    /**
     * @param string $parentId
     * @param string $blockId
     * @param string $type
     * @param int    $position
     *
     * @return BlockContract
     */
    public function addEmptyElement(string $parentId, string $blockId, string $type, int $position): BlockContract;

    /**
     * @param string $blockId
     * @param int    $position
     * @param string $parentId
     *
     * @return BlockContract
     */
    public function reorderElement(string $blockId, int $position, string $parentId): BlockContract;

    /**
     * @param string $blockId
     * @param array  $data
     *
     * @return BlockContract
     */
    public function setElementData(string $blockId, array $data): BlockContract;

    /**
     * @param string $blockId
     *
     * @return void
     *
     * @throws Throwable
     */
    public function deleteElement(string $blockId): void;
}