<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Queries\GetAllUsersTemplates;
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

    public function getAll(GetAllUsersTemplates $query)
    {
        $response = new AjaxResponse();
        $response->data = $query->perform()->getResult();

        return response()->json($response);
    }
}