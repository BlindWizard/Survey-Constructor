<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Entities\ApiEventPayloadContract;
use App\Api\Entities\OptionSelectEventPayload;
use Illuminate\Foundation\Http\FormRequest;

class OptionSelectRequest extends FormRequest implements ApiEventContract
{
    public function rules()
    {
        return [
            'clientId' => 'required|uuid',
            'surveyId' => 'required|uuid',
            'blockId' => 'required|uuid',
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
        return ApiEventContract::OPTION_SELECT;
    }

    public function getPayload(): ApiEventPayloadContract
    {
        $payload = new OptionSelectEventPayload();
        $payload->blockId = (string) $this->json('blockId');

        return $payload;
    }
}