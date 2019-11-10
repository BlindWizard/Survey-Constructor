<?php


namespace App\Admin\Contracts\Entities;

interface BlockContract
{
    public const TYPE_OPTION = 'option';
    public const TYPE_OPTIONS_LIST = 'options_list';

    /**
     * @return string
     */
    public function getType(): string;
}