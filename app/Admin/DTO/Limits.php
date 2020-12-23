<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\LimitsContract;

class Limits implements LimitsContract
{
    public int $surveys;
	public int $maxSurveys;
	public int $fileSize;
	public int $maxFilesSize;
}