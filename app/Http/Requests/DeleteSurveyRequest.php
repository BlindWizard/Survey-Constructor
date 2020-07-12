<?php
declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteSurveyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'surveyId' => 'required|uuid',
        ];
    }

    public function getId(): string
    {
        return (string) $this->json('surveyId');
    }
}
