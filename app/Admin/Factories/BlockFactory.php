<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Database\Models\Block;
use App\Admin\DTO\Header;
use App\Admin\DTO\Option;
use App\Admin\DTO\OptionsList;
use App\Admin\Exceptions\BlockTypeException;
use Ramsey\Uuid\Uuid;

class BlockFactory implements BlockFactoryContract
{
    /**
     * @inheritDoc
     */
    public function getEmptyBlock(string $type, string $blockId = null): BlockContract
    {
        switch ($type) {
            case BlockContract::TYPE_OPTIONS_LIST:
                return $this->getOptionList($blockId);
            case BlockContract::TYPE_OPTION:
                return $this->getOption($blockId);
            case BlockContract::TYPE_HEADER:
                return $this->getHeader($blockId);
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
            case BlockContract::TYPE_OPTIONS_LIST:
                $dto = new OptionsList();
                $dto->id = $model->getId();
                $dto->surveyId = $model->getSurveyId();
                $dto->position = $model->getPosition();

                foreach ($model->getData()['options'] as $optionData) {
                    $option = new Option();
                    $option->id = $optionData['id'];
                    $option->text = $optionData['text'];
                    $option->surveyId = $dto->surveyId;
                    $option->position = $optionData['position'];

                    $dto->options[] = $option;
                }

                $result[] = $dto;
                break;
            case BlockContract::TYPE_OPTION:
                $dto = new Option();
                $dto->id = $model->getId();
                $dto->surveyId = $model->getSurveyId();
                $dto->text = $model->getData()['text'];
                $dto->position = $model->getPosition();

                $result[] = $dto;
                break;
            case BlockContract::TYPE_HEADER:
                $dto = new Header();
                $dto->id = $model->getId();
                $dto->surveyId = $model->getSurveyId();
                $dto->text = $model->getData()['text'];
                $dto->position = $model->getPosition();

                $result[] = $dto;
                break;
            default:
                throw new BlockTypeException('Can\'t transform block from model ' . var_export($model, true));
        }

        return $dto;
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
}