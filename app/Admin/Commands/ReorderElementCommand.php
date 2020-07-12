<?php
declare(strict_types=1);

namespace App\Admin\Commands;
use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Http\Requests\ReorderElementRequest;

class ReorderElementCommand implements Command
{
    /** @var ReorderElementRequest */
    public $request;

    /** @var string */
    public $userId;

    /** @var BlockContract */
    protected $block;

    /** @var BlockServiceContract */
    protected $blockService;

    public function __construct(BlockServiceContract $blockService)
    {
        $this->blockService = $blockService;
    }

    public function perform(): Command
    {
        $this->blockService->reorderElement($this->request->getId(), $this->request->getPosition(), $this->request->getParentId());

        return $this;
    }

    public function getResult(): bool
    {
        return true;
    }
}