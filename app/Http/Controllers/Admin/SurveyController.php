<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\CreateSurveyCommand;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\Contracts\SettingsFactoryContract;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\CreateSurveyRequest;
use Illuminate\Support\Facades\Auth;

class SurveyController extends Controller
{
    /** @var SettingsFactoryContract  */
    protected $settings;

    /** @var SurveyServiceContract */
    protected $surveyService;

    public function __construct(SurveyServiceContract $surveyService, SettingsFactoryContract $settings)
    {
        $this->surveyService = $surveyService;
        $this->settings = $settings;
    }

    public function index(string $id)
    {
        return view('admin.main', ['settings' => $this->settings->getSettings()->toJson()]);
    }

    public function create(CreateSurveyRequest $request, CreateSurveyCommand $command)
    {
        $response = new AjaxResponse();

        $command->request = $request;
        $command->ownerId = Auth::user()->getAuthIdentifier();
        [$response->data, $response->messages, $response->errors] = $command->perform()->getResult();

        return response()->json($response);
    }
}
