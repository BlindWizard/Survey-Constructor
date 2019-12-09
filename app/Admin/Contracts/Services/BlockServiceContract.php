<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Services;

use Throwable;

interface BlockServiceContract
{
    /**
     * @param string $surveyId
     * @param string $type
     * @param int    $position
     *
     * @throws Throwable
     */
    public function addEmptyElement(string $surveyId, string $type, int $position): void;
}