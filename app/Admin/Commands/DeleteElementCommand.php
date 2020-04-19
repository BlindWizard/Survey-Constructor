<?php
declare(strict_types=1);

namespace App\Admin\Commands;
use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Http\Requests\ReorderElementRequest;
use App\Http\Requests\SaveElementDataRequest;

class DeleteElementCommand implements Command
{
    /** @var string */
    public $blockId;

    /** @var string */
    public $userId;

    /** @var BlockServiceContract */
    protected $blockService;

    public function __construct(BlockServiceContract $blockService)
    {
        $this->blockService = $blockService;
    }

    public function perform(): Command
    {
        $this->blockService->deleteElement($this->blockId);

        return $this;
    }

    public function getResult(): bool
    {
        return true;
    }
}