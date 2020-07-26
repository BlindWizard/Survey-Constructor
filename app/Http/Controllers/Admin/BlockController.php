<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\CreateElementCommand;
use App\Admin\Commands\DeleteElementCommand;
use App\Admin\Commands\ReorderElementCommand;
use App\Admin\Commands\SaveElementDataCommand;
use App\Admin\Commands\SaveElementStyleCommand;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\AddElementRequest;
use App\Http\Requests\ReorderElementRequest;
use App\Http\Requests\SaveElementDataRequest;
use App\Http\Requests\SaveElementStyleRequest;
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

    public function reorderElement(ReorderElementRequest $request, ReorderElementCommand $command)
    {
        $result = new AjaxResponse();

        $command->userId = Auth::user()->getAuthIdentifier();
        $command->request = $request;

        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }

    public function saveData(SaveElementDataRequest $request, SaveElementDataCommand $command)
    {
        $result = new AjaxResponse();

        $command->userId = Auth::user()->getAuthIdentifier();
        $command->request = $request;

        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }

    public function saveStyle(SaveElementStyleRequest $request, SaveElementStyleCommand $command)
    {
        $result = new AjaxResponse();

        $command->userId = Auth::user()->getAuthIdentifier();
        $command->request = $request;

        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }

    public function deleteElement(DeleteElementCommand $command)
    {
        $result = new AjaxResponse();

        $command->userId = Auth::user()->getAuthIdentifier();
        $command->blockId = request()->post('blockId');

        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }
}