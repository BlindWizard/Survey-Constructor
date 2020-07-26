<?php
declare(strict_types=1);

namespace App\Admin\Commands;
use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Http\Requests\SaveElementStyleRequest;

class SaveElementStyleCommand implements Command
{
    /** @var SaveElementStyleRequest */
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
        $this->block = $this->blockService->setElementStyle($this->request->getId(), $this->request->getStyle());

        return $this;
    }

    public function getResult(): BlockContract
    {
        return $this->block;
    }
}