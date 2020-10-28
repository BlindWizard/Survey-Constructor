<?php

namespace App\Admin\Contracts\Entities;


interface DataContract
{
    public const TYPE_POLL_VARIANTS = 'poll-variants';

    public const TYPES = [
        self::TYPE_POLL_VARIANTS => 'Poll variants',
    ];
}