<?php
declare(strict_types=1);

namespace App\Admin\DTO;

use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Contracts\Entities\SurveyContract;

class SurveyObject implements SurveyContract
{
    /** @var string */
    public $id;
    /** @var string */
    public $title;
    /** @var BlockContract[] */
    public $blocks;
    /** @var string */
    public $createdAt;
    /** @var string */
    public $updatedAt;

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }
}