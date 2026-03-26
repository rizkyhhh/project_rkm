<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        // CABANG
        DB::table('cabang')->insert([
            ['nama' => 'Bandung'],
            ['nama' => 'Garut'],
            ['nama' => 'Sukabumi'],
            ['nama' => 'Cianjur'],
        ]);

        // ORGANISASI
        DB::table('organisasi')->insert([
            ['nama' => 'Operasional'],
            ['nama' => 'Supporting'],
        ]);

        // LEVEL JABATAN
        DB::table('level_jabatan')->insert([
            ['nama' => 'Staff'],
            ['nama' => 'SPV'],
            ['nama' => 'Manager'],
            ['nama' => 'Direktur'],
        ]);

        // JABATAN
        DB::table('jabatan')->insert([
            ['nama' => 'Staff IT', 'parent_id' => null],
            ['nama' => 'SPV IT', 'parent_id' => null],
            ['nama' => 'Manager IT', 'parent_id' => null],
            ['nama' => 'Direktur Umum', 'parent_id' => null],
        ]);
    }
}
