<?php
declare(strict_types=1);

namespace App\Api\Services;

use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Admin\Contracts\Repositories\PageRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Repositories\EventRepositoryContract;
use App\Api\Contracts\Services\ApiEventHandlerContract;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class NextPageHandler implements ApiEventHandlerContract
{
    /** @var EventRepositoryContract */
    protected $repository;

    /** @var PageRepositoryContract */
    protected $pages;

    /** @var SurveyStatisticRepositoryContract */
    protected $statistics;

    /** @var ApiTokenRepositoryContract */
    protected $tokens;

    /**
     * @param EventRepositoryContract $repository
     */
    public function __construct(
        EventRepositoryContract $repository,
        SurveyStatisticRepositoryContract $statisticRepository,
        PageRepositoryContract $pageRepository,
        ApiTokenRepositoryContract $apiTokenRepository
    ) {
        $this->repository = $repository;
        $this->pages = $pageRepository;
        $this->statistics = $statisticRepository;
        $this->tokens = $apiTokenRepository;
    }

    public function handle(ApiEventContract $event): void
    {
        $token = $this->tokens->getTokenByValue($event->getToken());
        if (null === $token) {
            throw new NotFoundHttpException();
        }

        $this->repository->save($event);

        if (null !== $lastPage = $this->pages->getLastPage($event->getSurveyId())) {
            $payload = $event->getPayload()->getData();
            if ($lastPage->getId() === $payload['pageId'] ?? null) {
                $this->statistics->incrementCompletes($event->getSurveyId(), $token->getId());
            }
        }
    }
}