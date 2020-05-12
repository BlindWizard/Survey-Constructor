<?php

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\PageContract;

class Page implements PageContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $surveyId;
    /** @var int */
    public $step;
    /** @var BlockContract[] */
    public $blocks = [];
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
    public function getSurveyId(): string
    {
        return $this->surveyId;
    }

    /**
     * @inheritDoc
     */
    public function getStep(): int
    {
        return $this->step;
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