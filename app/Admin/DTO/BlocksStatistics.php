<?php
declare(strict_types=1);

namespace App\Admin\DTO;

class BlocksStatistics
{
    /** @var string */
    public $surveyId;

    /** @var string */
    public $surveyName;

    /** @var string */
    public $tokenId;

    /** @var string */
    public $tokenLabel;

    /** @var BlockStatistic[] */
    public $blocks = [];
}