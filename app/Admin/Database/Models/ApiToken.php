<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\ApiTokenContract;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $user_id
 * @property string $name
 * @property string $value
 * @property string $created_at
 * @property string $updated_at
 */
class ApiToken extends Model implements ApiTokenContract
{
    public const ATTR_ID = 'id';
    public const ATTR_USER_ID = 'user_id';
    public const ATTR_NAME = 'name';
    public const ATTR_VALUE = 'value';
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
    public function getUserId(): string
    {
        return $this->user_id;
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
    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @inheritDoc
     */
    public function getCreatedAt(): string
    {
        return $this->created_at->format(Carbon::DEFAULT_TO_STRING_FORMAT);
    }

    /**
     * @inheritDoc
     */
    public function getUpdatedAt(): string
    {
        return $this->updated_at->format(Carbon::DEFAULT_TO_STRING_FORMAT);
    }
}