<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Database\Models\Template;

interface TemplateRepositoryContract
{
    /**
     * @return Template[]
     */
    public function getPublic(): array;

    /**
     * @param string $id
     *
     * @return Template
     */
    public function findById(string $id): Template;
}