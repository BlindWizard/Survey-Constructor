<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Entities\ApiEventPayloadContract;
use App\Api\Entities\EnterTextEventPayload;
use App\Api\Entities\OptionSelectEventPayload;
use Illuminate\Foundation\Http\FormRequest;

class EnterTextRequest extends FormRequest implements ApiEventContract
{
    public function rules()
    {
        return [
            'token' => 'required|string',
            'clientId' => 'required|uuid',
            'surveyId' => 'required|uuid',
            'blockId' => 'required|uuid',
            'text' => 'string',
        ];
    }

    public function getToken(): string
    {
        return (string) $this->json('token');
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
        return ApiEventContract::ENTER_TEXT;
    }

    public function getPayload(): ?ApiEventPayloadContract
    {
        $payload = new EnterTextEventPayload();
        $payload->blockId = (string) $this->json('blockId');
        $payload->text = (string) $this->json('text');

        return $payload;
    }
}