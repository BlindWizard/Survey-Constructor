<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Contracts\Factories\SettingsFactoryContract;
use App\Admin\Queries\FindSurveyById;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use Illuminate\Support\Facades\Auth;

class StatisticsController extends Controller
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

    public function getSurveyStatistics(string $id)
    {
        $response = new AjaxResponse();

        return response()->json($response);
    }
}
