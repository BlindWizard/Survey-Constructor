<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveSurveyDataRequest extends FormRequest
{
    public function rules()
    {
        return [
            'surveyId' => 'required|uuid',
            'datasetId' => 'required|uuid',
            'datasetType' => 'required|string',
            'data' => 'required',
        ];
    }

    public function getSurveyId(): string
    {
        return (string) $this->json('surveyId');
    }

    public function getDataId(): string
    {
        return (string) $this->json('datasetId');
    }

    public function getDataType(): string
    {
        return (string) $this->json('datasetType');
    }

    public function getData(): array
    {
        return $this->json('data');
    }
}