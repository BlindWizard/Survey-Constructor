<?php
declare(strict_types=1);

namespace App\Api\Services;

use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Admin\Contracts\Repositories\SurveyStatisticRepositoryContract;
use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Repositories\EventRepositoryContract;
use App\Api\Contracts\Services\ApiEventHandlerContract;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RunHandler implements ApiEventHandlerContract
{
    /** @var EventRepositoryContract */
    protected $events;
    /** @var ApiTokenRepositoryContract */
    protected $tokens;
    /** @var SurveyStatisticRepositoryContract */
    protected $statistics;

    /**
     * @param EventRepositoryContract $repository
     */
    public function __construct(EventRepositoryContract $repository, ApiTokenRepositoryContract $tokens, SurveyStatisticRepositoryContract $statistics)
    {
        $this->events     = $repository;
        $this->tokens     = $tokens;
        $this->statistics = $statistics;
    }

    public function handle(ApiEventContract $event): void
    {
        $this->events->save($event);

        $token = $this->tokens->getTokenByValue($event->getToken());
        if (null === $token) {
            throw new NotFoundHttpException();
        }

        $this->statistics->incrementRuns($event->getSurveyId(), $token->getId());
    }
}