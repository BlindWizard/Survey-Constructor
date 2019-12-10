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
     * @inheritdoc
     */
    public function getId(): string
    {
        return $this->data->getId();
    }

    /**
     * @inheritdoc
     */
    public function getSurveyId(): string
    {
        return $this->data->getSurveyId();
    }

    /**
     * @inheritdoc
     */
    public function setSurveyId(string $surveyId): void
    {
        $this->data->setSurveyId($surveyId);
    }

    /**
     * @inheritdoc
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @inheritdoc
     */
    public function setType(string $type)
    {
        $this->type = $type;
        $this->data->setType($type);
    }

    /**
     * @inheritdoc
     */
    public function getPosition(): int
    {
        return $this->data->getPosition();
    }

    /**
     * @inheritdoc
     */
    public function setPosition(int $position): void
    {
        $this->data->setPosition($position);
    }
}