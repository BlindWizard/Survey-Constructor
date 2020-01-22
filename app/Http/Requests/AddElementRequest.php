<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddElementRequest extends FormRequest
{
    public function rules()
    {
        return [
            'surveyId' => 'required|uuid',
            'blockId'  => 'required|uuid',
            'type'     => 'required',
            'position' => 'numeric|nullable',
        ];
    }

    public function getId(): string
    {
        return (string) $this->json('surveyId');
    }

    public function getBlockId(): string
    {
        return (string) $this->json('blockId');
    }

    public function getType(): string
    {
        return $this->json('type');
    }

    public function getPosition(): ?int
    {
        $position = $this->json('position');

        return (null !== $position ? (int) $position : null);
    }
}
