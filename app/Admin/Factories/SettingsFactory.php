<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Models\Settings;

class SettingsFactory implements SettingsFactoryContract
{
    public function getSettings(): Settings
    {
        $settings = new Settings();
        $settings->csrf = csrf_token();
        $settings->appName = config('app.name');

        return $settings;
    }
}