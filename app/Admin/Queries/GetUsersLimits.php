<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
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
        $this->limits->maxSurveys = 3;
        $this->limits->fileSize = $this->fileRepository->getTotalSize($this->userId);
        $this->limits->maxFilesSize = 104857600; // 100 Mb

        return $this;
    }

    public function getResult(): Limits
    {
        return $this->limits;
    }
}