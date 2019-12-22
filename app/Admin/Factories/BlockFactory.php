<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\DTO\Option;
use App\Admin\DTO\OptionsList;
use App\Admin\Exceptions\BlockTypeException;
use Ramsey\Uuid\Uuid;

class BlockFactory implements BlockFactoryContract
{
    /**
     * @inheritDoc
     */
    public function getEmptyBlock(string $type): BlockContract
    {
        switch ($type) {
            case BlockContract::TYPE_OPTIONS_LIST:
                return $this->getOptionList();
            case BlockContract::TYPE_OPTION:
                return $this->getOption();
            default:
                throw new BlockTypeException('Can\'t create empty block for type ' . $type);
        }
    }

    /**
     * @return OptionsList
     *
     * @throws \Throwable
     */
    public function getOptionList(): OptionsList
    {
        $block = new OptionsList();
        $block->id = Uuid::uuid4()->toString();
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
     * @return Option
     *
     * @throws \Throwable
     */
    public function getOption(): Option
    {
        $block = new Option();
        $block->id = Uuid::uuid4()->toString();
        $block->position = 0;

        return $block;
    }
}