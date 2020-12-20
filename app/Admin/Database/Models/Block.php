<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\ActionContract;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\DTO\BlockAction;
use App\Admin\DTO\BlockStyle;
use DemeterChain\B;
use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Blocks table.
 *
 * @property        string         $id
 * @property        string         $parent_id
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
    public const ATTR_ID         = 'id';
    public const ATTR_PARENT_ID  = 'parent_id';
    public const ATTR_PAGE_ID    = 'page_id';
    public const ATTR_TYPE       = 'type';
    public const ATTR_POSITION   = 'position';
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
    public function getParentId(): string
    {
        return $this->parent_id;
    }

    /**
     * @inheritDoc
     */
    public function setParentId(string $parentId): void
    {
        $this->parent_id = $parentId;
    }

    /**
     * @return Block[]
     */
    public function getChildren(): ?array
    {
        if ($this->getType() !== BlockContract::TYPE_CONTAINER) {
            return null;
        }

        $slots = $this->getData()['slots'];

        $blocks = Block::query()->whereIn(Block::ATTR_PARENT_ID, $slots)->get()->all();/** @var Block[] $blocks */

        return $blocks;
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

    public function getPageId(): string
    {
        return $this->page_id;
    }

    public function setPageId(string $pageId): void
    {
        $this->page_id = $pageId;
    }

    /**
     * @inheritDoc
     */
    public function getStyle(): array
    {
        if (null === $this->data) {
            $model = new BlockStyle();
            $model->sizeMeasure = 'px';
            $model->marginMeasure = 'px';
            $model->backgroundColor = '#fefefe';

            $style = ['style' => $model];
            if ($this->getType() === BlockContract::TYPE_CONTAINER) {
                $style['slotsStyle'] = [];
                foreach ($this->getData()['slots'] as $slotId) {
                    $style['slotsStyle'][$slotId] = new BlockStyle();
                    $style['slotsStyle'][$slotId]->sizeMeasure = '%';
                }
            }

            return $style;
        }

        $rawStyle = \GuzzleHttp\json_decode($this->data->style, true);

        $style = ['style' =>  new BlockStyle()];

        foreach($rawStyle['style'] as $key => $value) {
            $style['style']->{$key} = $value;
        }

        if ($this->getType() === BlockContract::TYPE_CONTAINER) {
            $style['slotsStyle'] = [];
            foreach ($this->getData()['slots'] as $slotId) {
                $style['slotsStyle'][$slotId] =  new BlockStyle();
                foreach($rawStyle['slotsStyle'][$slotId] as $key => $value) {
                    $style['slotsStyle'][$slotId]->{$key} = $value;
                }
            }
        }

        return $style;
    }

    /**
     * @inheritDoc
     */
    public function getActions(): array
    {
        if (null === $this->data) {
            return [];
        }

        $actions = [];
        foreach (\GuzzleHttp\json_decode($this->data->actions, true) as $actionData) {
            $action = new BlockAction();

            foreach ($actionData as $key => $value) {
                $action->{$key} = $value;
            }

            $actions[] = $action;
        }

        return $actions;
    }
}