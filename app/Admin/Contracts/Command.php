<?php
declare(strict_types=1);

namespace App\Admin\Contracts;

interface Command
{
    public function perform(): Command;
    public function getResult();
}