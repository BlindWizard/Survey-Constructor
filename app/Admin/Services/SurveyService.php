<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\SurveyFactoryContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\SurveyObject;

class SurveyService implements SurveyServiceContract
{
    /** @var SurveyFactoryContract */
    public $templateFactory;

    /** @var SurveyFactoryContract */
    public $surveyFactory;

    /** @var SurveyRepositoryContract */
    public $surveyRepository;

    public function __construct(TemplatesFactoryContract $templateFactory, SurveyFactoryContract $surveyFactory, SurveyRepositoryContract $surveyRepository)
    {
        $this->templateFactory = $templateFactory;
        $this->surveyFactory = $surveyFactory;
        $this->surveyRepository = $surveyRepository;
    }

    /**
     * @inheritdoc
     */
    public function getAvailableSurveys(string $ownerId): array
    {
        $surveys = $this->surveyRepository->getAvailableSurveys($ownerId);
        $objects = [];
        foreach ($surveys as $survey) {
            $object            = new SurveyObject();
            $object->id        = $survey->getId();
            $object->title     = $survey->getTitle();
            $object->ownerId   = $survey->getOwnerId();
            $object->createdAt = $survey->getCreatedAt();
            $object->updatedAt = $survey->getUpdatedAt();

            $objects[] = $object;
        }

        return $objects;
    }

    /**
     * @inheritdoc
     */
    public function createFromTemplate(string $ownerId, TemplateContract $template): SurveyContract
    {
        $blocks = $this->templateFactory->getBlocks($template);

        $survey = $this->surveyFactory->build($ownerId, $template, $blocks);

        $this->surveyRepository->save($survey);

        return $survey;
    }

    /**
     * @inheritdoc
     */
    public function canOperate(SurveyContract $survey, string $userId): bool
    {
        return $survey->getOwnerId() === $userId;
    }
}