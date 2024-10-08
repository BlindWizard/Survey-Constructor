<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\PageContract;
use App\Admin\Contracts\Repositories\PageRepositoryContract;
use App\Admin\Contracts\Services\PageServiceContract;
use App\Admin\DTO\Page;

class PageService implements PageServiceContract
{
    /** @var PageRepositoryContract */
    protected $pageRepository;

    /**
     * @param PageRepositoryContract $pageRepository
     */
    public function __construct(PageRepositoryContract $pageRepository)
    {
        $this->pageRepository = $pageRepository;
    }

    /**
     * @inheritDoc
     */
    public function addPage(string $surveyId): PageContract
    {
        $lastPage = $this->pageRepository->getLastPage($surveyId);

        $page = $this->pageRepository->addPage($surveyId, null === $lastPage ? 0 : $lastPage->getStep() + 1);

        $result = new Page();
        $result->id = $page->getId();
        $result->surveyId = $page->getSurveyId();
        $result->step = $page->getStep();

        return $result;
    }

    /**
     * @inheritDoc
     */
    public function deletePage(string $pageId): void
    {
        $this->pageRepository->deletePage($pageId);
    }
}