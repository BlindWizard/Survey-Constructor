<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Factories;

use App\Admin\Models\Settings;

interface SettingsFactoryContract
{
    /**
     * @return Settings
     *
     * @throws \Throwable
     */
    public function getSettings(): Settings;
}