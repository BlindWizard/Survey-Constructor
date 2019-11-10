<?php

namespace App\Http\Helpers;

class AjaxResponse implements \JsonSerializable
{
    /** @var bool */
    public $result = true;

    /** @var mixed|null */
    public $data;

    /** @var string[] */
    public $messages = [];

    /** @var string[] */
    public $errors = [];

    /** @var string|null */
    public $redirectPath;

    public function jsonSerialize(): array
    {
        return [
            'result' => $this->result,
            'data' => $this->data,
            'messages' => $this->messages,
            'redirectPath' => $this->redirectPath,
        ];
    }
}