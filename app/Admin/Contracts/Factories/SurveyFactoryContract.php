<?php


namespace App\Admin\Contracts\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;

interface SurveyFactoryContract
{
    /**
     * @param TemplateContract $template
     * @param BlockContract[]  $blocks
     *
     * @return SurveyContract
     */
    public function build(TemplateContract $template, array $blocks): SurveyContract;
}