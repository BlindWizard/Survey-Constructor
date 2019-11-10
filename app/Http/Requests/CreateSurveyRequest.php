<?php
declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSurveyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'templateId' => 'required|uuid',
        ];
    }

    public function getId(): string
    {
        return (string) $this->json('templateId');
    }
}