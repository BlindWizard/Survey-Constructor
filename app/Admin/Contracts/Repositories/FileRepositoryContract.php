<?php
declare(strict_types=1);

namespace App\Admin\Contracts\Repositories;

use App\Admin\Contracts\Entities\FileContract;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileRepositoryContract
{
    /**
     * @param string       $ownerId
     * @param UploadedFile $file
     *
     * @return FileContract
     */
    public function upload(string $ownerId, UploadedFile $file): FileContract;

    /**
     * @param string $fileId
     *
     * @return FileContract
     */
    public function findById(string $fileId): FileContract;

    /**
     * @param string $fileId
     *
     * @return array
     */
    public function getData(string $fileId): array;

    /**
     * @param string $ownerId
     *
     * @return int
     */
    public function getTotalSize(string $ownerId): int;
}