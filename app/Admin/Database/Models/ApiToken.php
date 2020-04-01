<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use Illuminate\Database\Eloquent\Model;

class ApiToken extends Model
{
    public const ATTR_ID = 'id';
    public const ATTR_NAME = 'name';
    public const ATTR_VALUE = 'value';
    public const ATTR_CREATED_AT = 'created_at';
    public const ATTR_UPDATED_AT = 'updated_at';
}