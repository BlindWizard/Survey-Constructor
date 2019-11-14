<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Commands\CreateSurveyCommand;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Queries\FindSurveyByIdQuery;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use App\Http\Requests\CreateSurveyRequest;
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
     * @param string              $id
     * @param FindSurveyByIdQuery $query
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(string $id, FindSurveyByIdQuery $query)
    {
        $query->surveyId = $id;
        $query->userId = Auth::user()->getAuthIdentifier();

        $query->perform();

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

    public function get(string $id, FindSurveyByIdQuery $query)
    {
        $query->surveyId = $id;
        $query->userId = Auth::user()->getAuthIdentifier();

        $result = new AjaxResponse();
        $result->data = $query->perform()->getResult();

        return response()->json($result);
    }
}
