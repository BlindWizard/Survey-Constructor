<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\BlockContract;
use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Blocks table.
 *
 * @property        string         $id
 * @property        string         $page_id
 * @property        string         $type
 * @property        int            $position
 * @property        string         $created_at
 * @property        string         $updated_at
 *
 * @property-read   BlockData|null $data
 * @property-read   Page|null      $page
 */
class Block extends Model implements BlockContract
{
    public const ATTR_ID      = 'id';
    public const ATTR_PAGE_ID = 'page_id';
    public const ATTR_TYPE    = 'type';
    public const ATTR_POSITION = 'position';
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
     * @return string
     */
    public function getPageId(): string
    {
        return $this->page_id;
    }

    /**
     * @inheritDoc
     */
    public function setPageId(string $pageId): void
    {
        $this->page_id = $pageId;
    }

    /**
     * @inheritDoc
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @inheritDoc
     */
    public function setType(string $type)
    {
        $this->type = $type;
    }

    /**
     * @inheritDoc
     */
    public function getPosition(): int
    {
        return $this->position;
    }

    /**
     * @inheritDoc
     */
    public function setPosition(int $position): void
    {
        $this->position = $position;
    }

    /**
     * @inheritDoc
     */
    public function getData(): array
    {
        if (null === $this->data) {
            return [];
        }

        return \GuzzleHttp\json_decode($this->data->data, true);
    }

    public function data()
    {
        return $this->hasOne(BlockData::class, BlockData::ATTR_ID, static::ATTR_ID);
    }
    public const REL_DATA = 'data';

    public function page()
    {
        return $this->hasOne(Page::class, Page::ATTR_ID, static::ATTR_PAGE_ID);
    }
    public const REL_PAGE = 'page';
}