<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Admin\Contracts\Entities\BlockContract;
use App\Admin\Database\Models\Block;

class CreateBlocks extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('blocks', function (Blueprint $table) {
            $table->uuid(Block::ATTR_ID)->primary()->unique()->default(DB::raw('uuid_generate_v4()'));
            $table->uuid(Block::ATTR_SURVEY_ID);
            $table->enum(Block::ATTR_TYPE, BlockContract::TYPES);
            $table->integer(Block::ATTR_POSITION)->default(0);
            $table->timestamp(Block::ATTR_CREATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
            $table->timestamp(Block::ATTR_UPDATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blocks');
    }
}
