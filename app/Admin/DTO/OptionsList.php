<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Exceptions\BlockTypeException;

class OptionsList implements BlockContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $text;
    /** @var string */
    public $surveyId;
    /** @var int */
    public $position;
    /** @var Option */
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

    /**
     * @inheritdoc
     */
    public function setType(string $type)
    {
        throw new BlockTypeException('Can\'t change existing block type');
    }
}