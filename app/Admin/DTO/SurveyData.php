<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\DataContract;

class SurveyData implements DataContract
{
    public $id;
    public $type;
    public $data;

    public function getId(): string
    {
        return $this->id;
    }

    public function getData(): array
    {
        return $this->data;
    }
}