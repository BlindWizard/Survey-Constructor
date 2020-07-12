<?php
declare(strict_types=1);

namespace App\Api\Contracts\Repositories;

use App\Api\Contracts\Entities\ApiEventContract;

interface EventRepositoryContract
{
    /**
     * @param ApiEventContract $event
     *
     * @throws \Throwable
     */
    public function save(ApiEventContract $event): void;
}