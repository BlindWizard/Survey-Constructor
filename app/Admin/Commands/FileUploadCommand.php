<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use Illuminate\Http\UploadedFile;

class FileUploadCommand implements Command
{
    /** @var UploadedFile */
    public $file;

    public function perform(): Command
    {
        return $this;
    }

    public function getResult()
    {
        return  true;
    }
}