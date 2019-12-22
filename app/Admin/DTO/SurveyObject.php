<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;

class SurveyObject implements SurveyContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $title;
    /** @var string */
    public $ownerId;
    /** @var BlockContract[] */
    public $blocks;
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
    public function getBlocks(): array
    {
        return $this->blocks;
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