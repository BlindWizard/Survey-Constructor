<?php

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\DTO\TemplateObject;
use App\Admin\Exceptions\TemplateNotFoundException;

class TemplatesFactory implements TemplatesFactoryContract
{
    /**
     * @inheritdoc
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
     * @inheritdoc
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