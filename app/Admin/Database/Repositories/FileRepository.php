<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\FileContract;
use App\Admin\Contracts\Repositories\FileRepositoryContract;
use App\Admin\Database\Models\File;
use App\Admin\Database\Models\Survey;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileRepository implements FileRepositoryContract
{
    /**
     * @inheritDoc
     */
    public function upload(string $ownerId, UploadedFile $file): FileContract {
        $id = Uuid::uuid4()->toString();
        $name = $id . '.' . $file->guessExtension();
        $content = file_get_contents($file->getFileInfo()->getPathname());

        Storage::disk('public')->put($name, $content);

        $model = new File();
        $model->id = $id;
        $model->name = $name;
        $model->original_name = $file->getClientOriginalName();
        $model->type = $file->getMimeType();
        $model->size = $file->getSize();
        $model->hash = md5($content);
        $model->owner_id = $ownerId;
        $model->save();

        return $model;
    }

    /**
     * @inheritDoc
     */
    public function findById(string $fileId): FileContract {
        $file = File::query()->find($fileId);/** @var File $file */

        return  $file;
    }

    /**
     * @inheritDoc
     */
    public function getData(string $fileId): array {
        $file = $this->findById($fileId);

        $data = getimagesize(Storage::disk('public')->path($file->getName()));

        return $data;
    }

    /**
     * @inheritDoc
     */
    public function getTotalSize(string $ownerId): int {
        return File::query()->where(File::ATTR_OWNER_ID, '=', $ownerId)->get()->sum(File::ATTR_SIZE);
    }
}