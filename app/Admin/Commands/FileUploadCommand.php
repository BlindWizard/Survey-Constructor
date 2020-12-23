<?php
declare(strict_types=1);

namespace App\Admin\Commands;

use App\Admin\Contracts\Command;
use App\Admin\Contracts\Repositories\FileRepositoryContract;
use App\Admin\DTO\File;
use App\Admin\Exceptions\TariffOverflowException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploadCommand implements Command
{
    /** @var string */
    public $userId;

    /** @var UploadedFile */
    public $file;

    /** @var File|null */
    public $result = null;

    /** @var FileRepositoryContract */
    protected $fileRepository;

    /** @var string[] */
    protected $errors = [];

    /**
     * @param FileRepositoryContract $fileRepository
     */
    public function __construct(FileRepositoryContract $fileRepository)
    {
        $this->fileRepository = $fileRepository;
    }

    public function perform(): Command
    {
        try {
            $file = $this->fileRepository->upload($this->userId, $this->file);

            $dto          = new File();
            $dto->id      = $file->getId();
            $dto->name    = $file->getName();
            $dto->url     = $file->getUrl();
            $this->result = $dto;
        }
        catch (TariffOverflowException $e) {
            $this->errors[] = __('Max surveys count reached');
        }

        return $this;
    }

    public function getResult(): array
    {
        return [$this->result, $this->errors];
    }
}