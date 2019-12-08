<?php
declare(strict_types=1);

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
     * @param string           $ownerId
     * @param TemplateContract $template
     * @param BlockContract[]  $blocks
     *
     * @return SurveyContract
     * @throws \Exception
     */
    public function build(string $ownerId, TemplateContract $template, array $blocks): SurveyContract
    {
        $survey = new SurveyObject();
        $survey->id = Uuid::uuid4()->toString();
        $survey->title = __('New survey');
        $survey->ownerId = $ownerId;
        $survey->blocks = $blocks;
        $survey->createdAt = (string) Carbon::now('UTC');
        $survey->updatedAt = (string) Carbon::now('UTC');

        return $survey;
    }
}