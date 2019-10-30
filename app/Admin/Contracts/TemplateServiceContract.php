<?php
declare(strict_types=1);

namespace App\Admin\Contracts;

interface TemplateServiceContract {
    public function getAvailableTemplates(): array;
}