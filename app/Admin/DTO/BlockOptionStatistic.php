<?php
declare(strict_types=1);

namespace App\Admin\DTO;

class BlockOptionStatistic
{
    /** @var string */
    public $optionId;
    /** @var string */
    public $label;
    /** @var int */
    public $count;
    /** @var float */
    public $percent;
    /** @var string[] */
    public $samples = [];
}