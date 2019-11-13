<?php

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\TemplateContract;
use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Template table.
 *
 * @property int         $id
 * @property string      $title
 * @property string|null $owner_id
 * @property string      $public
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

    public function getId(): string
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }
}