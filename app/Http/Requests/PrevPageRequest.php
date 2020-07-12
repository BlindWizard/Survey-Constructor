<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Entities\ApiEventPayloadContract;
use App\Api\Entities\PrevPageEventPayload;
use Illuminate\Foundation\Http\FormRequest;

class PrevPageRequest extends FormRequest implements ApiEventContract
{
    public function rules()
    {
        return [
            'token' => 'required|string',
            'clientId' => 'required|uuid',
            'surveyId' => 'required|uuid',
            'pageId' => 'required|uuid',
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
        return ApiEventContract::PREV_PAGE;
    }

    public function getPayload(): ?ApiEventPayloadContract
    {
        $payload = new PrevPageEventPayload();
        $payload->pageId = (string) $this->json('pageId');

        return $payload;
    }
}