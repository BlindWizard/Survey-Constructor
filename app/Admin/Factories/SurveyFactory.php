<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\SurveyFactoryContract;
use App\Admin\DTO\Page;
use App\Admin\DTO\Survey;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class SurveyFactory implements SurveyFactoryContract
{
    /**
     * @param string           $ownerId
     * @param TemplateContract $template
     *
     * @return SurveyContract
     *
     * @throws \Exception
     */
    public function build(string $ownerId, TemplateContract $template): SurveyContract
    {
        $survey = new Survey();
        $survey->id = Uuid::uuid4()->toString();
        $survey->title = $template->getTitle();
        $survey->ownerId = $ownerId;
        $survey->createdAt = (string) Carbon::now('UTC');
        $survey->updatedAt = (string) Carbon::now('UTC');

        foreach ($template->getPages() as $page) {
            $pageObject = new Page();
            $pageObject->id = $page->getId();
            $pageObject->surveyId = $survey->id;
            $pageObject->step = $page->getStep();
            $pageObject->createdAt = (string) Carbon::now('UTC');
            $pageObject->updatedAt = (string) Carbon::now('UTC');
            $survey->pages[] = $pageObject;

            foreach ($page->getBlocks() as $block) {
                $pageObject->blocks[] = $block;
            }
        }

        return $survey;
    }
}