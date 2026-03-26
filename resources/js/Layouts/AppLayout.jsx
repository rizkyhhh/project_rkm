import { useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";

function NotifDropdown() {
  const { notifikasi: initialNotif, notifikasiUnread: initialUnread } = usePage().props;

  const [notifList, setNotifList] = useState(initialNotif);
  const [unreadCount, setUnreadCount] = useState(initialUnread);
  const [open, setOpen] = useState(false);

  const handleRead = async (id) => {
    try {
      await axios.post(`/notifikasi/${id}/mark-as-read`);

      setNotifList((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, is_read: true } : n
        )
      );

      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative text-xl">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-1 rounded text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded p-3 z-50">
          <h4 className="font-semibold mb-2">Notifikasi</h4>

          {notifList.length === 0 && (
            <p className="text-sm text-gray-500">Tidak ada</p>
          )}

          {notifList.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (!n.is_read) handleRead(n.id);
              }}
              className={`p-2 rounded mb-2 cursor-pointer hover:bg-gray-200 ${
                n.is_read
                  ? "bg-gray-100"
                  : "bg-blue-50 border-l-4 border-blue-500"
              }`}
            >
              <p className="font-medium text-sm">{n.judul}</p>
              <p className="text-xs text-gray-600">{n.pesan}</p>
            </div>
          ))}

          <a href="/notifikasi" className="text-blue-600 text-sm">
            Lihat semua
          </a>
        </div>
      )}
    </div>
  );
}

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-800 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-2">
          <a href="/karyawan" className="block hover:bg-slate-700 p-2 rounded">
            Karyawan
          </a>
          <a href="/presensi" className="block hover:bg-slate-700 p-2 rounded">
            Presensi
          </a>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1">

        {/* NAVBAR */}
        <header className="bg-white shadow px-6 h-16 flex items-center justify-between">
          <h1 className="font-semibold text-lg">Dashboard</h1>
          <NotifDropdown />
        </header>

        {/* CONTENT */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}