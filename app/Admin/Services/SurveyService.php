<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Repositories\TemplateRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\SurveyObject;

class SurveyService implements SurveyServiceContract
{
    /** @var TemplatesFactoryContract */
    protected $templatesFactory;

    /** @var TemplateRepositoryContract */
    protected $templateRepository;

    public function __construct(TemplatesFactoryContract $templatesFactory, TemplateRepositoryContract $templateRepository)
    {
        $this->templatesFactory = $templatesFactory;
        $this->templateRepository = $templateRepository;
    }

    public function createFromTemplate(TemplateContract $template): SurveyObject
    {
        $this->templateRepository->getPublic();
    }
}