<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;

class HomeController extends Controller
{
    /**
     * @return Renderable
     */
    public function index()
    {
        return view('landing.main');
    }
}
