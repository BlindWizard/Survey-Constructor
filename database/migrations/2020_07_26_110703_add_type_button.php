<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTypeButton extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE blocks DROP CONSTRAINT blocks_type_check');
        DB::statement('ALTER TABLE blocks ADD CHECK ((type)::text = ANY((ARRAY [\'container\'::character varying, \'header\'::character varying, \'option\'::character varying, \'options-list\'::character varying, \'text\'::character varying, \'text-field\'::character varying, \'image\'::character varying, \'button\'::character varying])::text[]))');
    }

    /**
     * @return void
     */
    public function down()
    {
        DB::statement('ALTER TABLE blocks DROP CONSTRAINT blocks_type_check');
        DB::statement('ALTER TABLE blocks ADD CHECK ((type)::text = ANY((ARRAY [\'container\'::character varying, \'header\'::character varying, \'option\'::character varying, \'options-list\'::character varying, \'text\'::character varying, \'text-field\'::character varying, \'image\'::character varying])::text[]))');
    }
}
