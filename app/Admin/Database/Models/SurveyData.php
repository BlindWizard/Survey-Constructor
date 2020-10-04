<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Survey table.
 *
 * @property string $id
 * @property string $data
 *
 * @property-read Page[] $pages
 */
class SurveyData extends Model
{
    protected $table = 'surveys_data';
    public const ATTR_ID = 'id';
    public const ATTR_DATA = 'data';

    public $incrementing = false;
    public $timestamps = false;

    public function getData(): array {
        return \GuzzleHttp\json_decode($this->data, true);
    }
}