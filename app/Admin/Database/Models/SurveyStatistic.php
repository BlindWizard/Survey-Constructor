<?php
declare(strict_types=1);

namespace App\Admin\Database\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $survey_id
 * @property string $token_id
 * @property int    $runs_count
 * @property int    $completes_count
 * @property int    $rejects_count
 * @property string $updated_at
 */
class SurveyStatistic extends Model
{
    public const ATTR_ID              = 'id';
    public const ATTR_SURVEY_ID       = 'survey_id';
    public const ATTR_TOKEN_ID        = 'token_id';
    public const ATTR_RUNS_COUNT      = 'runs_count';
    public const ATTR_COMPLETES_COUNT = 'completes_count';
    public const ATTR_REJECTS_COUNT   = 'rejects_count';
    public const ATTR_UPDATED_AT      = 'updated_at';
}