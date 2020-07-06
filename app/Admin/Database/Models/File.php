<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    public const ATTR_ID = 'id';
    public const ATTR_NAME = 'name';
    public const ATTR_TYPE = 'type';
    public const ATTR_SIZE = 'size';
    public const ATTR_HASH = 'hash';
    public const ATTR_CREATED_AT = 'created_at';
    public const ATTR_UPDATED_AT = 'updated_at';

    public $incrementing = false;
}