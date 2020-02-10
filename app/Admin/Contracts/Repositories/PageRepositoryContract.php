<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Contracts\Entities\PageContract;

interface PageRepositoryContract
{
    /**
     * @param string $id
     *
     * @return PageContract|null
     */
    public function findById(string $id): ?PageContract;

    /**
     * @param string $surveyId
     * @param int    $step
     *
     * @return PageContract
     *
     * @throws \Throwable
     */
    public function addPage(string $surveyId, int $step): PageContract;

    /**
     * @param string $block
     *
     * @return PageContract
     */
    public function getPageByBlockId(string $block): ?PageContract;

    /**
     * @param string $surveyId
     *
     * @return PageContract
     */
    public function getLastPage(string $surveyId): PageContract;
}