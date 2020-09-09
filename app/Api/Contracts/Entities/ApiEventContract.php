<?php
declare(strict_types=1);

namespace App\Api\Contracts\Entities;

interface ApiEventContract
{
    public const RUN = 'run';
    public const NEXT_PAGE = 'nextPage';
    public const PREV_PAGE = 'prevPage';
    public const OPTIONS_LIST_SELECT = 'optionsListSelect';
    public const OPTION_SELECT = 'optionSelect';
    public const ENTER_TEXT = 'enterText';
    public const SET_PAGE = 'setPage';

    public function getToken(): string;
    public function getSurveyId(): string;
    public function getClientId(): string;
    public function getType(): string;
    public function getPayload(): ?ApiEventPayloadContract;
}