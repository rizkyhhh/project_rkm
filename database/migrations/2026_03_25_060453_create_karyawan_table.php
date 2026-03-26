<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('karyawan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->string('nomor_induk_karyawan');
            $table->text('alamat')->nullable();
            $table->foreignId('cabang_id')->constrained('cabang');
            $table->foreignId('organisasi_id')->constrained('organisasi');
            $table->foreignId('jabatan_id')->constrained('jabatan');
            $table->foreignId('level_jabatan_id')->constrained('level_jabatan');
            $table->foreignId('id_user')->constrained('users');
            $table->date('tanggal_gabung');
            $table->date('tanggal_mulai_kontrak');
            $table->date('tanggal_akhir_kontrak');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('karyawan');
    }
};
