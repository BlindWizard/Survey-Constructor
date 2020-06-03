<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTypeTextFieldToBlocks extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE blocks DROP CONSTRAINT blocks_type_check');
        DB::statement('ALTER TABLE blocks ADD CHECK ((type)::text = ANY((ARRAY [\'header\'::character varying, \'option\'::character varying, \'options-list\'::character varying, \'text\'::character varying, \'text-field\'::character varying])::text[]))');
    }

    /**
     * @return void
     */
    public function down()
    {
        DB::statement('ALTER TABLE blocks DROP CONSTRAINT blocks_type_check');
        DB::statement('ALTER TABLE blocks ADD CHECK ((type)::text = ANY((ARRAY [\'header\'::character varying, \'option\'::character varying, \'options-list\'::character varying, \'text\'::character varying])::text[]))');
    }
}
