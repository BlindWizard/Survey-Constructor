<?php

use App\Api\Database\Models\Event;
use App\Api\Contracts\Entities\ApiEventContract;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Create table for events.
 */
class CreateEvents extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->uuid(Event::ATTR_ID)->primary()->unique()->default(DB::raw('uuid_generate_v4()'));
            $table->uuid(Event::ATTR_CLIENT_ID);
            $table->uuid(Event::ATTR_SURVEY_ID);
            $table->enum(Event::ATTR_TYPE, [
                ApiEventContract::NEXT_PAGE,
                ApiEventContract::PREV_PAGE,
                ApiEventContract::OPTIONS_LIST_SELECT,
                ApiEventContract::OPTION_SELECT,
            ]);
            $table->jsonb(Event::ATTR_DATA);
            $table->timestamp(Event::ATTR_CREATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
            $table->timestamp(Event::ATTR_UPDATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
