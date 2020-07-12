<?php
declare(strict_types=1);

namespace App\Admin\Database\Repositories;

use App\Admin\Contracts\Entities\FileContract;
use App\Admin\Contracts\Repositories\FileRepositoryContract;
use App\Admin\Database\Models\File;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileRepository implements FileRepositoryContract
{
    /**
     * @inheritDoc
     */
    public function upload(UploadedFile $file): FileContract {
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
}