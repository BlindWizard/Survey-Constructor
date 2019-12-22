<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\CreateElementCommand;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\AddElementRequest;
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

    public function saveData() {

    }
}