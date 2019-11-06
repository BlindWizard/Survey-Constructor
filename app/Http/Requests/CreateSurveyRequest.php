<?php
declare(strict_types=1);

namespace App\Http\Requests;

use App\Admin\Contracts\Entities\TemplateContract;
use Illuminate\Foundation\Http\FormRequest;

class CreateSurveyRequest extends FormRequest implements TemplateContract
{
    public function rules()
    {
        return [
            'templateId'   => 'requires|uuid',
            'templateName' => 'required|string',
        ];
    }

    public function getId(): string
    {
        return $this->query('templateId');
    }

    public function getTitle(): string
    {
        return $this->query('templateName');
    }
}