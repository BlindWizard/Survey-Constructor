<?php

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;
use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Survey table.
 *
 * @property int    $id
 * @property string $title
 * @property string $public
 * @property string $owner_id
 * @property string $created_at
 * @property string $updated_at
 */
class Survey extends Model implements SurveyContract
{
    public const ATTR_ID = 'id';
    public const ATTR_TITLE = 'title';
    public const ATTR_CREATED_AT = 'created_at';
    public const ATTR_UPDATED_AT = 'updated_at';
    public const ATTR_OWNER_ID = 'owner_id';

    /**
     * @return string
     */
    public function getId(): string
    {
        return  $this->id;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getOwnerId(): string
    {
        return $this->owner_id;
    }

    /**
     * @return BlockContract[]
     */
    public function getBlocks(): array
    {
        //@TODO-14.11.2019-Чучманский Aндрей
        return [];
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
}