<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Database\Models\Block;
use App\Admin\DTO\Image;
use App\Admin\DTO\Option;
use App\Admin\DTO\OptionsList;
use App\Admin\DTO\Page;
use App\Admin\DTO\Template;
use App\Admin\Exceptions\TemplateNotFoundException;
use Ramsey\Uuid\Uuid;

class TemplatesFactory implements TemplatesFactoryContract
{
    protected BlockFactoryContract $blockFactory;

    public function __construct(BlockFactoryContract $blockFactory)
    {
        $this->blockFactory = $blockFactory;
    }

    /**
     * @inheritDoc
     */
    public function getSystemTemplate(string $id): TemplateContract
    {
        switch ($id) {
            case static::BLANK_UUID:
                return $this->getBlank();
            case static::POLL_UUID:
                return $this->getPoll();
            default:
                throw new TemplateNotFoundException();
        }
    }

    /**
     * @inheritDoc
     */
    public function getBlank(): TemplateContract
    {
        $blank = new Template();
        $blank->id = static::BLANK_UUID;
        $blank->title = __('blank');
        $blank->public = true;

        $mainPage = new Page();
        $mainPage->id = Uuid::uuid4()->toString();
        $mainPage->step = 0;
        $mainPage->surveyId = $blank->id;
        $mainPage->blocks = [];

        $blank->pages[] = $mainPage;

        return $blank;
    }

    /**
     * @inheritDoc
     */
    public function getPoll(): TemplateContract
    {
        $blank = new Template();
        $blank->id = static::POLL_UUID;
        $blank->title = __('poll');
        $blank->public = true;

        $mainPage = new Page();
        $mainPage->id = Uuid::uuid4()->toString();
        $mainPage->step = 0;
        $mainPage->surveyId = $blank->id;
        $mainPage->blocks = [];

        $block = $this->blockFactory->getOptionList(Uuid::uuid4()->toString());/** @var OptionsList $block */
        $block->text = __('I think...');
        $block->position = 0;
        $block->pageId = $mainPage->getId();
        $block->parentId = $mainPage->getId();
        $block->multiple = false;
        $block->options[0]->text = __('Tickser is the best!');
        $block->options[1]->text = __('Tickser should become better...');
        $block->options[2]->text = __('Tickser disappoints me :(');

        $mainPage->blocks[] = $block;
        $blank->pages[] = $mainPage;

        return $blank;
    }
}