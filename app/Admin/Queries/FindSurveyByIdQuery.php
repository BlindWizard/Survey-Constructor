<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\SurveyObject;
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

    public function __construct(SurveyRepositoryContract $surveyRepository, SurveyServiceContract $surveyService)
    {
        $this->surveyRepository = $surveyRepository;
        $this->surveyService = $surveyService;
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
        $surveyObject->blocks = [];
        $surveyObject->ownerId = $survey->getOwnerId();
        $surveyObject->createdAt = $survey->getCreatedAt();
        $surveyObject->updatedAt = $survey->getUpdatedAt();

        $this->survey = $surveyObject;

        return $this;
    }

    public function getResult(): SurveyContract
    {
        return  $this->survey;
    }
}