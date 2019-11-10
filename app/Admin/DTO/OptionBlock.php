<?php

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;

class OptionBlock implements BlockContract
{
    public $text;
    public $type;

    /**
     * @return string
     */
    public function getType(): string
    {
        return static::TYPE_OPTION;
    }
}