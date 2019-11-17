<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\TemplateContract;

class TemplateObject implements TemplateContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $title;
    /** @var bool */
    public $public;
    /** @var string */
    public $ownerId;
    /** @var string */
    public $createdAt;
    /** @var string */
    public $updatedAt;

    /**
     * @inheritdoc
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @inheritdoc
     */
    public function getTitle(): string
    {
        return $this->title;
    }
}