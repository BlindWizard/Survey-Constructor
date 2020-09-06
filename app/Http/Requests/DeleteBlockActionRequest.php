<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteBlockActionRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required|uuid',
            'blockId' => 'required|uuid',
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
}