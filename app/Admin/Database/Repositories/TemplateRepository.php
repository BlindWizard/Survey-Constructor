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
     * @return Template[]
     */
    public function getPublic(): array
    {
        $templates = Template::query()->where(Template::ATTR_PUBLIC, '=', true)->get()->all();

        return $templates;
    }

    public function findById(string $id): Template
    {
        return Template::query()->find($id)->get()->first();
    }
}