<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Models\Locale;
use App\Admin\Models\Settings;

class SettingsFactory implements SettingsFactoryContract
{
    /**
     * @inheritdoc
     */
    public function getSettings(): Settings
    {
        $settings = new Settings();
        $settings->csrf = csrf_token();

        $locale = new Locale();
        $locale->appName = config('app.name');
        $locale->editLabel = __('Edit');
        $locale->saveLabel = __('Save');
        $settings->locale = $locale;

        return $settings;
    }
}