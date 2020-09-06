<?php
declare(strict_types=1);

namespace App\Admin\Commands;
use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Repositories\FileRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Http\Requests\ReorderElementRequest;
use App\Http\Requests\SaveElementDataRequest;
use Illuminate\Support\Facades\Storage;

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

    /** @var FileRepositoryContract */
    protected $fileRepository;

    public function __construct(BlockServiceContract $blockService, FileRepositoryContract $fileRepository)
    {
        $this->blockService = $blockService;
        $this->fileRepository = $fileRepository;
    }

    public function perform(): Command
    {
        $this->block = $this->blockService->setElementData($this->request->getId(), $this->request->getData());

        if (BlockContract::TYPE_IMAGE === $this->block->getType()) {
            $data = $this->fileRepository->getData($this->block->getData()['imageId']);

            $style = $this->block->getStyle();
            [$style['style']->width, $style['style']->height] = [$data[0], $data[1]];
            $style['style']->sizeMeasure = 'px';

            $this->blockService->setElementStyle($this->request->getId(), $style);
        }

        return $this;
    }

    public function getResult(): BlockContract
    {
        return $this->block;
    }
}