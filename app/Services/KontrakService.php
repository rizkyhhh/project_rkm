<?php

namespace App\Services;

use App\Models\Karyawan;
use Carbon\Carbon;
use App\Services\NotifikasiService;

class KontrakService
{
    // SCHEDULER (bulan depan tiap tanggal 1)
    public function checkKontrakBulanDepan()
    {
        $start = Carbon::now()->addMonth()->startOfMonth();
        $end = Carbon::now()->addMonth()->endOfMonth();

        $karyawan = Karyawan::whereBetween('tanggal_akhir_kontrak', [$start, $end])->get();

        foreach ($karyawan as $k) {
            NotifikasiService::sendUnique(
                $k->id_user,
                'Kontrak Akan Berakhir Bulan Depan',
                "Kontrak {$k->nama_lengkap} akan berakhir pada {$k->tanggal_akhir_kontrak}"
            );
        }

        return $karyawan;
    }

    // DEMO (30 hari)
    public function checkKontrak30Hari()
    {
        $start = Carbon::now();
        $end = Carbon::now()->addDays(30);

        $karyawan = Karyawan::whereBetween('tanggal_akhir_kontrak', [$start, $end])->get();

        foreach ($karyawan as $k) {
            NotifikasiService::sendUnique(
                $k->id_user,
                'Kontrak Akan Berakhir (30 Hari)',
                "Kontrak {$k->nama_lengkap} akan berakhir pada {$k->tanggal_akhir_kontrak}"
            );
        }

        return $karyawan;
    }
}