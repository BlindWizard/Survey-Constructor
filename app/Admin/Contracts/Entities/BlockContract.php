<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

use App\Admin\Exceptions\BlockTypeException;

interface BlockContract
{
    public const TYPES = [self::TYPE_HEADER, self::TYPE_OPTION, self::TYPE_OPTIONS_LIST, self::TYPE_TEXT];

    public const TYPE_HEADER = 'header';
    public const TYPE_OPTION = 'option';
    public const TYPE_OPTIONS_LIST = 'options-list';
    public const TYPE_TEXT = 'text';

    /**
     * @return string
     */
    public function getId(): string;

    /**
     * @return string
     */
    public function getPageId(): string;

    /**
     * @param string $pageId
     */
    public function setPageId(string $pageId): void;

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
}