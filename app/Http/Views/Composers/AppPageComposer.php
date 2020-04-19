<?php

namespace App\Http\Views\Composers;

use Illuminate\Contracts\View\View;

class AppPageComposer
{
    public function compose(View $view)
    {
        $view->with([
            'htmlClasses' => 'app-page',
            'bodyClasses' => 'app-page__body',
        ]);
    }
}
