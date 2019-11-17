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
    public function getBlocks(): array
    {
        return $this->blocks;
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