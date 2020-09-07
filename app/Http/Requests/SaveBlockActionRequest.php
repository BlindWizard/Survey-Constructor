<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveBlockActionRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required|uuid',
            'blockId' => 'required|uuid',
            'data' => 'required',
        ];
    }

    public function getId(): string
    {
        return (string) $this->json('id');
    }

    public function getBlockId(): string
    {
        return (string) $this->json('blockId');
    }

    public function getData(): array
    {
        return $this->json('data');
    }
}