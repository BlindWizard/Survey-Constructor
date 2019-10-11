<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;

class HomeController extends Controller
{
    /**
     * @return Renderable
     */
    public function index()
    {
        return view('admin.main');
    }
}
