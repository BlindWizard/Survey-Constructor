<?php

namespace App\Http\Controllers\Api;

use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Queries\FindSurveyByIdQuery;
use App\Http\Controllers\Controller;
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
}
