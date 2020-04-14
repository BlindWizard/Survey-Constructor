<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface ApiTokenContract
{
    /**
     * @return string
     */
    public function getId(): string;

    /**
     * @return string
     */
    public function getUserId(): string;

    /**
     * @return string
     */
    public function getName(): string;

    /**
     * @return string
     */
    public function getValue(): string;

    /**
     * @return string
     */
    public function getCreatedAt(): string;

    /**
     * @return string
     */
    public function getUpdatedAt(): string;
}