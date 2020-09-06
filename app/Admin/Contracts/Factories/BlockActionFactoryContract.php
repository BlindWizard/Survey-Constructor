<?php


namespace App\Admin\Contracts\Factories;


use App\Admin\Contracts\Entities\ActionContract;

interface BlockActionFactoryContract
{
    public function createGoToPage(string $type, string $targetId): ActionContract;
}