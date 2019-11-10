<?php

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\SurveyFactoryContract;
use App\Admin\DTO\SurveyObject;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class SurveyFactory implements SurveyFactoryContract
{
    /**
     * @param TemplateContract $template
     * @param BlockContract[]  $blocks
     *
     * @return SurveyContract
     * @throws \Exception
     */
    public function build(TemplateContract $template, array $blocks): SurveyContract
    {
        $survey = new SurveyObject();
        $survey->id = Uuid::uuid4()->toString();
        $survey->title = __('New survey');
        $survey->blocks = $blocks;
        $survey->createdAt = Carbon::now('UTC');
        $survey->updatedAt = Carbon::now('UTC');

        return $survey;
    }
}