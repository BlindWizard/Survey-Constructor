<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Admin\Database\Models\Page;
use App\Admin\Database\Models\Block;

class CreatePages extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->uuid(Page::ATTR_ID)->primary()->unique()->default(DB::raw('uuid_generate_v4()'));
            $table->uuid(Page::ATTR_SURVEY_ID);
            $table->integer(Page::ATTR_STEP)->default(0);
            $table->timestamp(Page::ATTR_CREATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
            $table->timestamp(Page::ATTR_UPDATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
        });

        Schema::table('blocks', function (Blueprint $table) {
            $table->dropColumn('survey_id');
            $table->uuid(Block::ATTR_PAGE_ID);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');

        Schema::table('blocks', function (Blueprint $table) {
            $table->dropColumn(Block::ATTR_PAGE_ID);
            $table->uuid('survey_id');
        });
    }
}
