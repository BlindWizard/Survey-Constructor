<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\TemplateContract;
use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Template table.
 *
 * @property string      $id
 * @property string      $title
 * @property string|null $owner_id
 * @property bool        $public
 * @property string      $created_at
 * @property string      $updated_at
 */
class Template extends Model implements TemplateContract
{
    public const ATTR_ID = 'id';
    public const ATTR_TITLE = 'title';
    public const ATTR_OWNER_ID = 'owner_id';
    public const ATTR_PUBLIC = 'public';
    public const ATTR_CREATED_AT = 'created_at';
    public const ATTR_UPDATED_AT = 'updated_at';

    public $incrementing = false;

    public function getId(): string
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getPublic(): bool
    {
        return $this->public;
    }

    /**
     * @return string
     */
    public function getOwnerId(): string
    {
        return $this->owner_id;
    }

    /**
     * @return string
     */
    public function getCreatedAt(): string
    {
        return $this->created_at;
    }

    /**
     * @return string
     */
    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    /**
     * @inheritDoc
     */
    public function getPages(): array
    {
        return [];//@TODO-31.01.2020-Чучманский Aндрей Implement
    }
}