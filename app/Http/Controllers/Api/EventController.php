<?php

namespace App\Http\Controllers\Api;

use App\Api\Commands\HandleEventCommand;
use App\Api\Entities\EnterTextEventPayload;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\EnterTextRequest;
use App\Http\Requests\NextPageRequest;
use App\Http\Requests\OptionSelectRequest;
use App\Http\Requests\OptionsListSelectRequest;
use App\Http\Requests\PrevPageRequest;
use App\Http\Requests\RunRequest;

class EventController extends Controller
{
    /** @var HandleEventCommand */
    protected $command;

    /**
     * @param HandleEventCommand $command
     */
    public function __construct(HandleEventCommand $command)
    {
        $this->command = $command;
    }

    public function run(RunRequest $request)
    {
        $result = new AjaxResponse();
        $this->command->event = $request;
        $this->command->perform();

        return response()->json($result);
    }

    public function nextPage(NextPageRequest $request)
    {
        $result = new AjaxResponse();
        $this->command->event = $request;
        $this->command->perform();

        return response()->json($result);
    }

    public function prevPage(PrevPageRequest $request)
    {
        $result = new AjaxResponse();
        $this->command->event = $request;
        $this->command->perform();

        return response()->json($result);
    }

    public function optionsListSelect(OptionsListSelectRequest $request)
    {
        $result = new AjaxResponse();
        $this->command->event = $request;
        $this->command->perform();

        return response()->json($result);
    }

    public function optionSelect(OptionSelectRequest $request)
    {
        $result = new AjaxResponse();
        $this->command->event = $request;
        $this->command->perform();

        return response()->json($result);
    }

    public function enterText(EnterTextRequest $request)
    {
        $result = new AjaxResponse();
        $this->command->event = $request;
        $this->command->perform();

        return response()->json($result);
    }
}