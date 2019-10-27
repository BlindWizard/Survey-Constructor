<?php

namespace App\Admin\Database\Repositories;

use App\Admin\Database\Models\Template;

/**
 * Templates DB repository.
 */
class TemplateRepository
{
    /**
     * @return Template[]
     */
    public function getPublic(): array
    {
        $templates = Template::query()->where(Template::ATTR_PUBLIC, '=', true)->get()->all();

        return $templates;
    }
}