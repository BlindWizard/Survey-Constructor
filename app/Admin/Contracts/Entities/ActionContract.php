<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface ActionContract
{
    public const TYPE_CLICK = 'click';
    public const TYPES = [
        self::TYPE_CLICK,
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
     * @return ActionDataContract|null
     */
    public function getData(): ?ActionDataContract;
}