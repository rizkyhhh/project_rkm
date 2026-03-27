<?php


use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\PresensiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PHPUnit\Metadata\Test;
use App\Models\Karyawan;
use App\Models\Presensi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/auth/google', [GoogleController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleController::class, 'callback']);

Route::post('/logout', function (Request $request) {
    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/login');
})->name('logout');


Route::get('/dashboard', function () {
    $hadirStatuses = ['Hadir', 'Tepat Waktu', 'Datang Awal', 'Terlambat'];
    $izinStatuses = ['Izin', 'Sakit', 'Cuti'];
    return Inertia::render('Dashboard', [
        'totalKaryawan' => Karyawan::count(),
        'totalPresensi' => Presensi::count(),
        'hadir' => Presensi::whereIn('presensi_status', $hadirStatuses)->count(),
        'izin' => Presensi::whereIn('presensi_status', $izinStatuses)->count(),
        'absen' => Presensi::where('presensi_status', 'Absen')->count(),
    ]);
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/karyawan', [KaryawanController::class, 'index']);
    Route::get('/karyawan/create', [KaryawanController::class, 'create']);
    Route::post('/karyawan', [KaryawanController::class, 'store']);
    Route::get('/karyawan/{id}/edit', [KaryawanController::class, 'edit']);
    Route::put('/karyawan/{id}', [KaryawanController::class, 'update']);
    Route::delete('/karyawan/{id}', [KaryawanController::class, 'destroy']);

    Route::get('/presensi', [PresensiController::class, 'index']);
    Route::get('/presensi/create', [PresensiController::class, 'create']);
    Route::post('/presensi', [PresensiController::class, 'store']);
    Route::get('/presensi/{id}/edit', [PresensiController::class, 'edit']);
    Route::put('/presensi/{id}', [PresensiController::class, 'update']);
    Route::delete('/presensi/{id}', [PresensiController::class, 'destroy']);
    Route::post('/presensi/{id}/approve', [PresensiController::class, 'approve']);
    Route::post('/presensi/{id}/reject', [PresensiController::class, 'reject']);

    Route::get('/notifikasi', [NotifikasiController::class, 'index']);
    Route::post('/notifikasi/{id}/mark-as-read', [NotifikasiController::class, 'markAsRead']);
    Route::get('/notifikasi/count', [NotifikasiController::class, 'count']);
    Route::post('/notifikasi/read-all', [NotifikasiController::class, 'markAllRead']);
});


    

    // test route untuk trigger kontrak demo
    Route::get('/trigger-kontrak-demo', [KaryawanController::class, 'triggerKontrakDemo']);

require __DIR__.'/auth.php';
