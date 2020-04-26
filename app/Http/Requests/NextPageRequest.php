<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Api\Contracts\Entities\ApiEventContract;
use App\Api\Contracts\Entities\ApiEventPayloadContract;
use App\Api\Entities\NextPageEventPayload;
use Illuminate\Foundation\Http\FormRequest;

class NextPageRequest extends FormRequest implements ApiEventContract
{
    public function rules()
    {
        return [
            'clientId' => 'required|uuid',
            'surveyId' => 'required|uuid',
            'pageId' => 'required|uuid',
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
        return ApiEventContract::NEXT_PAGE;
    }

    public function getPayload(): ApiEventPayloadContract
    {
        $payload = new NextPageEventPayload();
        $payload->pageId = (string) $this->json('pageId');

        return $payload;
    }
}