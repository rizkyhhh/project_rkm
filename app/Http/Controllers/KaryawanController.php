<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use App\Models\Cabang;
use App\Models\Organisasi;
use App\Models\Jabatan;
use App\Models\LevelJabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KaryawanController extends Controller
{
    public function index()
    {
        $karyawan = Karyawan::with(['cabang', 'organisasi', 'jabatan', 'levelJabatan'])->get();

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
        'nomor_induk_karyawan' => 'required',
        'cabang_id' => 'required',
        'organisasi_id' => 'required',
        'jabatan_id' => 'required',
        'level_jabatan_id' => 'required',
        'tanggal_gabung' => 'required|date',
        'tanggal_mulai_kontrak' => 'required|date',
        'tanggal_akhir_kontrak' => 'required|date',
    ]);

        $data['id_user'] = Auth::id();
        Karyawan::create($data);

        return redirect('/karyawan');
    }

    public function edit($id)
    {
        $karyawan = \App\Models\Karyawan::findOrFail($id);

        return Inertia::render('Karyawan/Edit', [
            'karyawan' => $karyawan,
            'cabang' => \App\Models\Cabang::all(),
            'organisasi' => \App\Models\Organisasi::all(),
            'jabatan' => \App\Models\Jabatan::all(),
            'level_jabatan' => \App\Models\LevelJabatan::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'nama_lengkap' => 'required',
            'nomor_induk_karyawan' => 'required',
            'cabang_id' => 'required',
            'organisasi_id' => 'required',
            'jabatan_id' => 'required',
            'level_jabatan_id' => 'required',
            'tanggal_gabung' => 'required|date',
            'tanggal_mulai_kontrak' => 'required|date',
            'tanggal_akhir_kontrak' => 'required|date',
        ]);

        $karyawan = \App\Models\Karyawan::findOrFail($id);
        $karyawan->update($data);

        return redirect('/karyawan');
    }

    public function destroy($id)
    {
        $karyawan = \App\Models\Karyawan::findOrFail($id);
        
        $karyawan->delete();

        return redirect('/karyawan')->with('success', 'Data berhasil dihapus');
    }
}


