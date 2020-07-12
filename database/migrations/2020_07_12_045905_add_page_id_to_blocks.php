<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use \App\Admin\Database\Models\Block;

class AddPageIdToBlocks extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::table('blocks', function (Blueprint $table) {
            $table->uuid(Block::ATTR_PAGE_ID);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::table('blocks', function (Blueprint $table) {
            $table->dropColumn(Block::ATTR_PAGE_ID);
        });
    }
}
