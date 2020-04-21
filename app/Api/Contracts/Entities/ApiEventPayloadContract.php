<?php

namespace App\Api\Contracts\Entities;

interface ApiEventPayloadContract
{
    public function getData(): array;
}