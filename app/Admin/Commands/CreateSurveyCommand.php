<?php
declare(strict_types=1);

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
    /** @var string */
    public $ownerId;

    /** @var CreateSurveyRequest */
    public $request;

    /** @var SurveyServiceContract */
    protected $surveyService;

    /** @var TemplatesFactoryContract  */
    protected $templatesFactory;

    /** @var TemplateRepositoryContract  */
    protected $templateRepository;

    /** @var string */
    public $surveyId;

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

    public function perform(): Command
    {
        try {
            if (TemplateRules::isSystem($this->request->getId())) {
                $template = $this->templatesFactory->getSystemTemplate($this->request->getId());
            }
            else {
                $template = $this->templateRepository->findById($this->request->getId());
            }

            $survey         = $this->surveyService->createFromTemplate($this->ownerId, $template);
            $this->surveyId = $survey->getId();

            $this->messages[] = __('Survey was successfully created');
        }
        catch (TemplateNotFoundException $e) {
            $this->errors[] = __('Template not found');
        }

        return $this;
    }

    public function getResult(): array
    {
        return [$this->surveyId, $this->messages, $this->errors];
    }
}