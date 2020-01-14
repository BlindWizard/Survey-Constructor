<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveElementDataRequest extends FormRequest
{
    public function rules()
    {
        return [
            'blockId' => 'required|uuid',
            'data' => 'required',
        ];
    }

    public function getId(): string
    {
        return (string) $this->json('blockId');
    }

    public function getData(): array
    {
        return $this->json('data');
    }
}