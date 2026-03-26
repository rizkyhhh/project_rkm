<?php


use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\PresensiController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

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

require __DIR__.'/auth.php';
