<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Exceptions\BlockTypeException;

class Text implements BlockContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $text;
    /** @var string */
    public $surveyId;
    /** @var int */
    public $position;

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
    public function setSurveyId(string $surveyId): void
    {
        $this->surveyId = $surveyId;
    }

    /**
     * @inheritDoc
     */
    public function getType(): string
    {
        return static::TYPE_TEXT;
    }

    /**
     * @inheritDoc
     */
    public function setType(string $type)
    {
        throw new BlockTypeException('Can\'t change existing block type');
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
    public function getData(): array
    {
        return [
            'text' => $this->text,
        ];
    }
}