<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Services;

use Throwable;

interface BlockServiceContract
{
    /**
     * @param int    $surveyId
     * @param string $type
     * @param int    $position
     *
     * @throws Throwable
     */
    public function addEmptyElement(int $surveyId, string $type, int $position): void;
}