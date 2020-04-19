<?php

namespace App\Http\Controllers\Api;

use App\Admin\Contracts\Factories\SettingsFactoryContract;
use App\Admin\Queries\FindSurveyById;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ApiController extends Controller
{
    /** @var SettingsFactoryContract  */
    protected $settings;

    public function __construct(SettingsFactoryContract $settings)
    {
        $this->settings = $settings;
    }

    public function run(string $id, Request $request)
    {
        $token = $request->get('token');
        if (null === $token) {
            throw new BadRequestHttpException();
        }

        return view('api.run', ['id' => $id, 'token' => $token]);
    }

    public function getSurvey(string $id, FindSurveyById $query)
    {
        $query->surveyId = $id;
        $query->userId = 'bd5598d6-678d-44e2-9218-4d4235d9c324';//@TODO-26.03.2020-Чучманский Aндрей Auth by token

        $result = new AjaxResponse();
        $result->data = $query->perform()->getResult();

        return response()->json($result);
    }
}
