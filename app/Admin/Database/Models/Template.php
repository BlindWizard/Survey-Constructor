<?php

namespace App\Admin\Database\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Template table.
 */
class Template extends Model
{
    public const ATTR_ID = 'id';
    public const ATTR_TITLE = 'title';
    public const ATTR_PUBLIC = 'public';
    public const ATTR_CREATED_AT = 'created_at';
    public const ATTR_UPDATED_AT = 'updated_at';
}