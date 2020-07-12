<?php
declare(strict_types=1);

namespace App\Api\Database\Repositories;

use App\Admin\Contracts\Repositories\ApiTokenRepositoryContract;
use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Repositories\EventRepositoryContract;
use App\Api\Database\Models\Event;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EventRepository implements EventRepositoryContract
{
    /** @var ApiTokenRepositoryContract */
    protected $tokenRepository;

    /**
     * @param ApiTokenRepositoryContract $apiTokenRepository
     */
    public function __construct(ApiTokenRepositoryContract $apiTokenRepository)
    {
        $this->tokenRepository = $apiTokenRepository;
    }

    /**
     * @inheritDoc
     */
    public function save(ApiEventContract $event): void
    {
        $model = new Event();

        $token = $this->tokenRepository->getTokenByValue($event->getToken());
        if (null === $token) {
            throw new NotFoundHttpException();
        }

        $model->token_id  = $token->getId();
        $model->client_id = $event->getClientId();
        $model->survey_id = $event->getSurveyId();
        $model->type      = $event->getType();

        $payload = $event->getPayload();
        $model->data = \GuzzleHttp\json_encode(null !== $payload ? $event->getPayload()->getData() : null);

        $model->saveOrFail();
    }
}