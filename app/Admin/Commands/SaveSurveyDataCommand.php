<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\DataContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\SurveyData;
use App\Http\Requests\SaveSurveyDataRequest;
use Ramsey\Uuid\Uuid;

class SaveSurveyDataCommand implements Command
{
    /** @var string */
    public $userId;

    /** @var SaveSurveyDataRequest */
    public $request;

    /** @var SurveyServiceContract */
    protected $surveyService;

    /** @var SurveyRepositoryContract */
    protected $surveyRepository;

    /** @var BlockServiceContract */
    protected $blockService;

    /** @var DataContract */
    protected $surveyData;

    /**
     * @param SurveyServiceContract    $surveyService
     * @param SurveyRepositoryContract $surveyRepository
     * @param BlockServiceContract     $blockService
     */
    public function __construct(SurveyServiceContract $surveyService, SurveyRepositoryContract $surveyRepository, BlockServiceContract $blockService)
    {
        $this->surveyService = $surveyService;
        $this->surveyRepository = $surveyRepository;
        $this->blockService = $blockService;
    }

    public function perform(): Command
    {
        $survey = $this->surveyRepository->findById($this->request->getSurveyId());
        if (false === $this->surveyService->canOperate($survey, $this->userId)) {
            throw new AccessDeniedHttpException();
        }

        $data = new SurveyData();
        $data->id = $this->request->getDataId();
        $data->type = $this->request->getDataType();
        $data->data = $this->request->getData();

        $this->surveyData = $this->surveyService->saveData($this->request->getSurveyId(), $data);

        return $this;
    }

    public function getResult(): DataContract
    {
        return $this->surveyData;
    }
}