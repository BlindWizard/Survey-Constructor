<?php
declare(strict_types=1);

namespace App\Api\Contracts\Factories;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Services\ApiEventHandlerContract;

interface ApiEventHandlersFactoryContract
{
    public function getEventHandler(ApiEventContract $event): ApiEventHandlerContract;
}