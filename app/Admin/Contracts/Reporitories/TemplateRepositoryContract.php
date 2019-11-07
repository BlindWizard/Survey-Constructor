<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Database\Models\Template;

interface TemplateRepositoryContract
{
    public function create(string $title): Template;
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