<?php
declare(strict_types=1);

namespace App\Admin\Models;

/**
 * Application settings.
 */
class Settings implements \JsonSerializable
{
    /** @var string */
    public $csrf;
    /** @var Locale */
    public $locale;

    /**
     * @return mixed[]
     */
    public function jsonSerialize(): array
    {
        return [
            'csrf' => $this->csrf,
            'locale' => $this->locale,
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
