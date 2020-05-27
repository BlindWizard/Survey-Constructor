<?php

namespace App\Api\Entities;

use App\Api\Contracts\Entities\ApiEventPayloadContract;

class OptionSelectEventPayload implements ApiEventPayloadContract
{
    /** @var string */
    public $blockId;
    /** @var bool */
    public $checked;

    public function getData(): ?array
    {
        return [
            'blockId' => $this->blockId,
            'checked' => $this->checked,
        ];
    }
}