<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;
use App\Admin\Contracts\Entities\PageContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Active record model for Pages table.
 *
 * @property string $id
 * @property string $survey_id
 * @property int    $step
 * @property string $created_at
 * @property string $updated_at
 *
 * @property-read Block[] $blocks
 */
class Page extends Model implements PageContract
{
    public const ATTR_ID = 'id';
    public const ATTR_SURVEY_ID = 'survey_id';
    public const ATTR_STEP = 'step';
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
    public function getSurveyId(): string
    {
        return $this->survey_id;
    }

    /**
     * @inheritDoc
     */
    public function getStep(): int
    {
        return $this->step;
    }

    /**
     * @inheritDoc
     */
    public function getBlocks(): array
    {
        $blocks = $this->blocks; /** @var Collection $blocks */

        return $blocks->all();
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

    public function blocks()
    {
        return $this->hasMany(Block::class, Block::ATTR_PAGE_ID, static::ATTR_ID);
    }
    public const REL_BLOCKS = 'blocks';
}