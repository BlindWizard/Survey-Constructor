<?php
declare(strict_types=1);

namespace App\Admin\Rules;

use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use Ramsey\Uuid\Uuid;

class TemplateRules
{
    static public function isSystem(string $id): bool
    {
        return in_array($id, [
            TemplatesFactoryContract::BLANK_UUID,
            TemplatesFactoryContract::POLL_UUID,
        ]);
    }
}