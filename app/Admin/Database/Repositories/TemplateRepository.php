<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Repositories\TemplateRepositoryContract;
use App\Admin\Database\Models\Template;

/**
 * Templates DB repository.
 */
class TemplateRepository implements TemplateRepositoryContract
{
    /**
     * @inheritDoc
     */
    public function getPublic(string $ownerId): array
    {
        $templates = Template::query()
            ->where(Template::ATTR_PUBLIC, '=', true)
            ->where(Template::ATTR_OWNER_ID, '=', $ownerId)
            ->get()
            ->all();

        return $templates;
    }

    /**
     * @inheritDoc
     */
    public function findById(string $id): ?Template
    {
        return Template::query()->find($id)->first();
    }

    /**
     * @inheritDoc
     */
    public function create(string $title): Template
    {
        // TODO: Implement create() method.
    }
}