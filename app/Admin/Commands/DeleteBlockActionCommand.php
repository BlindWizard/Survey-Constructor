<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\ActionContract;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Admin\Contracts\Services\PageServiceContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\BlockAction;
use App\Admin\DTO\BlockWrapper;
use App\Http\Requests\AddBlockActionRequest;

class DeleteBlockActionCommand implements Command
{
    /** @var string */
    public $userId;

    /** @var AddBlockActionRequest */
    public $request;

    /** @var SurveyServiceContract */
    protected $surveyService;

    /** @var SurveyRepositoryContract */
    protected $surveyRepository;

    /** @var BlockServiceContract */
    protected $blockService;

    /** @var BlockContract */
    protected $block;

    /**
     * @param PageServiceContract $blockService
     */
    public function __construct(SurveyServiceContract $surveyService, SurveyRepositoryContract $surveyRepository, BlockServiceContract $blockService)
    {
        $this->surveyService = $surveyService;
        $this->surveyRepository = $surveyRepository;
        $this->blockService = $blockService;
    }

    public function perform(): Command
    {
        $survey = $this->surveyRepository->findByBlockId($this->request->getBlockId());
        if (false === $this->surveyService->canOperate($survey, $this->userId)) {
            throw new AccessDeniedHttpException();
        }

        $block = $this->blockService->deleteAction($this->request->getBlockId(), $this->request->getId());
        $this->block = new BlockWrapper($block);

        return $this;
    }

    public function getResult(): BlockContract
    {
        return $this->block;
    }
}