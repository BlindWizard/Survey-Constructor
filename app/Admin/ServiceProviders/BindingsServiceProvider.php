<?php
declare(strict_types=1);

namespace App\Admin\ServiceProviders;

use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Contracts\SurveyServiceContract;
use App\Admin\Contracts\TemplateRepositoryContract;
use App\Admin\Contracts\TemplateServiceContract;
use App\Admin\Contracts\TemplatesFactoryContract;
use App\Admin\Database\Repositories\TemplateRepository;
use App\Admin\Factories\SettingsFactory;
use App\Admin\Factories\TemplatesFactory;
use App\Admin\Services\SurveyService;
use App\Admin\Services\TemplateService;
use Illuminate\Support\ServiceProvider;

class BindingsServiceProvider extends ServiceProvider
{
    public function register()
    {
        // factories
        $this->app->singleton(SettingsFactoryContract::class, SettingsFactory::class);
        $this->app->singleton(TemplatesFactoryContract::class, TemplatesFactory::class);

        // repositories
        $this->app->singleton(TemplateRepositoryContract::class, TemplateRepository::class);

        // services
        $this->app->bind(TemplateServiceContract::class, TemplateService::class);
        $this->app->bind(SurveyServiceContract::class, SurveyService::class);
    }
}