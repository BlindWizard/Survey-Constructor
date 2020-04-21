<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Repositories\UserRepositoryContract;
use App\Admin\Database\Models\ApiToken;
use App\User;

class UserRepository implements UserRepositoryContract
{
    public function findUserByToken(string $token): ?User
    {
        $token = ApiToken::query()->where(ApiToken::ATTR_VALUE, '=', $token)->first();
        if (null === $token) {
            return null;
        }

        return $token->user;
    }
}