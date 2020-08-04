<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $data
 * @property string $style
 * @property string $actions
 */
class BlockData extends Model
{
    protected $table = 'blocks_data';
    public const ATTR_ID = 'id';
    public const ATTR_DATA = 'data';
    public const ATTR_STYLE = 'style';
    public const ATTR_ACTIONS = 'actions';

    public $incrementing = false;
    public $timestamps = false;

    public function getData(): array {
        return \GuzzleHttp\json_decode($this->data, true);
    }

    public function getStyle(): array {
        return \GuzzleHttp\json_decode($this->style, true);
    }

    public function getActions(): array {
        return \GuzzleHttp\json_decode($this->actions, true);
    }
}