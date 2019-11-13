<?php


namespace App\Admin\Contracts\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;

interface SurveyFactoryContract
{
    /**
     * @param string           $ownerId
     * @param TemplateContract $template
     * @param BlockContract[]  $blocks
     *
     * @return SurveyContract
     */
    public function build(string $ownerId, TemplateContract $template, array $blocks): SurveyContract;
}