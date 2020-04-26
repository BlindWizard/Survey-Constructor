<?php
declare(strict_types=1);

namespace App\Api\Database\Models;

use App\Admin\Database\Models\Block;
use App\Admin\Database\Models\Survey;
use App\Api\Contracts\Entities\ApiEventPayloadContract;
use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Events table.
 *
 * @property string $id
 * @property string $client_id
 * @property string $survey_id
 * @property string $type
 * @property string $data
 * @property string $created_at
 * @property string $updated_at
 */
class Event extends Model implements ApiEventPayloadContract
{
    public const ATTR_ID         = 'id';
    public const ATTR_CLIENT_ID  = 'client_id';
    public const ATTR_SURVEY_ID  = 'survey_id';
    public const ATTR_TYPE       = 'type';
    public const ATTR_DATA       = 'data';
    public const ATTR_CREATED_AT = 'created_at';
    public const ATTR_UPDATED_AT = 'updated_at';

    public $incrementing = false;

    public function getData(): array
    {
        return \GuzzleHttp\json_decode($this->data);
    }
}