<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\User;

interface UserRepositoryContract
{
    public function findUserByToken(string $token): ?User;
}