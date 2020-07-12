<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface PageContract
{
    /**
     * @return string
     */
    public function getId(): string;

    /**
     * @return string
     */
    public function getSurveyId(): string;

    /**
     * @return int
     */
    public function getStep(): int;

    /**
     * @return BlockContract[]
     */
    public function getBlocks(): array;

    /**
     * @return string
     */
    public function getCreatedAt(): string;

    /**
     * @return string
     */
    public function getUpdatedAt(): string;
}