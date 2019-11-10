<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\CreateSurveyCommand;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\CreateSurveyRequest;

class SurveyController extends Controller
{
    /** @var SurveyServiceContract */
    protected $surveyService;

    public function __construct(SurveyServiceContract $surveyService)
    {
        $this->surveyService = $surveyService;
    }

    public function create(CreateSurveyRequest $request, CreateSurveyCommand $command)
    {
        $response = new AjaxResponse();

        $command->request = $request;
        [$response->data, $response->messages, $response->errors] = $command->perform()->getResult();

        return response()->json($response);
    }

    public function get(string $id)
    {
        $response = new AjaxResponse();
        $response->data = $id;

        return response()->json($response);
    }
}
