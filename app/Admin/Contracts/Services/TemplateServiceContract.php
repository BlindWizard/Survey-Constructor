<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Services;

use App\Admin\DTO\Template;

interface TemplateServiceContract {
    /**
     * @param string $ownerIdId
     *
     * @return Template[]
     */
    public function getAvailableTemplates(string $ownerIdId): array;
}