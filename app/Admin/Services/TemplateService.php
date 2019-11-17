<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Contracts\Repositories\TemplateRepositoryContract;
use App\Admin\Contracts\Services\TemplateServiceContract;
use App\Admin\DTO\TemplateObject;

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

    /**
     * @inheritdoc
     */
    public function getAvailableTemplates(string $ownerId): array
    {
        $public = $this->templatesRepository->getPublic($ownerId);
        $objects = [];
        foreach ($public as $template) {
            $object            = new TemplateObject();
            $object->id        = $template->getId();
            $object->title     = $template->getTitle();
            $object->public    = $template->getPublic();
            $object->ownerId   = $template->getOwnerId();
            $object->createdAt = $template->getCreatedAt();
            $object->updatedAt = $template->getUpdatedAt();
        }

        return array_merge(
            [$this->templatesFactory->getBlank()],
            $objects
        );
    }
}