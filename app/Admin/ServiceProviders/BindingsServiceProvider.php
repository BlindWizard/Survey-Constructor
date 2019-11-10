<?php
declare(strict_types=1);

namespace App\Admin\ServiceProviders;

use App\Admin\Contracts\Factories\SurveyFactoryContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Repositories\TemplateRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\Contracts\Services\TemplateServiceContract;
use App\Admin\Contracts\SettingsFactoryContract;
use App\Admin\Database\Repositories\TemplateRepository;
use App\Admin\Factories\SettingsFactory;
use App\Admin\Factories\SurveyFactory;
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
        $this->app->singleton(SurveyFactoryContract::class, SurveyFactory::class);

        // repositories
        $this->app->singleton(TemplateRepositoryContract::class, TemplateRepository::class);

        // services
        $this->app->bind(TemplateServiceContract::class, TemplateService::class);
        $this->app->bind(SurveyServiceContract::class, SurveyService::class);
    }
}