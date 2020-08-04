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
    /** @var BlockStyle */
    public $style;
    /** @var BlockAction[] */
    public $actions = [];

    /**
     * @param BlockContract $block
     */
    public function __construct(BlockContract $block)
    {
        $this->data = $block;
        $this->style = $block->getStyle();
        $this->actions = $block->getActions();
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
    public function getParentId(): string
    {
        return $this->data->getParentId();
    }

    /**
     * @inheritDoc
     */
    public function setParentId(string $parentId): void
    {
        $this->data->setParentId($parentId);
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
    public function getChildren(): ?array
    {
        return $this->data->getChildren();
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

    /**
     * @inheritDoc
     */
    public function getData(): array
    {
        return $this->data->getData();
    }

    /**
     * @inheritDoc
     */
    public function getStyle(): array
    {
        return ['style' => $this->style];
    }

    public function getActions(): array
    {
        return $this->actions;
    }
}