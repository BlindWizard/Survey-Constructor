<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\ActionDataContract;

class BlockActionData implements ActionDataContract
{
    public string $handle;
    public string $targetId;
}