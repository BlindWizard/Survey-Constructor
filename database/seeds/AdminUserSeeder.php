<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * @throws Throwable
     */
    public function run()
    {
        if (env('APP_ENV') === 'production') {
            return;
        }
        $password = Hash::make('secret');

        $user           = new \Illuminate\Foundation\Auth\User();
        $user->name     = 'Admin';
        $user->email    = 'admin@surveybox.com';
        $user->password = $password;
        $user->saveOrFail();
    }
}
