<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Ramsey\Uuid\Uuid;

/**
 * Create table for surveys.
 */
class CreateSurvey extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('survey', function (Blueprint $table) {
            $table->uuid('id')->default(Uuid::uuid4()->toString());
            $table->string('title', 256)->nullable()->default(null);
            $table->timestamp('created_at')->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
            $table->timestamp('updated_at')->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('survey');
    }
}
