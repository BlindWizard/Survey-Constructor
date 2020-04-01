<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;

class ApiTokenRepository implements ApiTokenRepositoryContract
{
    public function getUsersTokens(string $userId): array
    {
        return [];
    }
}