<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Exceptions\BlockTypeException;

class Option implements BlockContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $text;
    /** @var string */
    public $parentId;
    /** @var string */
    public $pageId;
    /** @var int */
    public $position;
    /** @var BlockStyle */
    public $style;

    /**
     * @return string
     */
    public function getType(): string
    {
        return static::TYPE_OPTION;
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
    public function getChildren(): ?array
    {
        return null;
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
    public function getData(): array
    {
        return [
            'text' => $this->text,
        ];
    }

    /**
     * @inheritDoc
     */
    public function getStyle(): array
    {
        return ['style' => $this->style];
    }
}