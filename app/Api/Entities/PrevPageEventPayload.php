<?php

namespace App\Api\Entities;

use App\Api\Contracts\Entities\ApiEventPayloadContract;

class PrevPageEventPayload implements ApiEventPayloadContract
{
    /** @var string */
    public $pageId;

    public function getData(): array
    {
        return [
            'pageId' => $this->pageId,
        ];
    }
}