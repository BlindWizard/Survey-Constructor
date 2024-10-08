<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddSurveyDataRequest extends FormRequest
{
    public function rules()
    {
        return [
            'surveyId' => 'required|uuid',
            'datasetId' => 'required|uuid',
            'dataType' => 'required|string',
        ];
    }

    public function getSurveyId(): string
    {
        return (string) $this->json('surveyId');
    }

    public function getDatasetId(): string
    {
        return (string) $this->json('datasetId');
    }

    public function getType(): string
    {
        return (string) $this->json('dataType');
    }
}