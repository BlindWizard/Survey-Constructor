<?php

namespace App\Http\Views\Composers;

use Illuminate\Contracts\View\View;

class HomePageComposer
{
    public function compose(View $view)
    {
        $view->with([
            'htmlClasses' => 'home-page',
            'bodyClasses' => 'home-page__body',
        ]);
    }
}
