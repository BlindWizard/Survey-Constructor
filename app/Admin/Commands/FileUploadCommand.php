<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Repositories\FileRepositoryContract;
use App\Admin\DTO\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploadCommand implements Command
{
    /** @var UploadedFile */
    public $file;

    /** @var File */
    public $result;

    /** @var FileRepositoryContract */
    protected $fileRepository;

    /**
     * @param FileRepositoryContract $fileRepository
     */
    public function __construct(FileRepositoryContract $fileRepository)
    {
        $this->fileRepository = $fileRepository;
    }

    public function perform(): Command
    {
        $file = $this->fileRepository->upload($this->file);

        $dto = new File();
        $dto->id = $file->getId();
        $dto->name = $file->getName();
        $dto->url = $file->getUrl();
        $this->result = $dto;

        return $this;
    }

    public function getResult()
    {
        return $this->result;
    }
}