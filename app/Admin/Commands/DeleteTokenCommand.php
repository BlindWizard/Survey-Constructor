<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\ApiTokenContract;
use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;

class DeleteTokenCommand implements Command
{
    /** @var string */
    public $userId;

    /** @var string */
    public $tokenId;

    /** @var ApiTokenRepositoryContract */
    protected $apiTokenRepository;

    /**
     * @param ApiTokenRepositoryContract $apiTokenRepository
     */
    public function __construct(ApiTokenRepositoryContract $apiTokenRepository)
    {
        $this->apiTokenRepository = $apiTokenRepository;
    }

    public function perform(): Command
    {
        $this->apiTokenRepository->deleteToken($this->tokenId, $this->userId);

        return $this;
    }
}