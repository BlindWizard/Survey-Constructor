<?php

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
    public function getType(): string;

    /**
     * @return mixed[]
     */
    public function getData(): array;
}