<?php
declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTokenRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string',
        ];
    }

    public function getName(): string
    {
        return (string) $this->json('name');
    }
}
