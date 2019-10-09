<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;

class MainPageController extends Controller
{
    /**
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('landing.main');
    }
}
