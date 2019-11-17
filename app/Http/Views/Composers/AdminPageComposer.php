<?php

namespace App\Http\Views\Composers;

use Illuminate\Contracts\View\View;

class AdminPageComposer
{
    public function compose(View $view)
    {
        $view->with([
            'htmlClasses' => 'admin-page',
            'bodyClasses' => 'admin-page__body',
        ]);
    }
}