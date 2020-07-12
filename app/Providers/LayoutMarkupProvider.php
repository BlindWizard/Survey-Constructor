<?php
declare(strict_types=1);

namespace App\Providers;

use App\Http\Views\Composers\AdminPageComposer;
use App\Http\Views\Composers\AppPageComposer;
use App\Http\Views\Composers\HomePageComposer;
use App\Http\Views\Composers\LoginPageComposer;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\View;

class LayoutMarkupProvider extends ServiceProvider
{
    public function boot(): void
    {
        View::composer(['landing/main'], HomePageComposer::class);
        View::composer(['auth/login', 'auth/register'], LoginPageComposer::class);
        View::composer(['admin/main'], AdminPageComposer::class);
        View::composer(['api/run'], AppPageComposer::class);
    }
}