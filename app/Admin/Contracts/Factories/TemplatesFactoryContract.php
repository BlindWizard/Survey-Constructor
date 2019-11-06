<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Factories;

use App\Admin\DTO\TemplateObject;
use App\Admin\Exceptions\TemplateNotFoundException;

interface TemplatesFactoryContract
{
    /**
     * @param string $title
     *
     * @return TemplateObject
     *
     * @throws TemplateNotFoundException
     */
    public function getSystemTemplate(string $title): TemplateObject;

    /**
     * @return TemplateObject
     */
    public function getBlank(): TemplateObject;
}