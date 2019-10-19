<?php
declare(strict_types=1);

namespace App\Admin\Models;

/**
 * Application settings.
 */
class Settings implements \JsonSerializable
{
    public $csrf;
    public $appName;

    /**
     * @return mixed[]
     */
    public function jsonSerialize(): array
    {
        return [
            'csrf' => $this->csrf,
            'appName' => $this->appName,
        ];
    }

    /**
     * @return string
     * @throws \InvalidArgumentException
     */
    public function toJson(): string
    {
        return \GuzzleHttp\json_encode($this, JSON_UNESCAPED_UNICODE, JSON_HEX_QUOT);
    }
}
