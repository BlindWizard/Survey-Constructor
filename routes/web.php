<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', 'Landing\HomeController@index');
Route::get('/admin', 'Admin\HomeController@index');

Auth::routes();

