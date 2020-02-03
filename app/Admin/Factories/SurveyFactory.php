<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\SurveyFactoryContract;
use App\Admin\DTO\PageObject;
use App\Admin\DTO\SurveyObject;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class SurveyFactory implements SurveyFactoryContract
{
    /**
     * @param string           $ownerId
     * @param TemplateContract $template
     *
     * @return SurveyContract
     * @throws \Exception
     */
    public function build(string $ownerId, TemplateContract $template): SurveyContract
    {
        $survey = new SurveyObject();
        $survey->id = Uuid::uuid4()->toString();
        $survey->title = __('New survey');
        $survey->ownerId = $ownerId;
        $survey->createdAt = (string) Carbon::now('UTC');
        $survey->updatedAt = (string) Carbon::now('UTC');

        foreach ($template->getPages() as $page) {
            $pageObject = new PageObject();
            $pageObject->id = $page->getId();
            $pageObject->surveyId = $survey->id;
            $pageObject->step = $page->getStep();
            $pageObject->createdAt = (string) Carbon::now('UTC');
            $pageObject->updatedAt = (string) Carbon::now('UTC');

            $survey->pages[] = $pageObject;
        }

        return $survey;
    }
}