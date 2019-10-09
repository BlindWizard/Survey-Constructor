<?php

namespace App\Http\Views\Composers;

use Illuminate\Contracts\View\View;

class LoginPageComposer
{
    public function compose(View $view)
    {
        $view->with([
            'htmlClasses' => 'login-page',
            'bodyClasses' => 'login-page__body',
        ]);
    }
}