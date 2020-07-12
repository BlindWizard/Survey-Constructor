<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\ApiTokenContract;

class ApiToken implements ApiTokenContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $userId;
    /** @var string */
    public $name;
    /** @var string */
    public $value;
    /** @var string */
    public $createdAt;
    /** @var string */
    public $updatedAt;

    /**
     * @inheritDoc
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @inheritDoc
     */
    public function getUserId(): string
    {
        return $this->userId;
    }

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @inheritDoc
     */
    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @inheritDoc
     */
    public function getCreatedAt(): string
    {
        return $this->createdAt;
    }

    /**
     * @inheritDoc
     */
    public function getUpdatedAt(): string
    {
        return $this->updatedAt;
    }
}