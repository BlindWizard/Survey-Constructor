<?php

namespace App\Admin\Contracts\Reporitories;

use App\Admin\Contracts\Entities\BlockContract;
use Throwable;

interface BlockRepositoryContract
{
    /**
     * @param BlockContract $block
     *
     * @throws Throwable
     */
    public function save(BlockContract $block): void;
}