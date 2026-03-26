<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $table = 'karyawan';

    protected $fillable = [
        'nama_lengkap',
        'nomor_induk_karyawan',
        'alamat',
        'cabang_id',
        'organisasi_id',
        'jabatan_id',
        'level_jabatan_id',
        'id_user',
        'tanggal_gabung',
        'tanggal_mulai_kontrak',
        'tanggal_akhir_kontrak',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'id_user');
    }

    public function cabang()
    {
        return $this->belongsTo(\App\Models\Cabang::class, 'cabang_id');
    }

    public function organisasi()
    {
        return $this->belongsTo(\App\Models\Organisasi::class, 'organisasi_id');
    }

    public function jabatan()
    {
        return $this->belongsTo(\App\Models\Jabatan::class, 'jabatan_id');
    }

    public function levelJabatan()
    {
        return $this->belongsTo(\App\Models\LevelJabatan::class, 'level_jabatan_id');
    }

    public function presensi()
    {
        return $this->hasMany(\App\Models\Presensi::class, 'id_karyawan');
    }
}
