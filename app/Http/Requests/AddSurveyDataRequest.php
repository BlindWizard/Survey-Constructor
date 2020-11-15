<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddSurveyDataRequest extends FormRequest
{
    public function rules()
    {
        return [
            'surveyId' => 'required|uuid',
            'dataType' => 'required|string',
        ];
    }

    public function getId(): string
    {
        return (string) $this->json('surveyId');
    }

    public function getType(): string
    {
        return (string) $this->json('dataType');
    }
}