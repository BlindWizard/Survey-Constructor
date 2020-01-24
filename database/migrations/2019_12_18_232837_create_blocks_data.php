<?php

use App\Admin\Database\Models\BlockData;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Create table for blocks data.
 */
class CreateBlocksData extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('blocks_data', function (Blueprint $table) {
            $table->uuid(BlockData::ATTR_ID)->primary()->unique();
            $table->jsonb(BlockData::ATTR_DATA);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blocks_data');
    }
}
