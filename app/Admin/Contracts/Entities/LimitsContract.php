<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface LimitsContract
{
    public const MAX_SURVEYS_COUNT = 3;
    public const MAX_FILES_SIZE = 104857600; // 100 Mb
}