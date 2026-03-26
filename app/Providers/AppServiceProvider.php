<?php

namespace App\Providers;

use Inertia\Inertia;
use App\Models\Notifikasi;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Carbon::setLocale('id');
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user()
                ];
            },

            'notifikasi' => function () {
                if (!Auth::check()) return [];

                return Notifikasi::where('id_user', Auth::id())
                    ->latest()
                    ->take(5) // ambil 5 terbaru
                    ->get();
            },

            'notifikasiUnread' => function () {
                if (!Auth::check()) return 0;

                return Notifikasi::where('id_user', Auth::id())
                    ->where('is_read', false)
                    ->count();
            }
    ]);
    }
    
}
