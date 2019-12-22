<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\DTO\TemplateObject;
use App\Admin\Exceptions\TemplateNotFoundException;

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
        $blank = new TemplateObject();
        $blank->id = static::BLANK_UUID;
        $blank->title = __('blank');
        $blank->public = true;

        return $blank;
    }

    /**
     * @param TemplateContract $template
     *
     * @return BlockContract[]
     *
     * @throws TemplateNotFoundException
     */
    public function getBlocks(TemplateContract $template): array
    {
        switch ($template->getId()) {
            case static::BLANK_UUID:
                return  [];
            default:
                throw new TemplateNotFoundException();
        }
    }
}