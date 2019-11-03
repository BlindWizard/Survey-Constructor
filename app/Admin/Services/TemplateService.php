<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\TemplateRepositoryContract;
use App\Admin\Contracts\TemplateServiceContract;
use App\Admin\DTO\TemplateObject;
use Ramsey\Uuid\Uuid;

class TemplateService implements TemplateServiceContract
{
    /** @var TemplateRepositoryContract */
    private $templatesRepository;

    public function __construct(TemplateRepositoryContract $templatesRepository)
    {
        $this->templatesRepository = $templatesRepository;
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
            [$this->getBlankTemplate()],
            $objects
        );
    }

    public function getBlankTemplate(): TemplateObject
    {
        $template = new TemplateObject();
        $template->id = Uuid::NIL;
        $template->title = 'Blank';
        $template->public = true;

        return  $template;
    }
}