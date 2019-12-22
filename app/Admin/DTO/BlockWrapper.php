<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;

class BlockWrapper implements BlockContract
{
    /** @var BlockContract */
    public $data;
    /** @var string */
    public $type;

    /**
     * @param BlockContract $block
     */
    public function __construct(BlockContract $block)
    {
        $this->data = $block;
        $this->type = $block->getType();
    }

    /**
     * @inheritDoc
     */
    public function getId(): string
    {
        return $this->data->getId();
    }

    /**
     * @inheritDoc
     */
    public function getSurveyId(): string
    {
        return $this->data->getSurveyId();
    }

    /**
     * @inheritDoc
     */
    public function setSurveyId(string $surveyId): void
    {
        $this->data->setSurveyId($surveyId);
    }

    /**
     * @inheritDoc
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @inheritDoc
     */
    public function setType(string $type)
    {
        $this->type = $type;
        $this->data->setType($type);
    }

    /**
     * @inheritDoc
     */
    public function getPosition(): int
    {
        return $this->data->getPosition();
    }

    /**
     * @inheritDoc
     */
    public function setPosition(int $position): void
    {
        $this->data->setPosition($position);
    }

    public function getData(): array
    {
        return $this->data->getData();
    }
}