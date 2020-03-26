<?php

namespace App\Http\Controllers\Api;

use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Queries\FindSurveyByIdQuery;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    /** @var SettingsFactoryContract  */
    protected $settings;

    public function __construct(SettingsFactoryContract $settings)
    {
        $this->settings = $settings;
    }

    public function run(string $id)
    {
        return view('api.run', ['id' => $id]);
    }

    public function getSurvey(string $id, FindSurveyByIdQuery $query)
    {
        $query->surveyId = $id;
        $query->userId = 'bd5598d6-678d-44e2-9218-4d4235d9c324';//@TODO-26.03.2020-Чучманский Aндрей Auth by token

        $result = new AjaxResponse();
        $result->data = $query->perform()->getResult();

        return response()->json($result);
    }
}
