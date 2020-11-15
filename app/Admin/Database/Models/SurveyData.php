<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\DataContract;
use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Survey data table.
 *
 * @property string $id
 * @property string $data
 */
class SurveyData extends Model implements DataContract
{
    protected $table = 'surveys_data';
    public const ATTR_ID = 'id';
    public const ATTR_DATA = 'data';

    public $incrementing = false;
    public $timestamps = false;

    public function getId(): string
    {
        return $this->id;
    }

    public function getData(): array {
        return \GuzzleHttp\json_decode($this->data, true);
    }
}