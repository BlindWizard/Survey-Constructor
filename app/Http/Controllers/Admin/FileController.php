<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\FileUploadCommand;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Support\Facades\Auth;

class FileController extends Controller
{
    public function upload(FileUploadRequest $request, FileUploadCommand $command)
    {
        $result = new AjaxResponse();

        $command->userId = Auth::user()->getAuthIdentifier();
        $command->file = $request->getFile();
        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }
}