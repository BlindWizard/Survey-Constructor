<?php
declare(strict_types=1);

namespace App\Api\Commands;

use App\Admin\Contracts\Command;
use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Factories\ApiEventHandlersFactoryContract;

class HandleEventCommand implements Command
{
    /** @var ApiEventContract */
    public $event;

    /** @var ApiEventHandlersFactoryContract */
    protected $handlers;

    public function __construct(ApiEventHandlersFactoryContract $handlers)
    {
        $this->handlers = $handlers;
    }

    public function perform(): Command
    {
        $handler = $this->handlers->getEventHandler($this->event);
        $handler->handle($this->event);

        return $this;
    }

    public function getResult()
    {
        return true;
    }
}