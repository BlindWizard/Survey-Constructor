<?php

namespace App\Admin\Contracts\Reporitories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Database\Models\Block;
use App\Admin\Exceptions\BlockTypeException;
use Throwable;

interface BlockRepositoryContract
{
    /**
     * @param BlockContract $block
     *
     * @throws Throwable
     */
    public function save(BlockContract $block): BlockContract;

    /**
     * @param string $surveyId
     *
     * @return BlockContract[]
     *
     * @throws BlockTypeException
     */
    public function getSurveyBlocks(string $surveyId): array;

    /**
     * @param string $surveyId
     *
     * @return BlockContract|null
     */
    public function findLastBlock(string $surveyId): ?BlockContract;
}