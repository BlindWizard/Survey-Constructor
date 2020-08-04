<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

use App\Admin\Exceptions\BlockTypeException;

interface BlockContract
{
    public const TYPES = [
        self::TYPE_CONTAINER,
        self::TYPE_HEADER,
        self::TYPE_OPTION,
        self::TYPE_OPTIONS_LIST,
        self::TYPE_TEXT,
        self::TYPE_TEXT_FIELD,
        self::TYPE_IMAGE,
        self::TYPE_BUTTON,
        self::TYPE_DELIMITER,
    ];

    public const TYPE_CONTAINER = 'container';
    public const TYPE_HEADER = 'header';
    public const TYPE_OPTION = 'option';
    public const TYPE_OPTIONS_LIST = 'options-list';
    public const TYPE_TEXT = 'text';
    public const TYPE_TEXT_FIELD = 'text-field';
    public const TYPE_IMAGE = 'image';
    public const TYPE_BUTTON = 'button';
    public const TYPE_DELIMITER = 'delimiter';

    /**
     * @return string
     */
    public function getId(): string;

    /**
     * @return string
     */
    public function getParentId(): string;

    /**
     * @return string
     */
    public function getPageId(): string;

    /**
     * @param string $parentId
     */
    public function setParentId(string $parentId): void;

    /**
     * @param string $pageId
     */
    public function setPageId(string $pageId): void;

    /**
     * @return BlockContract[]|null
     */
    public function getChildren(): ?array;

    /**
     * @return string
     */
    public function getType(): string;

    /**
     * @var string $type
     *
     * @throws BlockTypeException
     */
    public function setType(string $type);

    /**
     * @return int
     */
    public function getPosition(): int;

    /**
     * @param int $position
     */
    public function setPosition(int $position): void;

    /**
     * @return mixed[]
     */
    public function getData(): array;

    /**
     * @return mixed[]
     */
    public function getStyle(): array;

    /**
     * @return ActionContract[]
     */
    public function getActions(): array;
}