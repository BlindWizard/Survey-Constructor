<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Reporitories\BlockRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Admin\Database\Models\Block;
use Throwable;

class BlockService implements BlockServiceContract
{
    /** @var BlockFactoryContract */
    protected $blockFactory;

    /** @var SurveyRepositoryContract */
    protected $surveyRepository;

    /** @var BlockRepositoryContract */
    protected $blockRepository;

    public function __construct(BlockFactoryContract $blockFactory, SurveyRepositoryContract $surveyRepository, BlockRepositoryContract $blockRepository)
    {
        $this->blockFactory = $blockFactory;
        $this->surveyRepository = $surveyRepository;
        $this->blockRepository = $blockRepository;
    }

    /**
     * @param string   $surveyId
     * @param string   $type
     * @param int|null $position
     *
     * @return BlockContract
     *
     * @throws Throwable
     */
    public function addEmptyElement(string $surveyId, string $type, ?int $position): BlockContract
    {
        $element = $this->blockFactory->getEmptyBlock($type);

        if (null === $position) {
            $lastBlock = $this->blockRepository->findLastBlock($surveyId);
            $position = (null !== $lastBlock ? $lastBlock->getPosition() : 0);
        }

        $element->setSurveyId($surveyId);
        $element->setPosition($position);

        $this->blockRepository->save($element);

        return $element;
    }

    public function reorderElement(string $blockId, int $position): void
    {
        $survey = $this->surveyRepository->getSurveyByBlockId($blockId);
        $reorderBlock = $this->blockRepository->findById($blockId);
        $blocks = $this->blockRepository->getSurveyBlocks($survey->getId());

        $positions = array_column($blocks, BLOCK::ATTR_ID, Block::ATTR_POSITION);
        array_splice($positions, $reorderBlock->getPosition(), 1);
        array_splice($positions, $position, 0, $reorderBlock->getId());

        $this->blockRepository->setElementsPositions(array_flip($positions));
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