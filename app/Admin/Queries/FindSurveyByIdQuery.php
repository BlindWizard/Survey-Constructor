<?php

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\DTO\SurveyObject;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class FindSurveyByIdQuery implements Command
{
    /** @var string */
    public $surveyId;

    /** @var SurveyContract */
    public $survey;

    /** @var SurveyRepositoryContract */
    public $surveyRepository;

    public function __construct(SurveyRepositoryContract $surveyRepository)
    {
        $this->surveyRepository = $surveyRepository;
    }

    /**
     * @return Command
     *
     * @throws \Exception
     */
    public function perform(): Command
    {
        $survey = $this->surveyRepository->findById($this->surveyId);

        $surveyObject = new SurveyObject();
        $surveyObject->id = $survey->id;
        $surveyObject->title = $survey->title;
        $surveyObject->blocks = [];
        $surveyObject->createdAt = $survey->created_at;
        $surveyObject->updatedAt = $survey->updated_at;

        $this->survey = $surveyObject;

        return $this;
    }

    public function getResult(): SurveyContract
    {
        return  $this->survey;
    }
}