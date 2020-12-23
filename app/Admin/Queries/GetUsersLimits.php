<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\LimitsContract;
use App\Admin\Contracts\Repositories\FileRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\DTO\Limits;

class GetUsersLimits implements Command
{
    /** @var string */
    public $userId;

    /** @var Limits */
    protected $limits;

    protected SurveyRepositoryContract $surveyRepository;

    protected FileRepositoryContract $fileRepository;

    public function __construct(SurveyRepositoryContract $surveyRepository, FileRepositoryContract $fileRepository)
    {
        $this->surveyRepository = $surveyRepository;
        $this->fileRepository = $fileRepository;
    }

    public function perform(): Command
    {
        $this->limits = new Limits();
        $this->limits->surveys = $this->surveyRepository->getSurveysCount($this->userId);
        $this->limits->maxSurveys = LimitsContract::MAX_SURVEYS_COUNT;
        $this->limits->fileSize = $this->fileRepository->getTotalSize($this->userId);
        $this->limits->maxFilesSize = LimitsContract::MAX_FILES_SIZE;

        return $this;
    }

    public function getResult(): Limits
    {
        return $this->limits;
    }
}