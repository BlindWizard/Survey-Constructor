<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddBlockActionRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required|uuid',
            'blockId' => 'required|uuid',
            'type' => 'required',
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

    public function getType(): string
    {
        return (string) $this->json('type');
    }
}