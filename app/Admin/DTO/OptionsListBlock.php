<?php

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;

class OptionsListBlock implements BlockContract
{
    /** @var OptionBlock */
    public $options;
    /** @var bool */
    public $multiple;

    /**
     * @return string
     */
    public function getType(): string
    {
        return static::TYPE_OPTIONS_LIST;
    }
}