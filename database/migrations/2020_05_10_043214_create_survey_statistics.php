<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Admin\Database\Models\SurveyStatistic;

/**
 * Create table for survey_statistics.
 */
class CreateSurveyStatistics extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('survey_statistics', function (Blueprint $table) {
            $table->uuid(SurveyStatistic::ATTR_ID)->primary()->unique()->default(DB::raw('uuid_generate_v4()'));
            $table->uuid(SurveyStatistic::ATTR_TOKEN_ID);
            $table->uuid(SurveyStatistic::ATTR_SURVEY_ID);
            $table->integer(SurveyStatistic::ATTR_RUNS_COUNT)->default(0);
            $table->integer(SurveyStatistic::ATTR_COMPLETES_COUNT)->default(0);
            $table->integer(SurveyStatistic::ATTR_REJECTS_COUNT)->default(0);
            $table->timestamp(SurveyStatistic::ATTR_UPDATED_AT)->nullable()->default(null);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('survey_statistics');
    }
}
