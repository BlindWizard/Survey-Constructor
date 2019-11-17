<?php
declare(strict_types=1);

namespace App\Admin\Queries;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Services\TemplateServiceContract;

class GetAllUsersTemplates implements Command
{
    /** @var string */
    public $userId;

    /** @var TemplateContract[] */
    public $templates;

    /** @var TemplateServiceContract */
    public $templatesService;

    public function __construct(TemplateServiceContract $templatesService)
    {
        $this->templatesService = $templatesService;
    }

    /**
     * @return Command
     */
    public function perform(): Command
    {
        $this->templates = $this->templatesService->getAvailableTemplates($this->userId);

        return $this;
    }

    public function getResult(): array
    {
        return $this->templates;
    }
}