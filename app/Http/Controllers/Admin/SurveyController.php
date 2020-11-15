<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\AddSurveyDataCommand;
use App\Admin\Commands\CreateSurveyCommand;
use App\Admin\Commands\DeleteSurveyCommand;
use App\Admin\Contracts\Factories\SettingsFactoryContract;
use App\Admin\Queries\FindSurveyById;
use App\Admin\Queries\GetAllUsersSurveys;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\AddSurveyDataRequest;
use App\Http\Requests\CreateSurveyRequest;
use App\Http\Requests\DeleteSurveyRequest;
use Illuminate\Support\Facades\Auth;

class SurveyController extends Controller
{
    /** @var SettingsFactoryContract  */
    protected $settings;

    public function __construct(SettingsFactoryContract $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @param string         $id
     * @param FindSurveyById $query
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(string $id, FindSurveyById $query)
    {
        $query->surveyId = $id;
        $query->userId = Auth::user()->getAuthIdentifier();

        $query->perform();

        return view('admin.main', ['settings' => $this->settings->getSettings()->toJson()]);
    }

    public function getAll(GetAllUsersSurveys $query)
    {
        $query->userId = Auth::user()->getAuthIdentifier();

        $response = new AjaxResponse();
        $response->data = $query->perform()->getResult();

        return response()->json($response);
    }

    public function create(CreateSurveyRequest $request, CreateSurveyCommand $command)
    {
        $response = new AjaxResponse();

        $command->request = $request;
        $command->ownerId = Auth::user()->getAuthIdentifier();
        [$response->data, $response->messages, $response->errors] = $command->perform()->getResult();

        return response()->json($response);
    }

    public function get(string $id, FindSurveyById $query)
    {
        $query->surveyId = $id;
        $query->userId = Auth::user()->getAuthIdentifier();

        $result = new AjaxResponse();
        $result->data = $query->perform()->getResult();

        return response()->json($result);
    }

    public function delete(DeleteSurveyRequest $request, DeleteSurveyCommand $command)
    {
        $command->request = $request;
        $command->userId = Auth::user()->getAuthIdentifier();

        $result = new AjaxResponse();
        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }

    public function addData(AddSurveyDataRequest $request, AddSurveyDataCommand $command)
    {
        $command->request = $request;
        $command->userId = Auth::user()->getAuthIdentifier();

        $result = new AjaxResponse();
        $result->data = $command->perform()->getResult();

        return response()->json($result);
    }
}
