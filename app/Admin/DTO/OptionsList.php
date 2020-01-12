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
    /** @var Option[] */
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
     * @inheritDoc
     */
    public function setSurveyId(string $surveyId): void
    {
        $this->surveyId = $surveyId;
        foreach ($this->options as $option) {
            $option->setSurveyId($surveyId);
        }
    }

    /**
     * @inheritDoc
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
     * @inheritDoc
     */
    public function setType(string $type)
    {
        throw new BlockTypeException('Can\'t change existing block type');
    }

    public function getData(): array
    {
        $optionsData = [];
        foreach ($this->options as $option) {
            $optionsData[] = array_merge($option->getData(), ['position' => $option->getPosition()]);
        }

        return [
            'id' => $this->id,
            'text' => $this->text,
            'options' => $optionsData,
            'multiple' => $this->multiple,
        ];
    }
}