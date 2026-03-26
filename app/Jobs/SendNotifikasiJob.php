<?php

namespace App\Jobs;

use App\Models\Notifikasi;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendNotifikasiJob implements ShouldQueue
{
    use Queueable;

    protected $userId;
    protected $judul;
    protected $pesan;

    public function __construct($userId, $judul, $pesan)
    {
        $this->userId = $userId;
        $this->judul = $judul;
        $this->pesan = $pesan;
    }

    public function handle()
    {
        Notifikasi::firstOrCreate(
            [
                'id_user' => $this->userId,
                'pesan' => $this->pesan,
            ],
            [
                'judul' => $this->judul,
                'is_read' => false
            ]
        );
    }
}