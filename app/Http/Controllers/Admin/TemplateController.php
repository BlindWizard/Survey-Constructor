<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\Contracts\Services\TemplateServiceContract;
use App\Admin\Contracts\SettingsFactoryContract;
use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;

class TemplateController extends Controller
{
    /** @var SettingsFactoryContract  */
    protected $settings;

    public function __construct(SettingsFactoryContract $settings)
    {
        $this->settings = $settings;
    }

    public function index()
    {
        return view('admin.main', ['settings' => $this->settings->getSettings()->toJson()]);
    }

    public function getAll(TemplateServiceContract $templatesService)
    {
        $response = new AjaxResponse();
        $response->data = $templatesService->getAvailableTemplates();

        return response()->json($response);
    }
}