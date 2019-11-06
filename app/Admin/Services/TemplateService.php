<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Repositories\TemplateRepositoryContract;
use App\Admin\Contracts\Services\TemplateServiceContract;
use App\Admin\DTO\TemplateObject;
use App\Admin\Rules\TemplateRules;

class TemplateService implements TemplateServiceContract
{
    /** @var TemplateRepositoryContract */
    private $templatesRepository;

    /** @var TemplatesFactoryContract */
    private $templatesFactory;

    public function __construct(TemplateRepositoryContract $templatesRepository, TemplatesFactoryContract $templatesFactory)
    {
        $this->templatesRepository = $templatesRepository;
        $this->templatesFactory = $templatesFactory;
    }

    public function getAvailableTemplates(): array
    {
        $public = $this->templatesRepository->getPublic();
        $objects = [];
        foreach ($public as $template) {
            $object            = new TemplateObject();
            $object->id        = $template->id;
            $object->title     = $template->title;
            $object->public    = $template->public;
            $object->createdAt = $template->created_at;
            $object->updatedAt = $template->updated_at;
        }

        return array_merge(
            [$this->templatesFactory->getBlank()],
            $objects
        );
    }
}