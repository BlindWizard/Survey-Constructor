<?php
declare(strict_types=1);

namespace App\Admin\Contracts;

use App\Admin\DTO\TemplateObject;

interface TemplatesFactoryContract
{
    public function getBlank(): TemplateObject;
}