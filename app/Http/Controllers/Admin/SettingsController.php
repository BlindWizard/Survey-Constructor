<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Queries\FindSurveyByIdQuery;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    /** @var SettingsFactoryContract  */
    protected $settings;

    public function __construct(SettingsFactoryContract $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @throws \Throwable
     */
    public function index()
    {
        return view('admin.main', ['settings' => $this->settings->getSettings()->toJson()]);
    }

    public function getAvailableTokens()
    {

    }
}