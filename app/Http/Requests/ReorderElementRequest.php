<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReorderElementRequest extends FormRequest
{
    public function rules()
    {
        return [
            'blockId' => 'required|uuid',
            'position' => 'numeric',
        ];
    }

    public function getId(): string
    {
        return (string) $this->json('blockId');
    }

    public function getPosition(): int
    {
        return $this->json('position');
    }
}