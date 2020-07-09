<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\SurveyContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Database\Models\Block;
use App\Admin\Database\Models\BlockData;
use App\Admin\Database\Models\Page;
use App\Admin\Database\Models\Survey;
use Illuminate\Support\Facades\DB;

class SurveyRepository implements SurveyRepositoryContract
{
    /**
     * @inheritDoc
     */
    public function findById(string $id): ?SurveyContract
    {
        $survey = Survey::query()->where(Survey::ATTR_ID, '=', $id)->first();/** @var Survey $survey */

        return $survey;
    }

    /**
     * @inheritDoc
     *
     * @throws \Throwable
     */
    public function save(SurveyContract $survey): void
    {
        //@TODO-03.02.2020-Чучманский Aндрей Refactor
        DB::beginTransaction();
        try {
            $model = new Survey();
            $model->id = $survey->getId();
            $model->title = $survey->getTitle();
            $model->owner_id = $survey->getOwnerId();
            $model->created_at = $survey->getCreatedAt();
            $model->updated_at = $survey->getUpdatedAt();

            $model->saveOrFail();

            foreach ($survey->getPages() as $page) {
                $pageModel = new Page();
                $pageModel->id = $page->getId();
                $pageModel->survey_id = $page->getSurveyId();
                $pageModel->step = $page->getStep();
                $pageModel->created_at = $page->getCreatedAt();
                $pageModel->updated_at = $page->getUpdatedAt();

                $pageModel->saveOrFail();

                foreach ($page->getBlocks() as $block) {
                    $blockModel = new Block();
                    $blockModel->id = $block->getId();
                    $blockModel->parent_id = $block->getParentId();
                    $blockModel->type = $block->getType();
                    $blockModel->position = $block->getPosition();
                    $blockModel->created_at = $block->getCreatedAt();
                    $blockModel->updated_at = $block->getUpdatedAt();

                    $blockData = new BlockData();
                    $blockData->id = $model->id;
                    $blockData->data = \GuzzleHttp\json_encode($block->getData());
                    $blockData->saveOrFail();

                    $blockModel->saveOrFail();
                }
            }

            DB::commit();
        }
        catch (\Throwable $e) {
            DB::rollBack();

            throw $e;
        }
    }

    /**
     * @inheritDoc
     */
    public function delete(string $id): void
    {
        DB::beginTransaction();
        try {
            $pages = Page::query()->where(Page::ATTR_SURVEY_ID, '=', $id)->get()->all();
            $pageIds = array_column($pages, Page::ATTR_ID);

            $blocks = Page::query()->whereIn(Block::ATTR_PARENT_ID, $pageIds)->get()->all();
            $blockIds = array_column($blocks, Block::ATTR_ID);

            Survey::query()->where(Survey::ATTR_ID, '=', $id)->delete();
            Page::query()->whereIn(Page::ATTR_ID, $pageIds)->delete();
            Block::query()->whereIn(Block::ATTR_ID, $blockIds)->delete();
            BlockData::query()->whereIn(BlockData::ATTR_ID, $blockIds)->delete();

            DB::commit();
        }
        catch (\Throwable $e) {
            DB::rollBack();

            throw $e;
        }
    }

    /**
     * @inheritDoc
     */
    public function getAvailableSurveys(string $ownerId): array
    {
        $surveys = Survey::query()->where(Survey::ATTR_OWNER_ID, '=', $ownerId)->get()->all();/** @var Survey[] $surveys */

        return $surveys;
    }
}