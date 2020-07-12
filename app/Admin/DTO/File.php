<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\FileContract;

class File implements FileContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $name;
    /** @var string */
    public $url;

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
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @inheritDoc
     */
    public function getUrl(): string
    {
        return $this->url;
    }
}