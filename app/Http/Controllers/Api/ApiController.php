<?php

namespace App\Http\Controllers\Api;

use App\Admin\Contracts\Factories\SettingsFactoryContract;
use App\Admin\Contracts\Repositories\UserRepositoryContract;
use App\Admin\Queries\FindSurveyById;
use App\Api\Commands\HandleEventCommand;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
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

    public function getSurvey(string $id, Request $request, UserRepositoryContract $userRepository, FindSurveyById $query)
    {
        $token = $request->get('token');
        if (null === $token) {
            throw new BadRequestHttpException();
        }

        $user = $userRepository->findUserByToken($token);
        if (null === $user) {
            throw new AccessDeniedHttpException();
        }

        $query->surveyId = $id;
        $query->userId = $user->id;

        $result = new AjaxResponse();
        $result->data = $query->perform()->getResult();

        return response()->json($result);
    }

    public function event(ApiEventRequest $request, HandleEventCommand $command)
    {

    }
}
