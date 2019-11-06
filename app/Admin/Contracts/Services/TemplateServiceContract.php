<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Services;

interface TemplateServiceContract {
    public function getAvailableTemplates(): array;
}