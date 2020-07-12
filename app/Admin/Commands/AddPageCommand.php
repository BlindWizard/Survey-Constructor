<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\PageContract;
use App\Admin\Contracts\Services\PageServiceContract;
use App\Admin\Contracts\Services\SurveyServiceContract;

class AddPageCommand implements Command
{
    /** @var string */
    public $userId;

    /** @var string */
    public $surveyId;

    /** @var SurveyServiceContract */
    protected $surveyService;

    /** @var PageServiceContract */
    protected $pageService;

    /** @var PageContract */
    protected $page;

    /**
     * @param PageServiceContract $pageService
     */
    public function __construct(SurveyServiceContract $surveyService, PageServiceContract $pageService)
    {
        $this->surveyService = $surveyService;
        $this->pageService = $pageService;
    }

    public function perform(): Command
    {
        if (false === $this->surveyService->canOperateById($this->surveyId, $this->userId)) {
            throw new AccessDeniedHttpException();
        }

        $this->page = $this->pageService->addPage($this->surveyId);

        return $this;
    }

    public function getResult(): PageContract
    {
        return $this->page;
    }
}