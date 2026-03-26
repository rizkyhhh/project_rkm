<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\KontrakService;

class CheckKontrakKaryawan extends Command
{
    protected $signature = 'kontrak:check';
    protected $description = 'Cek kontrak karyawan bulan depan';

    public function handle()
    {
        app(KontrakService::class)->checkKontrakBulanDepan();

        $this->info('Cek kontrak bulan depan selesai');
    }
}
