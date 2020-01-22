<?php

namespace App\Admin\Contracts\Factories;

use App\Admin\Contracts\Entities\BlockContract;

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
}