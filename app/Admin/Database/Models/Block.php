<?php

namespace App\Admin\Database\Models;

use App\Admin\Contracts\Entities\BlockContract;
use Illuminate\Database\Eloquent\Model;

/**
 * Active record model for Blocks table.
 *
 * @property string $id
 * @property string $survey_id
 * @property string $type
 * @property int    $position
 * @property string $created_at
 * @property string $updated_at
 */
class Block extends Model implements BlockContract
{
    public const ATTR_ID = 'id';
    public const ATTR_SURVEY_ID = 'survey_id';
    public const ATTR_TYPE = 'type';
    public const ATTR_POSITION = 'position';
    public const ATTR_CREATED_AT = 'created_at';
    public const ATTR_UPDATED_AT = 'updated_at';

    public $incrementing = false;

    /**
     * @inheritdoc
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getSurveyId(): string
    {
        return $this->survey_id;
    }

    /**
     * @inheritdoc
     */
    public function setSurveyId(string $surveyId): void
    {
        $this->survey_id = $surveyId;
    }

    /**
     * @inheritdoc
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @inheritdoc
     */
    public function getPosition(): int
    {
        return $this->position;
    }

    /**
     * @inheritdoc
     */
    public function setPosition(int $position): void
    {
        $this->position = $position;
    }
}