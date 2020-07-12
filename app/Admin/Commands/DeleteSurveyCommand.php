<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Http\Requests\DeleteSurveyRequest;

class DeleteSurveyCommand implements Command
{
    /** @var DeleteSurveyRequest */
    public $request;

    /** @var string */
    public $userId;

    /** @var SurveyRepositoryContract */
    protected $surveyRepository;

    /** @var SurveyServiceContract */
    protected $surveyService;

    public function __construct(SurveyServiceContract $surveyService, SurveyRepositoryContract $surveyRepository)
    {
        $this->surveyService = $surveyService;
        $this->surveyRepository = $surveyRepository;
    }

    public function perform(): Command
    {
        if (false === $this->surveyService->canOperateById($this->request->getId(), $this->userId)) {
            throw new AccessDeniedHttpException();
        }

        $this->surveyRepository->delete($this->request->getId());

        return $this;
    }

    public function getResult()
    {
        return true;
    }
}