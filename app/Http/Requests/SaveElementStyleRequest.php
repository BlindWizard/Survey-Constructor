<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveElementStyleRequest extends FormRequest
{
    public function rules()
    {
        return [
            'blockId' => 'required|uuid',
            'style' => 'required',
        ];
    }

    public function getId(): string
    {
        return (string) $this->json('blockId');
    }

    public function getStyle(): array
    {
        return $this->json('style');
    }
}