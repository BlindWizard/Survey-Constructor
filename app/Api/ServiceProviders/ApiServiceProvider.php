<?php
declare(strict_types=1);

namespace App\Api\ServiceProviders;

use App\Api\Contracts\Factories\ApiEventHandlersFactoryContract;
use App\Api\Contracts\Repositories\EventRepositoryContract;
use App\Api\Database\Repositories\EventRepository;
use App\Api\Factories\ApiEventHandlersFactory;
use Illuminate\Support\ServiceProvider;

class ApiServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(ApiEventHandlersFactoryContract::class, ApiEventHandlersFactory::class);
        $this->app->singleton(EventRepositoryContract::class, EventRepository::class);
    }
}