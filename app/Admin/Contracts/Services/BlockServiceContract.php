<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Services;

use App\Admin\Contracts\Entities\BlockContract;
use Throwable;

interface BlockServiceContract
{

    /**
     * @param string $surveyId
     * @param string $type
     * @param int    $position
     *
     * @return BlockContract
     *
     * @throws Throwable
     */
    public function addEmptyElement(string $surveyId, string $type, int $position): BlockContract;

    /**
     * @param string $blockId
     * @param array  $data
     *
     * @return BlockContract
     */
    public function setElementData(string $blockId, array $data): BlockContract;

    /**
     * @param string $blockId
     *
     * @return void
     *
     * @throws Throwable
     */
    public function deleteElement(string $blockId): void;
}