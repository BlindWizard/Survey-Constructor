<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface TemplateContract {
    /**
     * @return string
     */
    public function getId(): string;

    /**
     * @return string
     */
    public function getTitle(): string;

    /**
     * @return PageContract[]
     */
    public function getPages(): array;
    /**
     * @return string
     */
    public function getOwnerId(): string;

    /**
     * @return bool
     */
    public function getPublic(): bool;

    /**
     * @return string
     */
    public function getCreatedAt(): string;

    /**
     * @return string
     */
    public function getUpdatedAt(): string;
}