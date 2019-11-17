<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Admin\Database\Models\Survey;

/**
 * Create table for surveys.
 */
class CreateSurveys extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('surveys', function (Blueprint $table) {
            $table->uuid(Survey::ATTR_ID)->primary()->unique()->default(DB::raw('uuid_generate_v4()'));
            $table->string(Survey::ATTR_TITLE, 256)->nullable()->default(null);
            $table->timestamp(Survey::ATTR_CREATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
            $table->timestamp(Survey::ATTR_UPDATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('surveys');
    }
}
