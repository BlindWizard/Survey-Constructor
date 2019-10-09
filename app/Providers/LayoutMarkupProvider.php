<?php

namespace App\Providers;

use App\Http\Views\Composers\LoginPageComposer;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\View;

class LayoutMarkupProvider extends ServiceProvider
{
    public function boot(): void
    {
        View::composer(['auth/login', 'auth/register'], LoginPageComposer::class);
    }
}