<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface ActionContract
{
    public const TYPE_CLICK = 'click';
    public const TYPES = [
        self::TYPE_CLICK => 'Click',
    ];

    /**
     * @return string
     */
    public function getId(): string;

    /**
     * @return string
     */
    public function getType(): string;

    /**
     * @return string|null
     */
    public function getHandle(): ?string;

    /**
     * @return array|null
     */
    public function getData(): ?array;

    /**
     * @param string|null $handle
     */
    public function setHandle(?string $handle = null): void;

    /**
     * @param array|null $data
     */
    public function setData(array $data = null): void;
}