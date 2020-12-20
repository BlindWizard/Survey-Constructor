<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOwnerIdToFiles extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->uuid(\App\Admin\Database\Models\File::ATTR_OWNER_ID)->after(\App\Admin\Database\Models\File::ATTR_HASH);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->dropColumn(\App\Admin\Database\Models\File::ATTR_OWNER_ID);
        });
    }
}
