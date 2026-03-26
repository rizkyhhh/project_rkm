<?php

namespace App\Services;

use App\Models\Notifikasi;
use App\Jobs\SendNotifikasiJob;

class NotifikasiService
{
    public static function send($userId, $judul, $pesan)
    {
        return Notifikasi::create([
            'id_user' => $userId,
            'judul' => $judul,
            'pesan' => $pesan,
            'is_read' => false
        ]);
    }

    public static function sendUnique($userId, $judul, $pesan)
    {
        SendNotifikasiJob::dispatch($userId, $judul, $pesan);
    }
}