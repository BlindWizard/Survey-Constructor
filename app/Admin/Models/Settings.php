<?php
declare(strict_types=1);

namespace App\Admin\Models;

use App\Admin\Contracts\Entities\BlockContract;

/**
 * Application settings.
 */
class Settings implements \JsonSerializable
{
    /** @var string */
    public $csrf;
    /** @var Locale */
    public $locale;
    /** @var BlockContract[] */
    public $defaultBlockData;

    /**
     * @return mixed[]
     */
    public function jsonSerialize(): array
    {
        return [
            'csrf'             => $this->csrf,
            'locale'           => $this->locale,
            'defaultBlockData' => $this->defaultBlockData,
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
