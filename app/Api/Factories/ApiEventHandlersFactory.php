<?php
declare(strict_types=1);

namespace App\Api\Factories;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Factories\ApiEventHandlersFactoryContract;
use App\Api\Contracts\Services\ApiEventHandlerContract;
use App\Api\Services\NextPageHandler;

class ApiEventHandlersFactory implements ApiEventHandlersFactoryContract
{
    public function getEventHandler(ApiEventContract $event): ApiEventHandlerContract
    {
        switch ($event->getType()) {
            case ApiEventContract::NEXT_PAGE:
                return app()->make(NextPageHandler::class);
            default:
                throw new \Exception('Event handler for ' . $event->getType() . ' not found');
        }
    }
}