<?php
declare(strict_types=1);

namespace App\Api\Database\Repositories;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Repositories\EventRepositoryContract;
use App\Api\Database\Models\Event;

class EventRepository implements EventRepositoryContract
{
    /**
     * @inheritDoc
     */
    public function save(ApiEventContract $event): void
    {
        $model = new Event();
        $model->client_id = $event->getClientId();
        $model->survey_id = $event->getSurveyId();
        $model->type      = $event->getType();
        $model->data      = \GuzzleHttp\json_encode($event->getPayload()->getData());

        $model->saveOrFail();
    }
}