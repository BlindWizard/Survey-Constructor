<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use Carbon\Carbon;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FindSurveyStatisticsById implements Command
{
    /** @var string */
    public $surveyId;

    /** @var Carbon|null */
    public $dateFrom;

    /** @var Carbon|null */
    public $dateTo;

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

        $this->result = $this->statisticRepository->findBlockStatisticsBySurveyId($this->surveyId, $this->dateFrom, $this->dateTo);

        return $this;
    }

    public function getResult()
    {
        return $this->result;
    }
}