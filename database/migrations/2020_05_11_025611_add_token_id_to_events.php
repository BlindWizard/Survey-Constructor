<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Api\Database\Models\Event;

/**
 * Add token to events.
 */
class AddTokenIdToEvents extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->uuid(Event::ATTR_TOKEN_ID)->after(Event::ATTR_CLIENT_ID);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(Event::ATTR_TOKEN_ID);
        });
    }
}
