<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'Landing'], function () {
    Route::get('/', 'HomeController@index');
});

Route::group(['namespace' => 'Admin'], function () {
    Route::get('/admin', 'HomeController@index');
});

Route::group(['middleware' => ['guest']], function () {
    Auth::routes();
});
