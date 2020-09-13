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
    public $inset;
    /** @var ResizeOffset */
    public $margin;
    /** @var ResizeOffset */
    public $padding;
    /** @var string */
    public $sizeMeasure;
    /** @var string */
    public $backgroundColor;

    public function __construct()
    {
        $this->margin = new ResizeOffset();
        $this->padding = new ResizeOffset();
        $this->inset = new ResizeOffset();
    }
}