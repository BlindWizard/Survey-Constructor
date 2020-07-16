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
    public $parentId;
    /** @var string */
    public $pageId;
    /** @var int */
    public $position;
    /** @var Option[] */
    public $options = [];
    /** @var bool */
    public $multiple = false;
    /** @var BlockStyle */
    public $style;

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
        foreach ($this->options as $option) {
            $option->setPageId($pageId);
        }
    }

    /**
     * @inheritDoc
     */
    public function setParentId(string $parentId): void
    {
        $this->parentId = $parentId;
        foreach ($this->options as $option) {
            $option->setParentId($parentId);
        }
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
            $optionsData[] = array_merge(['id' => $option->getId()], $option->getData(), ['position' => $option->getPosition()], $option->getStyle());
        }

        return [
            'text' => $this->text,
            'options' => $optionsData,
            'multiple' => $this->multiple,
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