<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Services\SurveyServiceContract;

class GetAllUsersSurveys implements Command
{
    /** @var string */
    public $userId;

    /** @var SurveyContract[] */
    public $surveys;

    /** @var SurveyServiceContract */
    public $surveyService;

    public function __construct(SurveyServiceContract $surveyService)
    {
        $this->surveyService = $surveyService;
    }

    /**
     * @return Command
     */
    public function perform(): Command
    {
        $this->surveys = $this->surveyService->getAvailableSurveys($this->userId);

        return $this;
    }

    public function getResult(): array
    {
        return $this->surveys;
    }
}