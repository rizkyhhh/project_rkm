<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotifikasiController extends Controller
{
    public function index()
    {
        $notifikasi = Notifikasi::where('id_user', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Notifikasi/Index', [
            'notifikasi' => $notifikasi
        ]);
    }

    public function markAsRead($id)
    {
        $notif = Notifikasi::findOrFail($id);
        $notif->update(['is_read' => true]);

        return back();
    }

    public function count()
    {
        return response()->json([
            'total' => \App\Models\Notifikasi::where('id_user', auth()->id())
                ->where('is_read', false)
                ->count()
        ]);
    }

    public function markAllRead()
    {
        \App\Models\Notifikasi::where('id_user', auth()->id())
            ->update(['is_read' => true]);

        return response()->json(['message' => 'Semua sudah dibaca']);
    }
}