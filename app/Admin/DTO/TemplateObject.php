<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\TemplateContract;

class TemplateObject implements TemplateContract
{
    public $id;
    public $title;
    public $public;
    public $createdAt;
    public $updatedAt;

    public function getId(): string
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }
}