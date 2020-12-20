<?php
declare(strict_types=1);

namespace App\Admin\DTO;

class Limits
{
    public int $surveys;
	public int $maxSurveys;
	public int $fileSize;
	public int $maxFilesSize;
}