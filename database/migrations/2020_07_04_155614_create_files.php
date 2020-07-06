<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Admin\Database\Models\File;

class CreateFiles extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->uuid(File::ATTR_ID)->primary()->unique()->default(DB::raw('uuid_generate_v4()'));
            $table->string(File::ATTR_NAME, 255);
            $table->string(File::ATTR_TYPE, 64);
            $table->integer(File::ATTR_SIZE);
            $table->string(File::ATTR_HASH, 32);
            $table->timestamp(File::ATTR_CREATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
            $table->timestamp(File::ATTR_UPDATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
