<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Repositories\BlockRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\BlockWrapper;
use App\Admin\DTO\Container;
use App\Admin\DTO\Page;
use App\Admin\DTO\Survey;
use App\Admin\Factories\BlockFactory;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FindSurveyById implements Command
{
    /** @var string */
    public $surveyId;

    /** @var string */
    public $userId;

    /** @var SurveyContract */
    protected $survey;

    /** @var SurveyRepositoryContract */
    protected $surveyRepository;

    /** @var SurveyRepositoryContract */
    protected $surveyService;

    /** @var BlockRepositoryContract */
    protected $blockFactory;

    public function __construct(SurveyRepositoryContract $surveyRepository, SurveyServiceContract $surveyService, BlockFactory $blockFactory)
    {
        $this->surveyRepository = $surveyRepository;
        $this->surveyService = $surveyService;
        $this->blockFactory = $blockFactory;
    }

    /**
     * @return Command
     */
    public function perform(): Command
    {
        $survey = $this->surveyRepository->findById($this->surveyId);

        if (null === $survey) {
            throw new NotFoundHttpException();
        }

        if (false === $this->surveyService->canOperate($survey, $this->userId)) {
            throw new AccessDeniedHttpException();
        }

        $surveyObject = new Survey();
        $surveyObject->id = $survey->getId();
        $surveyObject->title = $survey->getTitle();
        $surveyObject->ownerId = $survey->getOwnerId();
        $surveyObject->createdAt = $survey->getCreatedAt();
        $surveyObject->updatedAt = $survey->getUpdatedAt();

        foreach ($survey->getPages() as $page) {
            $pageObject = new Page();
            $pageObject->id = $page->getId();
            $pageObject->step = $page->getStep();
            $pageObject->surveyId = $page->getSurveyId();

            $surveyObject->pages[] = $pageObject;

            foreach ($page->getBlocks() as $block) {
                $blockObject = $this->blockFactory->getDTO($block);/** @var Container $blockObject */

                $pageObject->blocks[] = new BlockWrapper($blockObject);
            }
        }

        $surveyObject->data = $survey->getData();

        $this->survey = $surveyObject;

        return $this;
    }

    public function getResult(): SurveyContract
    {
        return $this->survey;
    }
}