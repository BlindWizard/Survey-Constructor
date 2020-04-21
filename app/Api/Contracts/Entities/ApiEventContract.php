<?php

namespace App\Api\Contracts\Entities;

interface ApiEventContract
{
    public const NEXT_PAGE = 'nextPage';
    public const PREV_PAGE = 'prevPage';
    public const OPTIONS_LIST_SELECT = 'optionsListSelect';
    public const OPTION_SELECT = 'optionSelect';

    public function getType(): string;
    public function getPayload(): ApiEventPayloadContract;
}