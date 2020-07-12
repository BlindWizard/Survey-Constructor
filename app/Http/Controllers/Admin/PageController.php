<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\AddPageCommand;
use App\Admin\Commands\DeletePageCommand;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    public function add(AddPageCommand $command)
    {
        $result = new AjaxResponse();

        $command->userId = Auth::user()->getAuthIdentifier();
        $command->surveyId = request()->post('surveyId');

        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }

    public function delete(DeletePageCommand $command)
    {
        $result = new AjaxResponse();

        $command->userId = Auth::user()->getAuthIdentifier();
        $command->pageId = request()->post('pageId');

        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }
}