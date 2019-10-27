<?php

namespace App\Http\Helpers;

class AjaxResponse implements \JsonSerializable
{
    /** @var bool */
    public $result = true;

    /** @var mixed|null */
    public $data;

    /** @var string|null */
    public $redirectPath;

    public function jsonSerialize(): array
    {
        return [
            'result' => $this->result,
            'data' => $this->data,
            'redirectPath' => $this->redirectPath,
        ];
    }
}