<?php
declare(strict_types=1);

namespace App\Admin\DTO;

class BlockStyle
{
    /** @var float */
    public $width;
    /** @var float */
    public $height;
    /** @var string */
    public $textAlign;
    /** @var ResizeOffset */
    public $margin;
    /** @var ResizeOffset */
    public $padding;
}