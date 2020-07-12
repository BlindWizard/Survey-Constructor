<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Helpers\AjaxResponse;
use Illuminate\Foundation\Auth\RedirectsUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    use RedirectsUsers;

    /**
     * @var string
     */
    protected $redirectTo = '/admin';

    /**
     * @return \Illuminate\Http\Response
     */
    public function showLoginForm()
    {
        return view('auth.login', ['active' => 'login']);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::guard()->attempt($request->only('email', 'password'), $request->filled('remember'))) {
            $request->session()->regenerate();

            if ($request->ajax()) {
                $result = new AjaxResponse();
                $result->redirectPath = $this->redirectPath();

                return response()->json($result);
            }

            return redirect()->intended($this->redirectPath());
        }

        throw ValidationException::withMessages([
            'email' => [trans('auth.failed')],
        ]);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::guard()->logout();

        $request->session()->invalidate();

        return redirect('/');
    }
}
