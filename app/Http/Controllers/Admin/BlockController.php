<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\CreateElementCommand;
use App\Admin\Commands\ReorderElementCommand;
use App\Admin\Commands\SaveElementDataCommand;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\AddElementRequest;
use App\Http\Requests\ReorderElementRequest;
use App\Http\Requests\SaveDataRequest;
use Illuminate\Support\Facades\Auth;

class BlockController extends Controller
{
    public function createElement(AddElementRequest $request, CreateElementCommand $command)
    {
        $result = new AjaxResponse();

        $command->userId = Auth::user()->getAuthIdentifier();
        $command->request = $request;

        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }

    public function reoderElement(ReorderElementRequest $request, ReorderElementCommand $command)
    {
        $result = new AjaxResponse();

        $command->userId = Auth::user()->getAuthIdentifier();
        $command->request = $request;

        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }

    public function saveData(SaveDataRequest $request, SaveElementDataCommand $command)
    {
        //@TODO-13.01.2020-Чучманский Aндрей 
    }
    
    public function deleteElement()
    {
        //@TODO-13.01.2020-Чучманский Aндрей 
    }
}