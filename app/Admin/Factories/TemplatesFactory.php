<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\DTO\Page;
use App\Admin\DTO\Template;
use App\Admin\Exceptions\TemplateNotFoundException;
use Ramsey\Uuid\Uuid;

class TemplatesFactory implements TemplatesFactoryContract
{
    /**
     * @inheritDoc
     */
    public function getSystemTemplate(string $id): TemplateContract
    {
        switch ($id) {
            case static::BLANK_UUID:
                return $this->getBlank();
            default:
                throw new TemplateNotFoundException();
        }
    }

    /**
     * @inheritDoc
     */
    public function getBlank(): TemplateContract
    {
        $blank = new Template();
        $blank->id = static::BLANK_UUID;
        $blank->title = __('blank');
        $blank->public = true;

        $mainPage = new Page();
        $mainPage->id = Uuid::uuid4()->toString();
        $mainPage->step = 0;
        $mainPage->surveyId = $blank->id;
        $mainPage->blocks = [];

        $blank->pages[] = $mainPage;

        return $blank;
    }
}