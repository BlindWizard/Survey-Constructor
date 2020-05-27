<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Contracts\Factories\SettingsFactoryContract;
use App\Admin\Queries\FindSurveyById;
use App\Admin\Queries\FindSurveySampleById;
use App\Admin\Queries\FindSurveyStatisticsById;
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

    public function getSurveyStatistics(string $id, FindSurveyStatisticsById $query)
    {
        $response = new AjaxResponse();

        $query->surveyId = $id;
        $query->userId = Auth::user()->getAuthIdentifier();

        $response->data = $query->perform()->getResult();

        return response()->json($response);
    }

    public function getStatisticsSample(string $id, string $sampleId, FindSurveySampleById $query)
    {
        $response = new AjaxResponse();

        $query->surveyId = $id;
        $query->sampleId = $sampleId;
        $query->userId   = Auth::user()->getAuthIdentifier();

        $response->data = $query->perform()->getResult();

        return response()->json($response);
    }
}
