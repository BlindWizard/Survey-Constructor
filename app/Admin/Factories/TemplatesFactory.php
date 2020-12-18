<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\ActionContract;
use App\Admin\Contracts\Entities\ActionDataContract;
use App\Admin\Contracts\Entities\TemplateContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Factories\TemplatesFactoryContract;
use App\Admin\Database\Models\Block;
use App\Admin\DTO\BlockAction;
use App\Admin\DTO\Button;
use App\Admin\DTO\Image;
use App\Admin\DTO\Option;
use App\Admin\DTO\OptionsList;
use App\Admin\DTO\Page;
use App\Admin\DTO\Template;
use App\Admin\DTO\Text;
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

        $finishPage = new Page();
        $finishPage->id = Uuid::uuid4()->toString();
        $finishPage->step = 1;
        $finishPage->surveyId = $blank->id;
        $finishPage->blocks = [];

        $block = $this->blockFactory->getButton(Uuid::uuid4()->toString());/** @var Button $block */
        $block->text = __('Ok');
        $block->position = 1;
        $block->style->textAlign = 'center';
        $block->style->margin->left = 'auto';
        $block->style->margin->right = 'auto';
        $block->pageId = $mainPage->getId();
        $block->parentId = $mainPage->getId();

        $nextPage = new BlockAction();
        $nextPage->id = Uuid::uuid4()->toString();
        $nextPage->type = ActionContract::TYPE_CLICK;
        $nextPage->handle = ActionDataContract::HANDLE_GO_TO_PAGE;
        $nextPage->data = ['pageId' => $finishPage->getId()];
        $block->actions[] = $nextPage;
        $mainPage->blocks[] = $block;

        $block = $this->blockFactory->getText(Uuid::uuid4()->toString());/** @var Text $block */
        $block->text = __('Thanks for your time!');
        $block->position = 0;
        $block->style->textAlign = 'center';
        $block->pageId = $finishPage->getId();
        $block->parentId = $finishPage->getId();
        $finishPage->blocks[] = $block;
        
        $blank->pages[] = $mainPage;
        $blank->pages[] = $finishPage;

        return $blank;
    }
}