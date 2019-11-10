<?php

namespace App\Admin\Contracts\Services;

use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;

interface SurveyServiceContract
{
    /**
     * @param TemplateContract $template
     *
     * @return SurveyContract
     */
    public function createFromTemplate(TemplateContract $template): SurveyContract;
}