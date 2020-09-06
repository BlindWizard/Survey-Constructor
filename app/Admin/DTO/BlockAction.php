<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\ActionContract;
use App\Admin\Contracts\Entities\ActionDataContract;

class BlockAction implements ActionContract
{
    public string $id;
    public string $type;
    public ?ActionDataContract $data = null;

    /**
     * @inheritDoc
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @inheritDoc
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @inheritDoc
     */
    public function getData(): ?ActionDataContract
    {
        return $this->data;
    }
}