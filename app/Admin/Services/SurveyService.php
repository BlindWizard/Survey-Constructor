<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\SurveyObject;

class SurveyService implements SurveyServiceContract
{
    /** @var TemplatesFactoryContract */
    protected $templatesFactory;

    public function __construct(TemplatesFactoryContract $templatesFactory)
    {
        $this->templatesFactory = $templatesFactory;
    }

    public function createFromTemplate(TemplateContract $template): SurveyObject
    {

    }
}