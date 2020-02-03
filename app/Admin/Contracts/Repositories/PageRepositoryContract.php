<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Contracts\Entities\PageContract;

interface PageRepositoryContract
{
    /**
     * @param string $id
     *
     * @return PageContract|null
     */
    public function findById(string $id): ?PageContract;

    /**
     * @param string $block
     *
     * @return PageContract
     */
    public function getPageByBlockId(string $block): ?PageContract;
}