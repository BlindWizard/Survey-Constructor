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
    public $pageId;
    /** @var int */
    public $position;
    /** @var string[] */
    public $slots;
    /** @var BlockContract[] */
    public $children = [];

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
    public function setPageId(string $pageId): void
    {
        $this->pageId = $pageId;
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
    public function getPageId(): string
    {
        return $this->pageId;
    }

    /**
     * @inheritDoc
     */
    public function getData(): array
    {
        return [
            'slots' => $this->slots,
            'children' => $this->children,
        ];
    }
}