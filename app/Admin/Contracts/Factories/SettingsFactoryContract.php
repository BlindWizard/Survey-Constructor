<?php
declare(strict_types=1);

namespace App\Admin\Contracts;

use App\Admin\Models\Settings;

interface SettingsFactoryContract
{
    /**
     * @return Settings
     */
    public function getSettings(): Settings;
}