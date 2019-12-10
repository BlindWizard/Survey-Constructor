<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\DTO\OptionsList;
use App\Admin\Exceptions\BlockTypeException;
use Ramsey\Uuid\Uuid;

class BlockFactory implements BlockFactoryContract
{
    /**
     * @inheritdoc
     */
    public function getEmptyBlock(string $type): BlockContract
    {
        switch ($type) {
            case BlockContract::TYPE_OPTIONS_LIST:
                return $this->getOptionList();
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

        return $block;
    }
}