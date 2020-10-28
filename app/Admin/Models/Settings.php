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
    /** @var string|null */
    public $token;
    /** @var Locale */
    public $locale;
    /** @var BlockContract[] */
    public $defaultBlockData;
    /** @var string[] */
    public $actionsTypes;
    /** @var string[] */
    public $actionsHandles;
    /** @var string[] */
    public $dataTypes;

    /**
     * @return mixed[]
     */
    public function jsonSerialize(): array
    {
        return [
            'csrf'             => $this->csrf,
            'token'            => $this->token,
            'locale'           => $this->locale,
            'defaultBlockData' => $this->defaultBlockData,
            'actionsTypes'     => $this->actionsTypes,
            'actionsHandles'   => $this->actionsHandles,
            'dataTypes'        => $this->dataTypes,
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
