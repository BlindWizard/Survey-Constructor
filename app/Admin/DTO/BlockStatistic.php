<?php
declare(strict_types=1);

namespace App\Admin\DTO;

class BlockStatistic
{
    /** @var string */
    public $type;
    /** @var string */
    public $blockId;
    /** @var string */
    public $blockLabel;
    /** @var BlockOptionStatistic[] */
    public $options = [];
}