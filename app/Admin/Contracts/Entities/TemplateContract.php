<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface TemplateContract {
    public function getId(): string;
    public function getTitle(): string;
}