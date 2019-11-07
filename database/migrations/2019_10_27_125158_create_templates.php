<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Ramsey\Uuid\Uuid;

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
            $table->uuid('id')->default(DB::raw('uuid_generate_v4()'));
            $table->string('title', 256)->nullable()->default(null);
            $table->boolean('public')->default(false);
            $table->timestamp('created_at')->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
            $table->timestamp('updated_at')->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
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
