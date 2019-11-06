<?php

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Repositories\TemplateRepositoryContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\Exceptions\TemplateNotFoundException;
use App\Admin\Rules\TemplateRules;
use App\Http\Requests\CreateSurveyRequest;

class CreateSurveyCommand implements Command
{
    /** @var CreateSurveyRequest */
    public $request;

    /** @var SurveyServiceContract */
    protected $surveyService;

    /** @var TemplatesFactoryContract  */
    protected $templatesFactory;

    /** @var TemplateRepositoryContract  */
    protected $templateRepository;

    /** @var string[] */
    protected $messages = [];

    /** @var string[] */
    protected $errors = [];

    public function __construct(SurveyServiceContract $surveyService, TemplatesFactoryContract $templatesFactory, TemplateRepositoryContract $templateRepository)
    {
        $this->surveyService = $surveyService;
        $this->templatesFactory = $templatesFactory;
        $this->templateRepository = $templateRepository;
    }

    public function perform()
    {
        try {
            if (TemplateRules::isSystem($this->request)) {
                $template = $this->templatesFactory->getSystemTemplate($this->request->getTitle());
            }
            else {
                $template = $this->templateRepository->findById($this->request->getId());
            }

            $this->surveyService->createFromTemplate($template);
        }
        catch (TemplateNotFoundException $e) {
            $this->errors[] = __('Template not found');
        }
    }

    public function getResult(): array
    {
        return [$this->messages, $this->errors];
    }
}