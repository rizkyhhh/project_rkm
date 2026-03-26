<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    protected $table = 'jabatan';

    public function parent()
    {
        return $this->belongsTo(Jabatan::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Jabatan::class, 'parent_id');
    }

    public function karyawan()
    {
        return $this->hasMany(\App\Models\Karyawan::class);
    }
}
