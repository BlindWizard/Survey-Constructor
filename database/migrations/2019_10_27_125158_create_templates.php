<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Admin\Database\Models\Template;

/**
 * Create table for surveys templates.
 */
class CreateTemplates extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->uuid(Template::ATTR_ID)->primary()->unique()->default(DB::raw('uuid_generate_v4()'));
            $table->string(Template::ATTR_TITLE, 256)->nullable()->default(null);
            $table->boolean(Template::ATTR_PUBLIC)->default(false);
            $table->timestamp(Template::ATTR_CREATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
            $table->timestamp(Template::ATTR_UPDATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
        });
     }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('templates');
    }
}
