<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Services;

use App\Admin\Contracts\Entities\PageContract;

interface PageServiceContract
{
    /**
     * @param string $surveyId
     *
     * @return PageContract
     *
     * @throws \Throwable
     */
    public function addPage(string $surveyId): PageContract;

    /**
     * @param string $pageId
     */
    public function deletePage(string $pageId): void;
}