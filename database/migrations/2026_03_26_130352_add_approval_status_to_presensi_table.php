<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('presensi', function (Blueprint $table) {
            $table->string('approval_status')->default('approved');
        });
    }

    public function down()
    {
        Schema::table('presensi', function (Blueprint $table) {
            $table->dropColumn('approval_status');
        });
    }
};
