<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\SurveyFactoryContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;

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

    public function createFromTemplate(string $ownerId, TemplateContract $template): SurveyContract
    {
        $blocks = $this->templateFactory->getBlocks($template);

        $survey = $this->surveyFactory->build($ownerId, $template, $blocks);

        $this->surveyRepository->save($survey);

        return $survey;
    }
}