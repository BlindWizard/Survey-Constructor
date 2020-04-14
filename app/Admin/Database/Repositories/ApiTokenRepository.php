<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\ApiTokenContract;
use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Admin\Database\Models\ApiToken;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ApiTokenRepository implements ApiTokenRepositoryContract
{
    /**
     * @inheritDoc
     */
    public function addToken(string $userId, string $name): ApiTokenContract
    {
        $token = new ApiToken();
        $token->user_id = $userId;
        $token->name = $name;
        $token->value = hash('sha256', openssl_random_pseudo_bytes(256));
        $token->saveOrFail();

        return $token;
    }

    /**
     * @inheritDoc
     */
    public function deleteToken(string $tokenId, string $userId): void
    {
        $token = ApiToken::query()->where(ApiToken::ATTR_ID, '=', $tokenId)->where(ApiToken::ATTR_USER_ID, '=', $userId)->first();
        if (!$token) {
            throw new NotFoundHttpException();
        }

        $token->delete();
    }

    /**
     * @inheritDoc
     */
    public function getUsersTokens(string $userId): array
    {
        return ApiToken::query()->where(ApiToken::ATTR_USER_ID, '=', $userId)->get()->all();
    }
}