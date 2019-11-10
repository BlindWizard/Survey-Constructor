<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Services;

use App\Admin\DTO\TemplateObject;

interface TemplateServiceContract {
    /**
     * @return TemplateObject[]
     */
    public function getAvailableTemplates(): array;
}