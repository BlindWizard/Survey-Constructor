<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Exceptions\BlockTypeException;

class Container implements BlockContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $parentId;
    /** @var string */
    public $pageId;
    /** @var int */
    public $position;
    /** @var string[] */
    public $slots;
    /** @var BlockContract[] */
    public $children = [];

    /** @var BlockStyle */
    public $style;
    /** @var BlockStyle[] */
    public $slotsStyle = [];

    /** @var BlockAction[] */
    public $actions = [];

    /**
     * @return string
     */
    public function getType(): string
    {
        return static::TYPE_CONTAINER;
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
    public function setParentId(string $parentId): void
    {
        $this->parentId = $parentId;
    }

    /**
     * @inheritDoc
     */
    public function getChildren(): ?array
    {
        return $this->children;
    }

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
    public function getParentId(): string
    {
        return $this->parentId;
    }

    /**
     * @inheritDoc
     */
    public function getPageId(): string
    {
        return $this->pageId;
    }
    /**
     * @inheritDoc
     */
    public function setPageId(string $pageId): void
    {
        $this->pageId = $pageId;
    }

    /**
     * @inheritDoc
     */
    public function getData(): array
    {
        return [
            'slots' => $this->slots,
        ];
    }

    /**
     * @inheritDoc
     */
    public function getStyle(): array
    {
        return ['style' => $this->style, 'slotsStyle' => $this->slotsStyle];
    }

    /**
     * @inheritDoc
     */
    public function getActions(): array
    {
        return $this->actions;
    }
}