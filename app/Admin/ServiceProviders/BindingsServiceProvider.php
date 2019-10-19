<?php
declare(strict_types=1);

namespace App\Admin\ServiceProviders;

use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Factories\SettingsFactory;
use Illuminate\Support\ServiceProvider;

class BindingsServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(SettingsFactoryContract::class, SettingsFactory::class);
    }
}