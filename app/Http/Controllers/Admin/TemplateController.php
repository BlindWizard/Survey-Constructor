<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Contracts\TemplateServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;

class TemplateController extends Controller
{
    public function getAll(TemplateServiceContract $templatesService)
    {
        $response = new AjaxResponse();
        $response->data = $templatesService->getAvailableTemplates();

        return response()->json($response);
    }
}