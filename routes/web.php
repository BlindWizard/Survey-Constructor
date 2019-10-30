<?php

use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'Landing'], function () {
    Route::get('/', 'HomeController@index');
});

Route::group(['namespace' => 'Admin'], function () {
    Route::get('/admin', 'HomeController@index');
    Route::get('/admin/templates', 'HomeController@index');

    Route::post('/admin/survey/create', 'SurveyController@create');
    Route::get('/admin/template/getAll', 'TemplateController@getAll');

    Route::get('/admin/{any}', function () {
        return redirect('/admin');
    });
});

Route::group(['namespace' => 'Auth'], function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', 'LoginController@showLoginForm')->name('login');
        Route::post('/login', 'LoginController@login');

        Route::get('/register', 'RegisterController@showRegistrationForm')->name('register');
        Route::post('/register', 'RegisterController@register');
    });

    Route::get('/password/reset', 'ForgotPasswordController@showLinkRequestForm')->name('password.request');
    Route::post('/password/email', 'ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    Route::get('/password/reset/{token}', 'ResetPasswordController@showResetForm')->name('password.reset');
    Route::post('/password/reset', 'ResetPasswordController@reset')->name('password.update');

    Route::get('/email/verify', 'VerificationController@show')->name('verification.notice');
    Route::get('/email/verify/{id}', 'VerificationController@verify')->name('verification.verify');
    Route::get('/email/resend', 'VerificationController@resend')->name('verification.resend');

    Route::post('/logout', 'LoginController@logout')->name('logout');
});