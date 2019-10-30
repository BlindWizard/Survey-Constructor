<?php
declare(strict_types=1);

namespace App\Admin\Contracts;

use App\Admin\Database\Models\Template;

interface TemplateRepositoryContract
{
    /**
     * @return Template[]
     */
    public function getPublic(): array;
}