<?php
declare(strict_types=1);

namespace App\Api\Services;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Repositories\EventRepositoryContract;
use App\Api\Contracts\Services\ApiEventHandlerContract;

class OptionHandler implements ApiEventHandlerContract
{
    /** @var EventRepositoryContract */
    protected $repository;

    /**
     * @param EventRepositoryContract $repository
     */
    public function __construct(EventRepositoryContract $repository)
    {
        $this->repository = $repository;
    }

    public function handle(ApiEventContract $event): void
    {
        $this->repository->save($event);
    }
}