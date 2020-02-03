<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;

//@TODO-04.02.2020-Чучманский Aндрей Remove entity
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
    public function getPageId(): string
    {
        return $this->data->getPageId();
    }

    /**
     * @inheritDoc
     */
    public function setPageId(string $pageId): void
    {
        $this->data->setPageId($pageId);
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