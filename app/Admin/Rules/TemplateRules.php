<?php
declare(strict_types=1);

namespace App\Admin\Rules;

use App\Admin\Contracts\Entities\TemplateContract;
use Ramsey\Uuid\Uuid;

class TemplateRules
{
    static public function isSystem(TemplateContract $template): bool
    {
        return Uuid::NIL === $template->getId();
    }
}