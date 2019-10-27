<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Database\Repositories\TemplateRepository;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;

class SurveyController extends Controller
{
    public function getAll(TemplateRepository $repository)
    {
        $response = new AjaxResponse();
        $response->data = $repository->getPublic();

        return response()->json($response);
    }
}