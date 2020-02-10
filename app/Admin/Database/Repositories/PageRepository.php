<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\PageContract;
use App\Admin\Contracts\Repositories\PageRepositoryContract;
use App\Admin\Database\Models\Block;
use App\Admin\Database\Models\Page;
use Ramsey\Uuid\Uuid;

class PageRepository implements PageRepositoryContract
{
    /**
     * @inheritDoc
     */
    public function findById(string $id): ?PageContract
    {
        $page = Page::query()->where(Page::ATTR_ID, '=', $id)->first();/** @var Page $page */

        return $page;
    }


    /**
     * @inheritDoc
     */
    public function getPageByBlockId(string $blockId): ?PageContract
    {
        $block = Block::query()
            ->with(Block::REL_PAGE)
            ->where(Block::ATTR_ID, '=', $blockId)
            ->first();/** @var Block $block */

        return $block->page;
    }

    /**
     * @inheritDoc
     */
    public function getLastPage(string $surveyId): PageContract
    {
        $page = Page::query()->where(Page::ATTR_SURVEY_ID, '=', $surveyId)->orderBy(Page::ATTR_STEP, 'DESC')->first();/** @var Page $page */

        return $page;
    }

    /**
     * @inheritDoc
     */
    public function addPage(string $surveyId, int $step): PageContract
    {
        $page = new Page();
        $page->id = Uuid::uuid4()->toString();
        $page->survey_id = $surveyId;
        $page->step = $step;
        $page->saveOrFail();

        return $page;
    }
}