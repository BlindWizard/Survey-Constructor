<?php
declare(strict_types=1);

namespace App\Api\Factories;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Factories\ApiEventHandlersFactoryContract;
use App\Api\Contracts\Services\ApiEventHandlerContract;
use App\Api\Services\NextPageHandler;
use App\Api\Services\OptionHandler;
use App\Api\Services\OptionsListHandler;
use App\Api\Services\PrevPageHandler;

class ApiEventHandlersFactory implements ApiEventHandlersFactoryContract
{
    public function getEventHandler(ApiEventContract $event): ApiEventHandlerContract
    {
        switch ($event->getType()) {
            case ApiEventContract::NEXT_PAGE:
                return app()->make(NextPageHandler::class);
            case ApiEventContract::PREV_PAGE:
                return app()->make(PrevPageHandler::class);
            case ApiEventContract::OPTIONS_LIST_SELECT:
                return app()->make(OptionsListHandler::class);
            case ApiEventContract::OPTION_SELECT:
                return app()->make(OptionHandler::class);
            default:
                throw new \Exception('Event handler for ' . $event->getType() . ' not found');
        }
    }
}