<?php

namespace App\Admin\Contracts\Services;

use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\DTO\SurveyObject;

interface SurveyServiceContract
{
    public function createFromTemplate(TemplateContract $template): SurveyObject;
}