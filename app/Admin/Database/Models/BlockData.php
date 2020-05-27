<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $data
 */
class BlockData extends Model
{
    protected $table = 'blocks_data';
    public const ATTR_ID = 'id';
    public const ATTR_DATA = 'data';

    public $incrementing = false;
    public $timestamps = false;

    public function getData(): array {
        return \GuzzleHttp\json_decode($this->data, true);
    }
}