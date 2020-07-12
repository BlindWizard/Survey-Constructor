<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Contracts\Entities\FileContract;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileRepositoryContract
{
    /**
     * @param UploadedFile $file
     *
     * @return FileContract
     */
    public function upload(UploadedFile $file): FileContract;

    /**
     * @param string $fileId
     *
     * @return FileContract
     */
    public function findById(string $fileId): FileContract;
}