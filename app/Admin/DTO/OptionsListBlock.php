<?php

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;

class OptionsListBlock implements BlockContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $surveyId;
    /** @var int */
    public $position;
    /** @var OptionBlock */
    public $options = [];
    /** @var bool */
    public $multiple = false;

    /**
     * @return string
     */
    public function getType(): string
    {
        return static::TYPE_OPTIONS_LIST;
    }

    /**
     * @inheritDoc
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getSurveyId(): string
    {
        return $this->surveyId;
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
    public function getPosition(): int
    {
        return $this->position;
    }

    /**
     * @inheritDoc
     */
    public function setPosition(int $position): void
    {
        $this->position = $position;
    }
}