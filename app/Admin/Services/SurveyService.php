<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\SurveyFactoryContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;

class SurveyService implements SurveyServiceContract
{
    /** @var SurveyFactoryContract */
    public $templateFactory;

    /** @var SurveyFactoryContract */
    public $surveyFactory;

    public function __construct(TemplatesFactoryContract $templateFactory, SurveyFactoryContract $surveyFactory)
    {
        $this->templateFactory = $templateFactory;
        $this->surveyFactory = $surveyFactory;
    }

    public function createFromTemplate(TemplateContract $template): SurveyContract
    {
        $blocks = $this->templateFactory->getBlocks($template);

        $survey = $this->surveyFactory->build($template, $blocks);

        return $survey;
    }
}