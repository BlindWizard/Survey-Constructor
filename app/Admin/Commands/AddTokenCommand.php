<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\ApiTokenContract;
use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;

class AddTokenCommand implements Command
{
    /** @var string */
    public $userId;

    /** @var string */
    public $name;

    /** @var ApiTokenContract */
    protected $token;

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
        $this->token = $this->apiTokenRepository->addToken($this->userId, $this->name);

        return $this;
    }

    public function getResult(): ApiTokenContract
    {
        return $this->token;
    }
}