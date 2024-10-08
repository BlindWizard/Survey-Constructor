<?php
declare(strict_types=1);

namespace App\Admin\ServiceProviders;

use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Factories\SurveyFactoryContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Factories\SettingsFactoryContract;
use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Admin\Contracts\Repositories\BlockRepositoryContract;
use App\Admin\Contracts\Repositories\FileRepositoryContract;
use App\Admin\Contracts\Repositories\PageRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Admin\Contracts\Repositories\TemplateRepositoryContract;
use App\Admin\Contracts\Repositories\UserRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Admin\Contracts\Services\PageServiceContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\Contracts\Services\TemplateServiceContract;
use App\Admin\Database\Repositories\ApiTokenRepository;
use App\Admin\Database\Repositories\BlockRepository;
use App\Admin\Database\Repositories\FileRepository;
use App\Admin\Database\Repositories\PageRepository;
use App\Admin\Database\Repositories\SurveyRepository;
use App\Admin\Database\Repositories\SurveyStatisticRepository;
use App\Admin\Database\Repositories\TemplateRepository;
use App\Admin\Database\Repositories\UserRepository;
use App\Admin\Factories\BlockFactory;
use App\Admin\Factories\SettingsFactory;
use App\Admin\Factories\SurveyFactory;
use App\Admin\Factories\TemplatesFactory;
use App\Admin\Services\BlockService;
use App\Admin\Services\PageService;
use App\Admin\Services\SurveyService;
use App\Admin\Services\TemplateService;
use Illuminate\Support\ServiceProvider;

class AdminServiceProvider extends ServiceProvider
{
    public function register()
    {
        // factories
        $this->app->singleton(SettingsFactoryContract::class, SettingsFactory::class);
        $this->app->singleton(TemplatesFactoryContract::class, TemplatesFactory::class);
        $this->app->singleton(SurveyFactoryContract::class, SurveyFactory::class);
        $this->app->singleton(BlockFactoryContract::class, BlockFactory::class);

        // repositories
        $this->app->singleton(TemplateRepositoryContract::class, TemplateRepository::class);
        $this->app->singleton(SurveyRepositoryContract::class, SurveyRepository::class);
        $this->app->singleton(BlockRepositoryContract::class, BlockRepository::class);
        $this->app->singleton(PageRepositoryContract::class, PageRepository::class);
        $this->app->singleton(ApiTokenRepositoryContract::class, ApiTokenRepository::class);
        $this->app->singleton(UserRepositoryContract::class, UserRepository::class);
        $this->app->singleton(SurveyStatisticRepositoryContract::class, SurveyStatisticRepository::class);
        $this->app->singleton(FileRepositoryContract::class, FileRepository::class);

        // services
        $this->app->bind(TemplateServiceContract::class, TemplateService::class);
        $this->app->bind(SurveyServiceContract::class, SurveyService::class);
        $this->app->bind(PageServiceContract::class, PageService::class);
        $this->app->bind(BlockServiceContract::class, BlockService::class);
    }
}