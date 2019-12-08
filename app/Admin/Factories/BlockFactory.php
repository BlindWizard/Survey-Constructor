<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\DTO\OptionsListBlock;
use App\Admin\Exceptions\TemplateNotFoundException;
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
                throw new TemplateNotFoundException();
        }
    }

    /**
     * @return OptionsListBlock
     *
     * @throws \Throwable
     */
    public function getOptionList(): OptionsListBlock
    {
        $block = new OptionsListBlock();
        $block->id = Uuid::uuid4()->toString();
        $block->position = 0;

        return $block;
    }
}