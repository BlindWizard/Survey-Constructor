<?php

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Repositories\TemplateRepositoryContract;
use App\Admin\Database\Models\Template;

/**
 * Templates DB repository.
 */
class TemplateRepository implements TemplateRepositoryContract
{
    /**
     * @inheritdoc
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
     * @inheritdoc
     */
    public function findById(string $id): Template
    {
        return Template::query()->find($id)->get()->first();
    }

    /**
     * @inheritdoc
     */
    public function create(string $title): Template
    {
        // TODO: Implement create() method.
    }
}