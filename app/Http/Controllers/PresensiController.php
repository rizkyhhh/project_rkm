<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Presensi;
use App\Models\Karyawan;
use Inertia\Inertia;

class PresensiController extends Controller
{
    public function index(Request $request)
    {
        $tanggal = $request->tanggal ?? Carbon::today()->toDateString();

        $query = Presensi::with('karyawan');

        if ($request->tanggal) {
            $query->whereDate('tanggal', $request->tanggal);
        }

        if ($request->id_karyawan) {
            $query->where('id_karyawan', $request->id_karyawan);
        }

        $presensi = $query->get();

        $karyawan = Karyawan::all();

        $data = [];

        foreach ($karyawan as $k) {
            $found = $presensi->where('id_karyawan', $k->id)->first();

            if ($found) {
                $data[] = $found;
            } else {
                $data[] = (object)[
                    'id' => null,
                    'tanggal' => $tanggal,
                    'presensi_status' => 'Absen',
                    'jam_masuk' => null,
                    'jam_pulang' => null,
                    'karyawan' => $k
                ];
            }
        }
        return Inertia::render('Presensi/Index', [
            'presensi' => $data,
            'karyawan' => $karyawan,
            'filter' => $request->only('tanggal', 'id_karyawan')
        ]);
    }

    public function create()
    {
        return Inertia::render('Presensi/Create', [
            'karyawan' => Karyawan::all()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id_karyawan' => 'required',
            'tanggal' => 'required|date',
            'jam_masuk' => 'nullable',
            'jam_pulang' => 'nullable',
            'presensi_status' => 'nullable'
        ]);

        // DUPLICATE CHECK
        $exists = Presensi::where('id_karyawan', $data['id_karyawan'])
            ->whereDate('tanggal', $data['tanggal'])
            ->exists();

        if ($exists) {
            return back()->with('error', 'Presensi sudah ada di tanggal ini');
        }

        // VALIDASI JAM
        if ($data['jam_pulang'] && $data['jam_masuk'] && $data['jam_pulang'] < $data['jam_masuk']) {
            return back()->with('error', 'Jam pulang tidak valid');
        }

        // STATUS
         if ($data['presensi_status'] === 'Hadir') {

            if (!$data['jam_masuk']) {
                return back()->with('error', 'Jam masuk wajib diisi');
            }

            $jamMasuk = Carbon::parse($data['jam_masuk']);
            $batas = Carbon::createFromTime(8, 0); // jam 08:00

            if ($jamMasuk->gt($batas)) {
                $data['presensi_status'] = 'Terlambat';
            } else {
                $data['presensi_status'] = 'Tepat Waktu';
            }

        } else {
            // selain hadir → kosongkan jam
            $data['jam_masuk'] = null;
            $data['jam_pulang'] = null;
        }

        Presensi::create($data);

        return redirect('/presensi')->with('success', 'Berhasil tambah presensi');
    }

    public function edit($id)
    {
        return Inertia::render('Presensi/Edit', [
            'presensi' => Presensi::findOrFail($id),
            'karyawan' => Karyawan::all()
        ]);
    }

    public function update(Request $request, $id)
    {
        $presensi = Presensi::findOrFail($id);

        $data = $request->validate([
            'id_karyawan' => 'required',
            'tanggal' => 'required|date',
            'jam_masuk' => 'nullable',
            'jam_pulang' => 'nullable',
            'presensi_status' => 'nullable'
        ]);

        // VALIDASI JAM
        if ($data['jam_pulang'] && $data['jam_masuk'] && $data['jam_pulang'] < $data['jam_masuk']) {
            return back()->with('error', 'Jam pulang tidak valid');
        }

        // STATUS
         if ($data['presensi_status'] === 'Hadir') {

            if (!$data['jam_masuk']) {
                return back()->with('error', 'Jam masuk wajib diisi');
            }

            $jamMasuk = Carbon::parse($data['jam_masuk']);
            $batas = Carbon::createFromTime(8, 0); // jam 08:00

            if ($jamMasuk->gt($batas)) {
                $data['presensi_status'] = 'Terlambat';
            } else {
                $data['presensi_status'] = 'Tepat Waktu';
            }

        } else {
            // selain hadir → kosongkan jam
            $data['jam_masuk'] = null;
            $data['jam_pulang'] = null;
        }

        Presensi::create($data);

        return redirect('/presensi')->with('success', 'Presensi berhasil diupdate');
    }

    public function destroy($id)
    {
        $presensi = Presensi::findOrFail($id);
        $presensi->delete();

        return redirect('/presensi')->with('success', 'Presensi berhasil dihapus');
    }
   
}
