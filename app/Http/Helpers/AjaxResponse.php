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

    /** @var string|null */
    public $redirectPath;

    public function message(string $msg): AjaxResponse
    {
        $this->messages[] = $msg;

        return $this;
    }

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