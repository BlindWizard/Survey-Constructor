<?php

namespace App\Admin\Contracts\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Database\Models\Block;
use App\Admin\Exceptions\BlockTypeException;

interface BlockFactoryContract
{
    /**
     * @param string      $type
     * @param string|null $blockId
     *
     * @return BlockContract
     *
     * @throws \Throwable
     */
    public function getEmptyBlock(string $type, string $blockId = null): BlockContract;

    /**
     * @param BlockContract $model
     *
     * @return BlockContract
     *
     * @throws BlockTypeException
     */
    public function getDTO(BlockContract $model): BlockContract;
}