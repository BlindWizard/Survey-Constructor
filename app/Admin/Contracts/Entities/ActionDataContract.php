<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Entities;

interface ActionDataContract
{
    public const HANDLE_GO_TO_PAGE = 'go-to-page';

    public const HANDLES = [
        self::HANDLE_GO_TO_PAGE => 'Go to page',
    ];
}