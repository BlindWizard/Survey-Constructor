<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Database\Models\Template;

interface TemplateRepositoryContract
{
    /**
     * @param string $title
     *
     * @return Template
     */
    public function create(string $title): Template;

    /**
     * @param string $ownerId
     *
     * @return Template[]
     */
    public function getPublic(string $ownerId): array;

    /**
     * @param string $id
     *
     * @return Template|null
     */
    public function findById(string $id): ?Template;
}