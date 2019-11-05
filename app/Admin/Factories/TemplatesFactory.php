<?php

namespace App\Admin\Factories;

use App\Admin\Contracts\TemplatesFactoryContract;
use App\Admin\DTO\TemplateObject;
use Ramsey\Uuid\Uuid;

class TemplatesFactory implements TemplatesFactoryContract
{
    public const BLANK = 'blank';

    public function getBlank(): TemplateObject
    {
        $blank = new TemplateObject();
        $blank->id = Uuid::NIL;
        $blank->title = __(static::BLANK);
        $blank->public = true;

        return $blank;
    }
}