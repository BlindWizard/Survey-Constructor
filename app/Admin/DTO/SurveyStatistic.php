<?php
declare(strict_types=1);

namespace App\Admin\DTO;

class SurveyStatistic
{
    /** @var int */
    public $runsCount = 0;
    /** @var int */
    public $completesCount = 0;
    /** @var string|null */
    public $lastUpdated = null;
}