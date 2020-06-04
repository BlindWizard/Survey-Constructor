<?php
declare(strict_types=1);

namespace App\Api\Factories;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Factories\ApiEventHandlersFactoryContract;
use App\Api\Contracts\Services\ApiEventHandlerContract;
use App\Api\Services\EnterTextHandler;
use App\Api\Services\NextPageHandler;
use App\Api\Services\OptionHandler;
use App\Api\Services\OptionsListHandler;
use App\Api\Services\PrevPageHandler;
use App\Api\Services\RunHandler;

class ApiEventHandlersFactory implements ApiEventHandlersFactoryContract
{
    public function getEventHandler(ApiEventContract $event): ApiEventHandlerContract
    {
        switch ($event->getType()) {
            case ApiEventContract::RUN:
                return app()->make(RunHandler::class);
            case ApiEventContract::NEXT_PAGE:
                return app()->make(NextPageHandler::class);
            case ApiEventContract::PREV_PAGE:
                return app()->make(PrevPageHandler::class);
            case ApiEventContract::OPTIONS_LIST_SELECT:
                return app()->make(OptionsListHandler::class);
            case ApiEventContract::OPTION_SELECT:
                return app()->make(OptionHandler::class);
            case ApiEventContract::ENTER_TEXT:
                return app()->make(EnterTextHandler::class);
            default:
                throw new \Exception('Event handler for ' . $event->getType() . ' not found');
        }
    }
}