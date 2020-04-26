<?php
declare(strict_types=1);

namespace App\Api\Contracts\Entities;

interface ApiEventPayloadContract
{
    public function getData(): array;
}