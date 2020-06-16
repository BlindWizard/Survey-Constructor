<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenamePageIdToParentId extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::table('blocks', function (Blueprint $table) {
            $table->renameColumn('page_id', 'parent_id');
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::table('blocks', function (Blueprint $table) {
            $table->renameColumn('parent_id', 'page_id');
        });
    }
}
