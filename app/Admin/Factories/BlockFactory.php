<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Repositories\BlockRepositoryContract;
use App\Admin\Contracts\Repositories\PageRepositoryContract;
use App\Admin\DTO\BlockWrapper;
use App\Admin\DTO\Container;
use App\Admin\DTO\Header;
use App\Admin\DTO\Image;
use App\Admin\DTO\Option;
use App\Admin\DTO\OptionsList;
use App\Admin\DTO\Text;
use App\Admin\DTO\TextField;
use App\Admin\Exceptions\BlockTypeException;
use Ramsey\Uuid\Uuid;

class BlockFactory implements BlockFactoryContract
{
    /** @var BlockRepositoryContract */
    protected $blockRepository;

    public function __construct(BlockRepositoryContract $blockRepository)
    {
        $this->blockRepository = $blockRepository;
    }

    /**
     * @inheritDoc
     */
    public function getEmptyBlock(string $type, string $blockId = null): BlockContract
    {
        switch ($type) {
            case BlockContract::TYPE_CONTAINER:
                return $this->getContainer($blockId);
            case BlockContract::TYPE_OPTIONS_LIST:
                return $this->getOptionList($blockId);
            case BlockContract::TYPE_OPTION:
                return $this->getOption($blockId);
            case BlockContract::TYPE_HEADER:
                return $this->getHeader($blockId);
            case BlockContract::TYPE_TEXT:
                return $this->getText($blockId);
            case BlockContract::TYPE_TEXT_FIELD:
                return $this->getTextField($blockId);
            case BlockContract::TYPE_IMAGE:
                return $this->getImage($blockId);
            default:
                throw new BlockTypeException('Can\'t create empty block for type ' . $type);
        }
    }

    /**
     * @inheritDoc
     */
    public function getDTO(BlockContract $model): BlockContract
    {
        switch ($model->getType()) {
            case BlockContract::TYPE_CONTAINER:
                $dto = new Container();
                $dto->id = $model->getId();
                $dto->parentId = $model->getParentId();
                $dto->position = $model->getPosition();
                $dto->slots = $model->getData()['slots'] ?? [];
                foreach ($model->getData()['slots'] as $slotId) {
                    foreach ($this->blockRepository->getBlocksByParentId($slotId) as $innerModel) {
                        $dto->children[] = new BlockWrapper($this->getDTO($innerModel));
                    }
                }

                break;
            case BlockContract::TYPE_OPTIONS_LIST:
                $dto = new OptionsList();
                $dto->id = $model->getId();
                $dto->text = $model->getData()['text'] ?? null;
                $dto->parentId = $model->getParentId();
                $dto->position = $model->getPosition();

                foreach ($model->getData()['options'] as $optionData) {
                    $option = new Option();
                    $option->id = $optionData['id'];
                    $option->text = $optionData['text'];
                    $option->parentId = $dto->parentId;
                    $option->position = $optionData['position'];

                    $dto->options[] = $option;
                }

                break;
            case BlockContract::TYPE_OPTION:
                $dto = new Option();
                $dto->id = $model->getId();
                $dto->parentId = $model->getParentId();
                $dto->text = $model->getData()['text'];
                $dto->position = $model->getPosition();

                $result[] = $dto;

                break;
            case BlockContract::TYPE_HEADER:
                $dto = new Header();
                $dto->id = $model->getId();
                $dto->parentId = $model->getParentId();
                $dto->text = $model->getData()['text'];
                $dto->position = $model->getPosition();

                break;
            case BlockContract::TYPE_TEXT:
                $dto = new Text();
                $dto->id = $model->getId();
                $dto->parentId = $model->getParentId();
                $dto->text = $model->getData()['text'];
                $dto->position = $model->getPosition();

                break;
            case BlockContract::TYPE_TEXT_FIELD:
                $dto = new TextField();
                $dto->id = $model->getId();
                $dto->parentId = $model->getParentId();
                $dto->label = $model->getData()['label'];
                $dto->placeholder = $model->getData()['placeholder'];
                $dto->position = $model->getPosition();
                $dto->multiline = $model->getData()['multiline'];

                break;
            case BlockContract::TYPE_IMAGE:
                $dto = new Image();
                $dto->id = $model->getId();
                $dto->parentId = $model->getParentId();
                $dto->position = $model->getPosition();
                $dto->imageId = $model->getData()['imageId'];
                $dto->imageUrl = '';

                break;
            default:
                throw new BlockTypeException('Can\'t transform block from model ' . var_export($model, true));
        }

        return $dto;
    }

    /**
     * @param string|null $blockId
     *
     * @return Container
     *
     * @throws \Throwable
     */
    public function getContainer(string $blockId = null): Container
    {
        $block = new Container();
        $block->id = $blockId ?? Uuid::uuid4()->toString();
        $block->position = 0;
        $block->slots= [Uuid::uuid4()->toString(), Uuid::uuid4()->toString(), Uuid::uuid4()->toString()];

        return $block;
    }

    /**
     * @param string|null $blockId
     *
     * @return OptionsList
     *
     * @throws \Throwable
     */
    public function getOptionList(string $blockId = null): OptionsList
    {
        $block = new OptionsList();
        $block->id = $blockId ?? Uuid::uuid4()->toString();
        $block->position = 0;

        $option = new Option();
        $option->id = Uuid::uuid4()->toString();
        $option->text = __('First option');
        $option->position = 0;
        $block->options[] = $option;

        $option = new Option();
        $option->id = Uuid::uuid4()->toString();
        $option->text = __('Second option');
        $option->position = 1;
        $block->options[] = $option;

        $option = new Option();
        $option->id = Uuid::uuid4()->toString();
        $option->text = __('Third option');
        $option->position = 2;
        $block->options[] = $option;

        return $block;
    }

    /**
     * @param string|null $blockId
     *
     * @return Option
     *
     * @throws \Throwable
     */
    public function getOption(string $blockId = null): Option
    {
        $block = new Option();
        $block->id = $blockId ?? Uuid::uuid4()->toString();
        $block->text = __('Single option');
        $block->position = 0;

        return $block;
    }

    /**
     * @param string|null $blockId
     *
     * @return Header
     *
     * @throws \Throwable
     */
    public function getHeader(string $blockId = null): Header
    {
        $block = new Header();
        $block->id = $blockId ?? Uuid::uuid4()->toString();
        $block->position = 0;
        $block->text = config('app.name');

        return $block;
    }

    /**
     * @param string|null $blockId
     *
     * @return Text
     *
     * @throws \Throwable
     */
    public function getText(string $blockId = null): Text
    {
        $block = new Text();
        $block->id = $blockId ?? Uuid::uuid4()->toString();
        $block->position = 0;
        $block->text = __('Default text');

        return $block;
    }

    /**
     * @param string|null $blockId
     *
     * @return TextField
     *
     * @throws \Exception
     */
    public function getTextField(string $blockId = null): TextField
    {
        $block = new TextField();
        $block->id = $blockId ?? Uuid::uuid4()->toString();
        $block->position = 0;
        $block->label = __('Label');
        $block->placeholder = __('Placeholder text');
        $block->multiline = false;

        return $block;
    }

    /**
     * @param string|null $blockId
     *
     * @return TextField
     *
     * @throws \Exception
     */
    public function getImage(string $blockId = null): Image
    {
        $block = new Image();
        $block->id = $blockId ?? Uuid::uuid4()->toString();
        $block->position = 0;

        return $block;
    }
}