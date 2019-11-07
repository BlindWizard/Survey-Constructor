<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Ramsey\Uuid\Uuid;

/**
 * Add owner id to surveys and migrations.
 */
class AddOwnerId extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::table('surveys', function (Blueprint $table) {
            $table->uuid('owner_id')->nullable()->default(Uuid::NIL)->after('title');
        });

        Schema::table('templates', function (Blueprint $table) {
            $table->uuid('owner_id')->nullable()->default(Uuid::NIL)->after('title');
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::table('surveys', function (Blueprint $table) {
            $table->dropColumn('owner_id');
        });

        Schema::table('templates', function (Blueprint $table) {
            $table->dropColumn('owner_id');
        });
    }
}
