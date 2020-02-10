<?php

namespace App\Http\Controllers\Admin;

use App\Admin\Contracts\SettingsFactoryContract;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;

class HomeController extends Controller
{
    /** @var SettingsFactoryContract  */
    protected $settings;

    /**
     * @param SettingsFactoryContract $settings
     */
    public function __construct(SettingsFactoryContract $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @return Renderable
     * @throws \Throwable
     */
    public function index()
    {
        return view('admin.main', ['settings' => $this->settings->getSettings()->toJson()]);
    }
}
