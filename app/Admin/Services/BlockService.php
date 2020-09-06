<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\ActionContract;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Repositories\BlockRepositoryContract;
use App\Admin\Contracts\Repositories\PageRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Admin\Database\Models\Block;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
    public function addEmptyElement(string $parentId, string $pageId, string $blockId, string $type, ?int $position): BlockContract
    {
        $element = $this->blockFactory->getEmptyBlock($type, $blockId);

        $lastBlock         = $this->blockRepository->findLastBlock($parentId);
        $lastBlockPosition = (null !== $lastBlock ? $lastBlock->getPosition() + 1 : 0);

        $element->setParentId($parentId);
        $element->setPageId($pageId);
        $element->setPosition($lastBlockPosition);

        $element = $this->blockRepository->save($element);

        if (null !== $position) {
            $element = $this->reorderElement($element->getId(), $position, $parentId);
        }

        return $this->blockFactory->getDTO($element);
    }

    /**
     * @inheritDoc
     */
    public function reorderElement(string $blockId, int $position, string $parentId): BlockContract
    {
        $blocks = $this->blockRepository->getBlocksByParentId($parentId);

        $reorderBlock = $this->blockRepository->findById($blockId);
        if ($reorderBlock->getParentId() !== $parentId) {
            $innerBlocks = $this->blockRepository->getBlocksByParentId($reorderBlock->getParentId());
            $positions   = array_values(array_column($innerBlocks, BLOCK::ATTR_ID, Block::ATTR_POSITION));
            array_splice($positions, array_search($reorderBlock->getId(), $positions), 1);
            $this->blockRepository->setElementsPositions(array_flip($positions));

            $reorderBlock->setParentId($parentId);
            $this->blockRepository->setElementParent($reorderBlock->getId(), $parentId);
            $this->blockRepository->setElementPosition($reorderBlock->getId(), count($blocks));
        }

        $blocks    = $this->blockRepository->getBlocksByParentId($parentId);
        $positions = array_values(array_column($blocks, BLOCK::ATTR_ID, Block::ATTR_POSITION));
        if (count($positions) > 0) {
            array_splice($positions, array_search($reorderBlock->getId(), $positions), 1);
            array_splice($positions, $position, 0, $reorderBlock->getId());

            $this->blockRepository->setElementsPositions(array_flip($positions));
            $reorderBlock->setPosition($position);
        }
        else {
            $this->blockRepository->setElementPosition($reorderBlock->getId(), 0);
        }

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
    public function setElementStyle(string $blockId, array $style): BlockContract
    {
        return $this->blockRepository->setElementStyle($blockId, $style);
    }

    /**
     * @inheritDoc
     */
    public function addAction(string $blockId, ActionContract $action): BlockContract
    {
        return $this->blockRepository->addAction($blockId, $action);
    }

    /**
     * @inheritDoc
     */
    public function deleteElement(string $blockId): void
    {
        $blockToDelete = $this->blockRepository->findById($blockId);

        if ($blockToDelete->getType() === BlockContract::TYPE_CONTAINER) {
            foreach ($blockToDelete->getChildren() as $innerBlockToDelete) {
                $this->blockRepository->deleteElement($innerBlockToDelete->getId());
            }

            $this->blockRepository->deleteElement($blockId);
        }
        else {
            $this->blockRepository->deleteElement($blockId);
        }

        $blocks = $this->blockRepository->getBlocksByParentId($blockToDelete->getParentId());
        $positions = array_values(array_column($blocks, BLOCK::ATTR_ID, Block::ATTR_POSITION));
        $this->blockRepository->setElementsPositions(array_flip($positions));
    }
}