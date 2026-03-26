<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organisasi extends Model
{
    protected $table = 'organisasi';

    public function karyawan()
    {
        return $this->hasMany(\App\Models\Karyawan::class);
    }
}
