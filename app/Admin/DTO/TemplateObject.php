<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\TemplateContract;

class TemplateObject implements TemplateContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $title;
    /** @var bool */
    public $public;
    /** @var string */
    public $ownerId;
    /** @var string */
    public $createdAt;
    /** @var string */
    public $updatedAt;

    /**
     * @inheritdoc
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @inheritdoc
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @inheritdoc
     */
    public function getOwnerId(): string
    {
        return $this->ownerId;
    }

    /**
     * @inheritdoc
     */
    public function getPublic(): bool
    {
        return $this->public;
    }

    /**
     * @inheritdoc
     */
    public function getCreatedAt(): string
    {
        return $this->createdAt;
    }

    /**
     * @inheritdoc
     */
    public function getUpdatedAt(): string
    {
        return $this->updatedAt;
    }
}