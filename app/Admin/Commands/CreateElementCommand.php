<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Repositories\SurveyRepositoryContract;
use App\Admin\Contracts\Services\BlockServiceContract;
use App\Admin\Contracts\Services\SurveyServiceContract;
use App\Admin\DTO\BlockWrapper;
use App\Http\Requests\AddElementRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CreateElementCommand implements Command
{
    /** @var AddElementRequest */
    public $request;

    /** @var string */
    public $userId;

    /** @var SurveyServiceContract */
    protected $surveyService;

    /** @var SurveyRepositoryContract */
    protected $surveyRepository;

    /** @var BlockServiceContract */
    protected $blockService;

    /** @var BlockContract */
    protected $block;

    public function __construct(SurveyServiceContract $surveyService, SurveyRepositoryContract $surveyRepository, BlockServiceContract $blockService)
    {
        $this->surveyService = $surveyService;
        $this->surveyRepository = $surveyRepository;
        $this->blockService = $blockService;
    }

    public function perform(): Command
    {
        $survey = $this->surveyRepository->findById($this->request->getId());
        if (null === $survey) {
            throw new NotFoundHttpException();
        }

        if (false === $this->surveyService->canOperate($survey, $this->userId)) {
            throw new AccessDeniedHttpException();
        }

        $block = $this->blockService->addEmptyElement($survey->getId(), $this->request->getBlockId(), $this->request->getType(), $this->request->getPosition());
        $this->block = new BlockWrapper($block);

        return $this;
    }

    public function getResult(): BlockContract
    {
        return $this->block;
    }
}