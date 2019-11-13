<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface SurveyContract {
    /**
     * @return string
     */
    public function getId(): string;

    /**
     * @return string
     */
    public function getTitle(): string;

    /**
     * @return string
     */
    public function getOwnerId(): string;

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