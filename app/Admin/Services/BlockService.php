<?php
declare(strict_types=1);

namespace App\Admin\Services;

use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Reporitories\BlockRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use Throwable;

class BlockService implements BlockServiceContract
{
    /** @var BlockFactoryContract */
    protected $blockFactory;

    /** @var BlockRepositoryContract */
    protected $blockRepository;

    public function __construct(BlockFactoryContract $blockFactory, BlockRepositoryContract $blockRepository)
    {
        $this->blockFactory = $blockFactory;
        $this->blockRepository = $blockRepository;
    }

    /**
     * @param string   $surveyId
     * @param string   $type
     * @param int|null $position
     *
     * @throws Throwable
     */
    public function addEmptyElement(string $surveyId, string $type, ?int $position): void
    {
        $element = $this->blockFactory->getEmptyBlock($type);

        if (null === $position) {
            $lastBlock = $this->blockRepository->findLastBlock($surveyId);
            $position = (null !== $lastBlock ? $lastBlock->getPosition() : 0);
        }

        $element->setSurveyId($surveyId);
        $element->setPosition($position);

        $this->blockRepository->save($element);
    }
}