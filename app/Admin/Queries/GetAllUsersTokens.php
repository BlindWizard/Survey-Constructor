<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\ApiTokenContract;
use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Admin\DTO\ApiToken;

class GetAllUsersTokens implements Command
{
    /** @var string */
    public $userId;

    /** @var ApiTokenRepositoryContract */
    protected $apiTokenRepository;

    /** @var ApiTokenContract[] */
    protected $tokens;

    public function __construct(ApiTokenRepositoryContract $apiTokenRepository)
    {
        $this->apiTokenRepository = $apiTokenRepository;
    }

    public function perform(): Command
    {
        $tokens = [];
        foreach ($this->apiTokenRepository->getUsersTokens($this->userId) as $model) {
            $token = new ApiToken();
            $token->id = $model->getId();
            $token->userId = $model->getUserId();
            $token->name = $model->getName();
            $token->value = $model->getValue();
            $token->createdAt = $model->getCreatedAt();
            $token->updatedAt = $model->getUpdatedAt();

            $tokens[] = $token;
        }

        $this->tokens = $tokens;

        return $this;
    }

    public function getResult(): array
    {
        return $this->tokens;
    }
}