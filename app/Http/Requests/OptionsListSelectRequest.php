<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Entities\ApiEventPayloadContract;
use App\Api\Entities\NextPageEventPayload;
use App\Api\Entities\OptionsListSelectEventPayload;
use Illuminate\Foundation\Http\FormRequest;

class OptionsListSelectRequest extends FormRequest implements ApiEventContract
{
    public function rules()
    {
        return [
            'clientId' => 'required|uuid',
            'surveyId' => 'required|uuid',
            'blockId' => 'required|uuid',
            'optionId' => 'required|uuid',
        ];
    }

    public function getClientId(): string
    {
        return (string) $this->json('clientId');
    }

    public function getSurveyId(): string
    {
        return (string) $this->json('surveyId');
    }

    public function getType(): string
    {
        return ApiEventContract::OPTIONS_LIST_SELECT;
    }

    public function getPayload(): ApiEventPayloadContract
    {
        $payload = new OptionsListSelectEventPayload();
        $payload->blockId = (string) $this->json('blockId');
        $payload->optionId = (string) $this->json('optionId');

        return $payload;
    }
}