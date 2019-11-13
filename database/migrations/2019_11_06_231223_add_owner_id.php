<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Ramsey\Uuid\Uuid;
use App\Admin\Database\Models\Survey;
use App\Admin\Database\Models\Template;

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
            $table->uuid(Survey::ATTR_OWNER_ID)->after(Survey::ATTR_TITLE);
        });

        Schema::table('templates', function (Blueprint $table) {
            $table->uuid(Template::ATTR_OWNER_ID)->nullable()->default(Uuid::NIL)->after(Template::ATTR_TITLE);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::table('surveys', function (Blueprint $table) {
            $table->dropColumn(Survey::ATTR_OWNER_ID);
        });

        Schema::table('templates', function (Blueprint $table) {
            $table->dropColumn(Template::ATTR_OWNER_ID);
        });
    }
}
