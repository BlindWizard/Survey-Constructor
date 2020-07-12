<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddElementRequest extends FormRequest
{
    public function rules()
    {
        return [
            'pageId' => 'required|uuid',
            'blockId'  => 'required|uuid',
            'parentBlockId' => 'required|uuid',
            'type'     => 'required',
            'position' => 'numeric|nullable',
        ];
    }

    public function getPageId(): string
    {
        return (string) $this->json('pageId');
    }

    public function getBlockId(): string
    {
        return (string) $this->json('blockId');
    }

    public function getParentBlockId(): string
    {
        return (string) $this->json('parentBlockId');
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
