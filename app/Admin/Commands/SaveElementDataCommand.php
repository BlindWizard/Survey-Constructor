<?php
declare(strict_types=1);

namespace App\Admin\Commands;
use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Http\Requests\ReorderElementRequest;
use App\Http\Requests\SaveElementDataRequest;

class SaveElementDataCommand implements Command
{
    /** @var SaveElementDataRequest */
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
        $this->block = $this->blockService->setElementData($this->request->getId(), $this->request->getData());

        return $this;
    }

    public function getResult(): BlockContract
    {
        return $this->block;
    }
}