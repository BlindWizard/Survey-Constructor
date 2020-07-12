<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\PageContract;
use App\Admin\Contracts\Entities\TemplateContract;

class Template implements TemplateContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $title;
    /** @var PageContract[] */
    public $pages = [];
    /** @var bool */
    public $public;
    /** @var string */
    public $ownerId;
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
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @inheritDoc
     */
    public function getOwnerId(): string
    {
        return $this->ownerId;
    }

    /**
     * @inheritDoc
     */
    public function getPublic(): bool
    {
        return $this->public;
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

    /**
     * @inheritDoc
     */
    public function getPages(): array
    {
        return $this->pages;
    }
}