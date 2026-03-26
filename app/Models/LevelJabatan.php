<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LevelJabatan extends Model
{
    protected $table = 'level_jabatan';

    public function karyawan()
    {
        return $this->hasMany(\App\Models\Karyawan::class, 'id_level_jabatan');
    }
}
