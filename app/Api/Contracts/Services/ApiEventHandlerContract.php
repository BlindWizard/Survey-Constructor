<?php
declare(strict_types=1);

namespace App\Api\Contracts\Services;

use App\Api\Contracts\Entities\ApiEventContract;

interface ApiEventHandlerContract
{
    public function handle(ApiEventContract $event): void;
}