<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\ActionContract;

class BlockAction implements ActionContract
{
    public string $id;
    public string $type;
    public ?string $handle = null;
    public ?array $data = null;

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
    public function getHandle(): string
    {
        return $this->handle;
    }

    /**
     * @inheritDoc
     */
    public function getData(): ?array
    {
        return $this->data;
    }

    /**
     * @param string|null $handle
     */
    public function setHandle(?string $handle = null): void
    {
        $this->handle = $handle;
    }

    /**
     * @param array|null $data
     */
    public function setData(array $data = null): void
    {
        $this->data = $data;
    }
}