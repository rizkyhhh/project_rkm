<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Presensi;
use App\Models\Karyawan;
use App\Services\NotifikasiService;
use Inertia\Inertia;

class PresensiController extends Controller
{
    public function index(Request $request)
    {
        $query = Presensi::with('karyawan')
            ->whereHas('karyawan', function ($q) {
                $q->where('id_user', Auth::id());
            });

        if ($request->tanggal) {
            $query->whereDate('tanggal', $request->tanggal);
        }

        if ($request->id_karyawan) {
            $query->where('id_karyawan', $request->id_karyawan);
        }

        return Inertia::render('Presensi/Index', [
            'presensi' => $query
                ->orderByDesc('tanggal')
                ->orderByDesc('created_at')
                ->get(),

            'karyawan' => Karyawan::where('id_user', Auth::id())->get(),

            'filter' => $request->only(['tanggal', 'id_karyawan'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Presensi/Create', [
            'karyawan' => Karyawan::where('id_user', Auth::id())->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id_karyawan' => 'required',
            'tanggal' => 'required|date',
            'jam_masuk' => 'nullable',
            'jam_pulang' => 'nullable',
            'presensi_status' => 'required',
        ]);

        // 🔥 VALIDASI KEPEMILIKAN
        $karyawan = Karyawan::where('id', $data['id_karyawan'])
            ->where('id_user', Auth::id())
            ->firstOrFail();

        // LOGIC PRESENSI
        if ($data['presensi_status'] === 'Hadir') {

            $jamMasuk = Carbon::parse($data['jam_masuk']);

            $awal = Carbon::createFromTime(7, 30);
            $tepat = Carbon::createFromTime(8, 0);
            $batas = Carbon::createFromTime(9, 0);

            if ($jamMasuk->gt($batas)) {
                $data['presensi_status'] = 'Absen';
            } elseif ($jamMasuk->lt($awal)) {
                $data['presensi_status'] = 'Datang Awal';
            } elseif ($jamMasuk->lte($tepat)) {
                $data['presensi_status'] = 'Tepat Waktu';
            } else {
                $data['presensi_status'] = 'Terlambat';
            }

            $data['approval_status'] = 'approved';
        } 
        else if (in_array($data['presensi_status'], ['Izin', 'Sakit', 'Cuti'])) {
            $data['approval_status'] = 'pending';
            $data['jam_masuk'] = null;
            $data['jam_pulang'] = null;
        } 
        else {
            $data['approval_status'] = 'approved';
        }

        Presensi::create($data);

        return redirect('/presensi');
    }

    public function edit($id)
    {
        $presensi = Presensi::whereHas('karyawan', function ($q) {
            $q->where('id_user', Auth::id());
        })->findOrFail($id);

        return Inertia::render('Presensi/Edit', [
            'presensi' => $presensi,
            'karyawan' => Karyawan::where('id_user', Auth::id())->get()
        ]);
    }

    public function update(Request $request, $id)
    {
        $presensi = Presensi::whereHas('karyawan', function ($q) {
            $q->where('id_user', Auth::id());
        })->findOrFail($id);

        $data = $request->validate([
            'id_karyawan' => 'required',
            'tanggal' => 'required|date',
            'jam_masuk' => 'nullable',
            'jam_pulang' => 'nullable',
            'presensi_status' => 'required',
        ]);

        if ($data['presensi_status'] === 'Hadir') {

            $jamMasuk = Carbon::parse($data['jam_masuk']);

            $awal = Carbon::createFromTime(7, 30);
            $tepat = Carbon::createFromTime(8, 0);
            $batas = Carbon::createFromTime(9, 0);

            if ($jamMasuk->gt($batas)) {
                $data['presensi_status'] = 'Absen';
            } elseif ($jamMasuk->lt($awal)) {
                $data['presensi_status'] = 'Datang Awal';
            } elseif ($jamMasuk->lte($tepat)) {
                $data['presensi_status'] = 'Tepat Waktu';
            } else {
                $data['presensi_status'] = 'Terlambat';
            }

            $data['approval_status'] = 'approved';
        } 
        else if (in_array($data['presensi_status'], ['Izin', 'Sakit', 'Cuti'])) {
            $data['approval_status'] = 'pending';
            $data['jam_masuk'] = null;
            $data['jam_pulang'] = null;
        } 
        else {
            $data['approval_status'] = 'approved';
        }

        $presensi->update($data);

        return redirect('/presensi');
    }

    public function approve($id)
    {
        $presensi = Presensi::with('karyawan')
            ->whereHas('karyawan', function ($q) {
                $q->where('id_user', Auth::id());
            })
            ->findOrFail($id);

        $nama = $presensi->karyawan->nama_lengkap;
        $jenis = $presensi->presensi_status;
        $tanggal = Carbon::parse($presensi->tanggal)->translatedFormat('d F Y');

        $presensi->update([
            'approval_status' => 'approved'
        ]);

        NotifikasiService::send(
            $presensi->karyawan->id_user,
            'Presensi Disetujui',
            "Pengajuan {$nama} {$jenis} pada tanggal {$tanggal} disetujui"
        );

        return back();
    }

    public function reject($id)
    {
        $presensi = Presensi::with('karyawan')
            ->whereHas('karyawan', function ($q) {
                $q->where('id_user', Auth::id());
            })
            ->findOrFail($id);

        $nama = $presensi->karyawan->nama_lengkap;
        $jenis = $presensi->presensi_status;
        $tanggal = Carbon::parse($presensi->tanggal)->translatedFormat('d F Y');

        $presensi->update([
            'approval_status' => 'rejected',
            'presensi_status' => 'Absen'
        ]);

        NotifikasiService::send(
            $presensi->karyawan->id_user,
            'Presensi Ditolak',
            "Pengajuan {$nama} {$jenis} pada tanggal {$tanggal} ditolak"
        );

        return back();
    }

    public function destroy($id)
    {
        $presensi = Presensi::whereHas('karyawan', function ($q) {
            $q->where('id_user', Auth::id());
        })->findOrFail($id);

        $presensi->delete();

        return redirect('/presensi')->with('success', 'Presensi berhasil dihapus');
    }
}