<?php
declare(strict_types=1);

namespace App\Admin\DTO;

class BlocksStatistics
{
    /** @var string */
    public $tokenId;

    /** @var string */
    public $tokenLabel;

    /** @var OptionSelectedStatistics[] */
    public $blocks = [];
}