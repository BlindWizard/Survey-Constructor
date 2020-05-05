<?php

namespace App\Api\Entities;

use App\Api\Contracts\Entities\ApiEventPayloadContract;

class OptionsListSelectEventPayload implements ApiEventPayloadContract
{
    /** @var string */
    public $blockId;
    /** @var string */
    public $optionId;

    public function getData(): array
    {
        return [
            'blockId' => $this->blockId,
            'optionId' => $this->optionId,
        ];
    }
}