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
        $query = Presensi::with('karyawan');

        // filter tanggal
        if ($request->tanggal) {
            $query->whereDate('tanggal', $request->tanggal);
        }

        // filter karyawan
        if ($request->id_karyawan) {
            $query->where('id_karyawan', $request->id_karyawan);
        }

        return Inertia::render('Presensi/Index', [
            'presensi' => $query->get(),
            'karyawan' => Karyawan::all(),
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
            'jam_masuk' => 'required',
            'jam_pulang' => 'nullable',
            'presensi_status' => 'required'
        ]);

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
            'jam_masuk' => 'required',
            'jam_pulang' => 'nullable',
            'presensi_status' => 'required'
        ]);

        $presensi->update($data);

        return redirect('/presensi')->with('success', 'Presensi berhasil diupdate');
    }
   
}
