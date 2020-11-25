<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\DataContract;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\SurveyFactoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\Survey;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SurveyService implements SurveyServiceContract
{
    /** @var SurveyFactoryContract */
    protected $surveyFactory;

    /** @var SurveyRepositoryContract */
    protected $surveyRepository;

    /** @var SurveyStatisticRepositoryContract */
    protected $statisticRepository;

    public function __construct(SurveyFactoryContract $surveyFactory, SurveyRepositoryContract $surveyRepository, SurveyStatisticRepositoryContract $statisticRepository)
    {
        $this->surveyFactory = $surveyFactory;
        $this->surveyRepository = $surveyRepository;
        $this->statisticRepository = $statisticRepository;
    }

    /**
     * @inheritDoc
     */
    public function getAvailableSurveys(string $ownerId): array
    {
        $surveys = $this->surveyRepository->getAvailableSurveys($ownerId);
        $objects = [];
        foreach ($surveys as $survey) {
            $object            = new Survey();
            $object->id        = $survey->getId();
            $object->title     = $survey->getTitle();
            $object->ownerId   = $survey->getOwnerId();
            $object->createdAt = $survey->getCreatedAt();
            $object->updatedAt = $survey->getUpdatedAt();

            $object->statistics = $this->statisticRepository->findStatisticsBySurveyId($survey->getId());

            $objects[] = $object;
        }

        return $objects;
    }

    /**
     * @inheritDoc
     */
    public function createFromTemplate(string $ownerId, TemplateContract $template): SurveyContract
    {
        $survey = $this->surveyFactory->build($ownerId, $template);
        $this->surveyRepository->save($survey);

        return $survey;
    }

    /**
     * @inheritDoc
     */
    public function canOperate(SurveyContract $survey, string $userId): bool
    {
        return $survey->getOwnerId() === $userId;
    }

    /**
     * @inheritDoc
     */
    public function canOperateById(string $surveyId, string $userId): bool
    {
        $survey = $this->surveyRepository->findById($surveyId);
        if (null === $survey) {
            throw new NotFoundHttpException();
        }

        return $this->canOperate($survey, $userId);
    }

    public function addData(string $surveyId, DataContract $data): DataContract
    {
        $survey = $this->surveyRepository->findById($surveyId);
        if (null === $survey) {
            throw new NotFoundHttpException();
        }

        return $this->surveyRepository->addData($surveyId, $data);
    }

    public function saveData(string $surveyId, DataContract $data): DataContract
    {
        $survey = $this->surveyRepository->findById($surveyId);
        if (null === $survey) {
            throw new NotFoundHttpException();
        }

        return $this->surveyRepository->saveData($surveyId, $data);
    }
}