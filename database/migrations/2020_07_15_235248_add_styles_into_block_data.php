<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Admin\Database\Models\BlockData;

class AddStylesIntoBlockData extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::table('blocks_data', function (Blueprint $table) {
            $table->jsonb(BlockData::ATTR_STYLE);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::table('blocks_data', function (Blueprint $table) {
            $table->dropColumn(BlockData::ATTR_STYLE);
        });
    }
}
