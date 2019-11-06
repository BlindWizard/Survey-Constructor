<?php

namespace App\Admin\Factories;

use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\DTO\TemplateObject;
use App\Admin\Exceptions\TemplateNotFoundException;
use Ramsey\Uuid\Uuid;

class TemplatesFactory implements TemplatesFactoryContract
{
    public const BLANK = 'blank';

    /**
     * @inheritdoc
     */
    public function getSystemTemplate(string $title): TemplateObject
    {
        switch ($title) {
            case static::BLANK:
                return $this->getBlank();
            default:
                throw new TemplateNotFoundException();
        }
    }

    /**
     * @inheritdoc
     */
    public function getBlank(): TemplateObject
    {
        $blank = new TemplateObject();
        $blank->id = Uuid::NIL;
        $blank->title = __(static::BLANK);
        $blank->public = true;

        return $blank;
    }
}