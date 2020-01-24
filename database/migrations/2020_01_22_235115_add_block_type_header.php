<?php

use App\Admin\Database\Models\Block;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use App\Admin\Contracts\Entities\BlockContract;
use Illuminate\Database\Migrations\Migration;
use League\Flysystem\NotSupportedException;

/**
 * Add new block "Header".
 */
class AddBlockTypeHeader extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE blocks DROP CONSTRAINT blocks_type_check');
        DB::statement('ALTER TABLE blocks ADD CHECK ((type)::text = ANY((ARRAY [\'header\'::character varying, \'option\'::character varying, \'options-list\'::character varying])::text[]))');
    }

    /**
     * @return void
     */
    public function down()
    {
        DB::statement('ALTER TABLE blocks DROP CONSTRAINT blocks_type_check');
        DB::statement('ALTER TABLE blocks ADD CHECK ((type)::text = ANY((ARRAY [\'option\'::character varying, \'options-list\'::character varying])::text[]))');
    }
}
