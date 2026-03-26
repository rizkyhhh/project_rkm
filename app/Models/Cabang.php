<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cabang extends Model
{
    protected $table = 'cabang';

    public function karyawan()
    {
        return $this->hasMany(\App\Models\Karyawan::class);
    }   
}
