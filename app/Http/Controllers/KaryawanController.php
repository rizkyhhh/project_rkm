<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use App\Models\Cabang;
use App\Models\Organisasi;
use App\Models\Jabatan;
use App\Models\LevelJabatan;
use App\Services\KontrakService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class KaryawanController extends Controller
{
    public function index()
    {
        $karyawan = Karyawan::with(['cabang', 'organisasi', 'jabatan', 'levelJabatan'])
            ->where('id_user', Auth::id())
            ->get();

        return Inertia::render('Karyawan/Index', [
            'karyawan' => $karyawan
        ]);
    }

    public function create()
    {
        return Inertia::render('Karyawan/Create', [
            'cabang' => Cabang::all(),
            'organisasi' => Organisasi::all(),
            'jabatan' => Jabatan::all(),
            'level_jabatan' => LevelJabatan::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_lengkap' => 'required',
            'nomor_induk_karyawan' => 'required|unique:karyawan,nomor_induk_karyawan',
            'cabang_id' => 'required',
            'organisasi_id' => 'required',
            'jabatan_id' => 'required',
            'level_jabatan_id' => 'required',
            'tanggal_gabung' => 'required|date',
            'tanggal_mulai_kontrak' => 'required|date',
            'tanggal_akhir_kontrak' => 'required|date|after:tanggal_mulai_kontrak',
        ]);

        $data['id_user'] = Auth::id();

        Karyawan::create($data);

        return redirect('/karyawan');
    }

    public function edit($id)
    {
        $karyawan = Karyawan::where('id', $id)
            ->where('id_user', Auth::id())
            ->firstOrFail();

        return Inertia::render('Karyawan/Edit', [
            'karyawan' => $karyawan,
            'cabang' => Cabang::all(),
            'organisasi' => Organisasi::all(),
            'jabatan' => Jabatan::all(),
            'level_jabatan' => LevelJabatan::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $karyawan = Karyawan::where('id', $id)
            ->where('id_user', Auth::id())
            ->firstOrFail();

        $data = $request->validate([
            'nama_lengkap' => 'required',
            'nomor_induk_karyawan' => 'required|unique:karyawan,nomor_induk_karyawan,' . $id,
            'cabang_id' => 'required',
            'organisasi_id' => 'required',
            'jabatan_id' => 'required',
            'level_jabatan_id' => 'required',
            'tanggal_gabung' => 'required|date',
            'tanggal_mulai_kontrak' => 'required|date',
            'tanggal_akhir_kontrak' => 'required|date|after:tanggal_mulai_kontrak',
        ]);

        $karyawan->update($data);

        return redirect('/karyawan');
    }

    public function destroy($id)
    {
        $karyawan = Karyawan::where('id', $id)
            ->where('id_user', Auth::id())
            ->firstOrFail();

        $karyawan->delete();

        return redirect('/karyawan')->with('success', 'Data berhasil dihapus');
    }

    public function triggerKontrakDemo()
    {
        $karyawan = app(KontrakService::class)->checkKontrak30Hari();

        $result = $karyawan->map(function ($k) {
            $daysLeft = ceil(Carbon::now()->diffInDays($k->tanggal_akhir_kontrak));

            return [
                'nama' => $k->nama_lengkap,
                'tanggal_akhir_kontrak' => $k->tanggal_akhir_kontrak,
                'sisa_hari' => $daysLeft . ' hari'
            ];
        });

        return response()->json([
            'message' => 'Notifikasi demo berhasil dibuat',
            'total' => count($karyawan),
            'data' => $result
        ]);
    }
}