<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Services;

use App\Admin\Contracts\Entities\DataContract;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;

interface SurveyServiceContract
{
    /**
     * @param string           $ownerId
     * @param TemplateContract $template
     *
     * @return SurveyContract
     */
    public function createFromTemplate(string $ownerId, TemplateContract $template): SurveyContract;

    /**
     * @param SurveyContract $survey
     * @param string         $userId
     *
     * @return bool
     */
    public function canOperate(SurveyContract $survey, string $userId): bool;

    /**
     * @param string $surveyId
     * @param string $userId
     *
     * @return bool
     */
    public function canOperateById(string $surveyId, string $userId): bool;

    /**
     * @param string $ownerId
     *
     * @return array
     */
    public function getAvailableSurveys(string $ownerId): array;

    /**
     * @param string       $surveyId
     * @param DataContract $data
     *
     * @return DataContract
     */
    public function addData(string $surveyId, DataContract $data): DataContract;
}