<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSetPageEvent extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE events DROP CONSTRAINT events_type_check');
        DB::statement('ALTER TABLE events ADD CHECK ((type)::text = ANY((ARRAY [\'run\'::character varying, \'nextPage\'::character varying, \'prevPage\'::character varying, \'optionsListSelect\'::character varying, \'optionSelect\'::character varying, \'enterText\'::character varying, \'setPage\'::character varying])::text[]))');
    }

    /**
     * @return void
     */
    public function down()
    {
        DB::statement('ALTER TABLE events DROP CONSTRAINT events_type_check');
        DB::statement('ALTER TABLE events ADD CHECK ((type)::text = ANY((ARRAY [\'run\'::character varying, \'nextPage\'::character varying, \'prevPage\'::character varying, \'optionsListSelect\'::character varying, \'optionSelect\'::character varying, \'enterText\'::character varying])::text[]))');
    }
}
