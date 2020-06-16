<?php

use App\Admin\Database\Models\ApiToken;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Create table for api tokens.
 */
class CreateApiTokens extends Migration
{
    public function up()
    {
        Schema::create('api_tokens', function (Blueprint $table) {
            $table->uuid(ApiToken::ATTR_ID)->primary()->unique()->default(DB::raw('uuid_generate_v4()'));
            $table->uuid(ApiToken::ATTR_USER_ID);
            $table->string(ApiToken::ATTR_NAME);
            $table->string(ApiToken::ATTR_VALUE);
            $table->timestamp(ApiToken::ATTR_CREATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
            $table->timestamp(ApiToken::ATTR_UPDATED_AT)->default(DB::raw('(NOW() AT TIME ZONE \'UTC\')'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('api_tokens');
    }
}
