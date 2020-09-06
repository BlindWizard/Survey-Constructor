<?php
declare(strict_types=1);

namespace App\Admin\Factories;

use App\Admin\Contracts\Entities\ActionContract;
use App\Admin\Contracts\Factories\BlockActionFactoryContract;
use App\Admin\DTO\BlockAction;
use App\Admin\DTO\BlockActionData;

class BlockActionFactory implements BlockActionFactoryContract
{
    public function createGoToPage(string $type, string $targetId): ActionContract
    {
        $action = new BlockAction();
        $action->type = $type;
        $action->data = new BlockActionData();
        $action->data->handle = BlockActionData::HANDLE_GO_TO_PAGE;
        $action->data->targetId = $targetId;

        return $action;
    }
}