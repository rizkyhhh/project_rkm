<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

    class Presensi extends Model
    {
        protected $table = 'presensi';

        protected $fillable = [
            'tanggal',
            'jam_masuk',
            'jam_pulang',
            'presensi_status',
            'id_karyawan',
            'approval_status',
        ];

        public function karyawan()
        {
            return $this->belongsTo(\App\Models\Karyawan::class, 'id_karyawan');
        }
}
