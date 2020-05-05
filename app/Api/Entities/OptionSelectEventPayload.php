<?php

namespace App\Api\Entities;

use App\Api\Contracts\Entities\ApiEventPayloadContract;

class OptionSelectEventPayload implements ApiEventPayloadContract
{
    /** @var string */
    public $blockId;

    public function getData(): array
    {
        return [
            'blockId' => $this->blockId,
        ];
    }
}