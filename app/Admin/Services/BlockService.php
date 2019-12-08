<?php

namespace App\Admin\Services;

use App\Admin\Contracts\Factories\BlockFactoryContract;
use App\Admin\Contracts\Reporitories\BlockRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Admin\Database\Repositories\BlockRepository;
use Throwable;

class BlockService implements BlockServiceContract
{
    /** @var BlockFactoryContract */
    protected $blockFactory;

    /** @var BlockRepositoryContract */
    protected $blockRepository;

    public function __construct(BlockFactoryContract $blockFactory, BlockRepository $blockRepository)
    {
        $this->blockFactory = $blockFactory;
        $this->blockRepository = $blockRepository;
    }

    /**
     * @param int    $surveyId
     * @param string $type
     * @param int    $position
     *
     * @throws Throwable
     */
    public function addEmptyElement(int $surveyId, string $type, int $position): void
    {
        $element = $this->blockFactory->getEmptyBlock($type);
        $element->setSurveyId($surveyId);
        $element->setPosition($position);

        $this->blockRepository->save($element);
    }
}