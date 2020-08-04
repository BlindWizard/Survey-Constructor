<?php

namespace App\Admin\DTO;


use App\Admin\Contracts\Entities\ActionContract;

class BlockAction implements ActionContract
{
    public string $type;
    public array $data;

    public function getType(): string
    {
        return $this->type;
    }

    public function getData(): array
    {
        return $this->data;
    }
}