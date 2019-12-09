<?php

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Exceptions\BlockTypeException;

class OptionBlock implements BlockContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $surveyId;
    /** @var int */
    public $position;
    /** @var string */
    public $text;
    /** @var string */
    public $type;

    /**
     * @return string
     */
    public function getType(): string
    {
        return static::TYPE_OPTION;
    }

    /**
     * @inheritdoc
     */
    public function setType(string $type)
    {
        throw new BlockTypeException('Can\'t change existing block type');
    }

    /**
     * @inheritdoc
     */
    public function setSurveyId(string $surveyId): void
    {
        $this->surveyId = $surveyId;
    }

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
    public function getPosition(): int
    {
        return $this->position;
    }

    /**
     * @inheritdoc
     */
    public function setPosition(int $position): void
    {
        $this->position = $position;
    }

    /**
     * @inheritDoc
     */
    public function getSurveyId(): string
    {
        return $this->surveyId;
    }
}