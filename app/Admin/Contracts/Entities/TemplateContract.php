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
}