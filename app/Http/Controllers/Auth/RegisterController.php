<?php

namespace App\Http\Controllers\Auth;

use App\Http\Helpers\AjaxResponse;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RedirectsUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    use RedirectsUsers;

    /**
     * @var string
     */
    protected $redirectTo = '/admin';

    /**
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
    {
        return view('auth.login', ['active' => 'register']);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ])->validate();

        event(new Registered($user = $this->create($request->all())));

        Auth::guard()->login($user);

        if ($request->ajax()) {
            $result = new AjaxResponse();
            $result->redirectPath = $this->redirectPath();

            return response()->json($result);
        }

        return redirect($this->redirectPath());
    }
}
