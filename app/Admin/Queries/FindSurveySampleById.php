<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FindSurveySampleById implements Command
{
    /** @var string */
    public $surveyId;

    /** @var string */
    public $sampleId;

    /** @var string */
    public $userId;

    protected $result;

    /** @var SurveyRepositoryContract */
    protected $surveyRepository;

    /** @var SurveyRepositoryContract */
    protected $surveyService;

    /** @var SurveyStatisticRepositoryContract */
    protected $statisticRepository;

    public function __construct(SurveyRepositoryContract $surveyRepository, SurveyServiceContract $surveyService, SurveyStatisticRepositoryContract $statisticRepository)
    {
        $this->surveyRepository = $surveyRepository;
        $this->surveyService = $surveyService;
        $this->statisticRepository = $statisticRepository;
    }

    public function perform(): Command
    {
        $survey = $this->surveyRepository->findById($this->surveyId);

        if (null === $survey) {
            throw new NotFoundHttpException();
        }

        if (false === $this->surveyService->canOperate($survey, $this->userId)) {
            throw new AccessDeniedHttpException();
        }

        $this->result = $this->statisticRepository->findStatisticsSampleBySurveyId($this->surveyId, $this->sampleId);

        return $this;
    }

    public function getResult()
    {
        return $this->result;
    }
}