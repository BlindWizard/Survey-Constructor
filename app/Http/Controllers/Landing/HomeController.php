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
        $config = config('util');

        $feedbackFormId = $config['feedback_form_id'];
        $adminToken = $config['admin_token'];

        return view('landing.main', compact('feedbackFormId', 'adminToken'));
    }
}
