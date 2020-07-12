<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploadRequest extends FormRequest
{
    public function rules()
    {
        return [
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function getFile(): UploadedFile
    {
        return $this->files->get('file');
    }
}