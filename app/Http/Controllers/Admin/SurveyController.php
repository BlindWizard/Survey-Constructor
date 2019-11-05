<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Contracts\SurveyServiceContract;
use App\Admin\DTO\TemplateObject;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    /** @var SurveyServiceContract */
    protected $surveyService;

    public function __construct(SurveyServiceContract $surveyService)
    {
        $this->surveyService = $surveyService;
    }

    public function create(Request $request)
    {
        $response = new AjaxResponse();
        $template = new TemplateObject();

        return response()->json($response);
    }
}