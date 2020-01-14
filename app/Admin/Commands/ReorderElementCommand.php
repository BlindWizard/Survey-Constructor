<?php
declare(strict_types=1);

namespace App\Admin\Commands;
use App\Admin\Contracts\Command;
use App\Admin\Contracts\Entities\BlockContract;
use App\Http\Requests\ReorderElementRequest;

class ReorderElementCommand implements Command
{
    /** @var ReorderElementRequest */
    public $request;

    /** @var string */
    public $userId;

    /** @var BlockContract */
    protected $block;

    public function perform(): Command
    {
        return $this;
    }

    public function getResult(): BlockContract
    {
        return $this->block;
    }
}