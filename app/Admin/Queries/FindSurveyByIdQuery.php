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
use App\Admin\DTO\PageObject;
use App\Admin\DTO\SurveyObject;
use App\Admin\Factories\BlockFactory;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FindSurveyByIdQuery implements Command
{
    /** @var string */
    public $surveyId;

    /** @var string */
    public $userId;

    /** @var SurveyContract */
    public $survey;

    /** @var SurveyRepositoryContract */
    public $surveyRepository;

    /** @var SurveyRepositoryContract */
    public $surveyService;

    /** @var BlockRepositoryContract */
    public $blockFactory;

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

        $surveyObject = new SurveyObject();
        $surveyObject->id = $survey->getId();
        $surveyObject->title = $survey->getTitle();
        $surveyObject->ownerId = $survey->getOwnerId();
        $surveyObject->createdAt = $survey->getCreatedAt();
        $surveyObject->updatedAt = $survey->getUpdatedAt();

        foreach ($survey->getPages() as $page) {
            $pageObject = new PageObject();
            $pageObject->id = $page->getId();
            $pageObject->step = $page->getStep();
            $pageObject->surveyId = $page->getSurveyId();

            $surveyObject->pages[] = $pageObject;

            foreach ($page->getBlocks() as $block) {
                $pageObject->blocks[] = $this->blockFactory->getDTO($block);
            }
        }

        $this->survey = $surveyObject;

        return $this;
    }

    public function getResult(): SurveyContract
    {
        return $this->survey;
    }
}