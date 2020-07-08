<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface FileContract
{
    /**
     * @return string
     */
    public function getId(): string;

    /**
     * @return string
     */
    public function getName(): string;
}