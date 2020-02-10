<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\PageContract;
use App\Admin\Contracts\Repositories\PageRepositoryContract;
use App\Admin\Contracts\Services\PageServiceContract;
use http\Exception\InvalidArgumentException;

class AddPageCommand implements Command
{
    /** @var string */
    public $userId;

    /** @var string */
    public $surveyId;

    /** @var PageServiceContract */
    protected $pageService;

    /** @var PageContract */
    protected $page;

    /**
     * @param PageServiceContract $pageService
     */
    public function __construct(PageServiceContract $pageService)
    {
        $this->pageService = $pageService;
    }

    public function perform(): Command
    {
        $this->page = $this->pageService->addPage($this->surveyId);

        return $this;
    }

    public function getResult(): PageContract
    {
        return $this->page;
    }
}