<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\FileContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * @property string $id
 * @property string $name
 * @property string $original_name
 * @property string $type
 * @property int    $size
 * @property string $hash
 * @property string $owner_id
 * @property string $created_at
 * @property string $updated_at
 */
class File extends Model implements FileContract
{
    public const ATTR_ID = 'id';
    public const ATTR_NAME = 'name';
    public const ATTR_ORIGINAL_NAME = 'original_name';
    public const ATTR_TYPE = 'type';
    public const ATTR_SIZE = 'size';
    public const ATTR_HASH = 'hash';
    public const ATTR_OWNER_ID = 'owner_id';
    public const ATTR_CREATED_AT = 'created_at';
    public const ATTR_UPDATED_AT = 'updated_at';

    public $incrementing = false;

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
        return asset('storage/' . $this->name);
    }
}