<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSurveysData extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('surveys_data', function (Blueprint $table) {
            $table->uuid(\App\Admin\Database\Models\SurveyData::ATTR_ID)->primary()->unique();
            $table->jsonb(\App\Admin\Database\Models\SurveyData::ATTR_DATA);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('surveys_data');
    }
}
