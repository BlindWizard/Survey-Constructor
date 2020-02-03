<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Active record model for Survey table.
 *
 * @property string $id
 * @property string $title
 * @property string $public
 * @property string $owner_id
 * @property string $created_at
 * @property string $updated_at
 *
 * @property-read Page[] $pages
 */
class Survey extends Model implements SurveyContract
{
    public const ATTR_ID = 'id';
    public const ATTR_TITLE = 'title';
    public const ATTR_CREATED_AT = 'created_at';
    public const ATTR_UPDATED_AT = 'updated_at';
    public const ATTR_OWNER_ID = 'owner_id';

    public $incrementing = false;

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
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
    public function getPages(): array
    {
        $pages = $this->pages; /** @var Collection $pages */

        return $pages->all();
    }

    /**
     * @return string
     */
    public function getCreatedAt(): string
    {
        return Carbon::createFromFormat(Carbon::DEFAULT_TO_STRING_FORMAT, $this->created_at)->format(Carbon::DEFAULT_TO_STRING_FORMAT);
    }

    /**
     * @return string
     */
    public function getUpdatedAt(): string
    {
        return Carbon::createFromFormat(Carbon::DEFAULT_TO_STRING_FORMAT, $this->updated_at)->format(Carbon::DEFAULT_TO_STRING_FORMAT);
    }

    public function pages()
    {
        return $this->hasMany(Page::class, Page::ATTR_SURVEY_ID, static::ATTR_ID);
    }
    public const REL_PAGES = 'pages';
}