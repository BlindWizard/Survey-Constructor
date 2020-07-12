<?php

namespace App\Api\Entities;

use App\Api\Contracts\Entities\ApiEventPayloadContract;

class EnterTextEventPayload implements ApiEventPayloadContract
{
    /** @var string */
    public $blockId;
    /** @var string */
    public $text;

    public function getData(): ?array
    {
        return [
            'blockId' => $this->blockId,
            'text' => $this->text,
        ];
    }
}