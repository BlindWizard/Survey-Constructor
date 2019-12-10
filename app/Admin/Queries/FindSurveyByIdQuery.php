<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Reporitories\BlockRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\BlockWrapper;
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

    /** @var BlockRepositoryContract */
    public $blockRepository;

    public function __construct(SurveyRepositoryContract $surveyRepository, SurveyServiceContract $surveyService, BlockRepositoryContract $blockRepository)
    {
        $this->surveyRepository = $surveyRepository;
        $this->surveyService = $surveyService;
        $this->blockRepository = $blockRepository;
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

        $this->survey = new SurveyObject();
        $this->survey->id = $survey->getId();
        $this->survey->title = $survey->getTitle();
        $this->survey->ownerId = $survey->getOwnerId();
        $this->survey->createdAt = $survey->getCreatedAt();
        $this->survey->updatedAt = $survey->getUpdatedAt();

        $blocks = $this->blockRepository->getSurveyBlocks($survey->getId());
        $this->survey->blocks = array_map(function (BlockContract $block) {
            return new BlockWrapper($block);
        }, $blocks);

        return $this;
    }

    public function getResult(): SurveyContract
    {
        return  $this->survey;
    }
}