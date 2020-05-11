<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Contracts\Entities\ApiTokenContract;

interface ApiTokenRepositoryContract
{
    /**
     * @param string $userId
     * @param string $name
     *
     * @return ApiTokenContract
     *
     * @throws \Throwable
     */
    public function addToken(string $userId, string $name): ApiTokenContract;

    /**
     * @param string $tokenId
     * @param string $userId
     *
     * @throws \Throwable
     */
    public function deleteToken(string $tokenId, string $userId): void;

    /**
     * @param string $userId
     *
     * @return ApiTokenContract[]
     */
    public function getUsersTokens(string $userId): array;

    /**
     * @param string $value
     *
     * @return ApiTokenContract|null
     */
    public function getTokenByValue(string $value): ?ApiTokenContract;
}