<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Repositories\BlockRepositoryContract;
use App\Admin\Contracts\Repositories\PageRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Admin\Database\Models\Block;

class BlockService implements BlockServiceContract
{
    /** @var BlockFactoryContract */
    protected $blockFactory;

    /** @var PageRepositoryContract */
    protected $pageRepository;

    /** @var BlockRepositoryContract */
    protected $blockRepository;

    public function __construct(BlockFactoryContract $blockFactory, PageRepositoryContract $pageRepository, BlockRepositoryContract $blockRepository)
    {
        $this->blockFactory    = $blockFactory;
        $this->pageRepository  = $pageRepository;
        $this->blockRepository = $blockRepository;
    }

    /**
     * @inheritDoc
     */
    public function addEmptyElement(string $pageId, string $blockId, string $type, ?int $position): BlockContract
    {
        $element = $this->blockFactory->getEmptyBlock($type, $blockId);

        $lastBlock = $this->blockRepository->findLastBlock($pageId);
        $lastBlockPosition = (null !== $lastBlock ? $lastBlock->getPosition() + 1 : 0);

        $element->setPageId($pageId);
        $element->setPosition($lastBlockPosition);

        $element = $this->blockRepository->save($element);

        if (null !== $position) {
            $element = $this->reorderElement($element->getId(), $position);
        }

        return $this->blockFactory->getDTO($element);
    }

    /**
     * @inheritDoc
     */
    public function reorderElement(string $blockId, int $position): BlockContract
    {
        $page = $this->pageRepository->getPageByBlockId($blockId);
        $reorderBlock = $this->blockRepository->findById($blockId);
        $blocks = $this->blockRepository->getPageBlocks($page->getId());

        $positions = array_values(array_column($blocks, BLOCK::ATTR_ID, Block::ATTR_POSITION));
        array_splice($positions, array_search($reorderBlock->getId(), $positions), 1);
        array_splice($positions, $position, 0, $reorderBlock->getId());

        $this->blockRepository->setElementsPositions(array_flip($positions));
        $reorderBlock->setPosition($position);

        return $reorderBlock;
    }

    /**
     * @inheritDoc
     */
    public function setElementData(string $blockId, array $data): BlockContract
    {
        return $this->blockRepository->setElementData($blockId, $data);
    }

    /**
     * @inheritDoc
     */
    public function deleteElement(string $blockId): void
    {
        $this->blockRepository->deleteElement($blockId);
    }
}