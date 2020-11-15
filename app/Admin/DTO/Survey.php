<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\DataContract;
use App\Admin\Contracts\Entities\PageContract;
use App\Admin\Contracts\Entities\SurveyContract;

class Survey implements SurveyContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $title;
    /** @var string */
    public $ownerId;
    /** @var PageContract[] */
    public $pages = [];
    /** @var string */
    public $createdAt;
    /** @var string */
    public $updatedAt;

    /** @var SurveyStatistic */
    public $statistics;

    /** @var DataContract[] */
    public $data;

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
    public function getPages(): array
    {
        return $this->pages;
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
    public function getData(): array
    {
        return $this->data;
    }
}