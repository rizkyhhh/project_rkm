import { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import axios from "axios";

function NotifDropdown() {
  const { notifikasi: initialNotif, notifikasiUnread: initialUnread } = usePage().props;

  const [notifList, setNotifList] = useState(initialNotif);
  const [unreadCount, setUnreadCount] = useState(initialUnread);
  const [open, setOpen] = useState(false);

  const handleRead = async (id) => {
    await axios.post(`/notifikasi/${id}/mark-as-read`);

    setNotifList(prev =>
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    );

    setUnreadCount(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative text-xl">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-1.5 rounded-full text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-3 z-50">
          <h4 className="font-semibold mb-2">Notifikasi</h4>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {notifList.length === 0 && (
              <p className="text-sm text-gray-500 text-center">Tidak ada</p>
            )}

            {notifList.map((n) => (
              <div
                key={n.id}
                onClick={() => !n.is_read && handleRead(n.id)}
                className={`p-2 rounded cursor-pointer ${
                  n.is_read
                    ? "bg-gray-100"
                    : "bg-blue-50 border-l-4 border-blue-500"
                }`}
              >
                <p className="text-sm font-medium">{n.judul}</p>
                <p className="text-xs text-gray-600">{n.pesan}</p>
              </div>
            ))}
          </div>

          <Link href="/notifikasi" className="block text-center text-blue-600 text-sm mt-2">
            Lihat semua
          </Link>
        </div>
      )}
    </div>
  );
}

export default function AppLayout({ children, title = "Dashboard", subtitle = "" }) {
  const { url, props } = usePage();
  const user = props.auth?.user;

  const menu = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Karyawan", href: "/karyawan" },
    { name: "Presensi", href: "/presensi" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-800 text-white p-5">
        <h2 className="text-xl font-bold mb-6">HR System</h2>

        <nav className="space-y-2">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`block p-2 rounded ${
                url.startsWith(m.href)
                  ? "bg-slate-700"
                  : "hover:bg-slate-700"
              }`}
            >
              {m.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <header className="bg-white shadow px-6 h-16 flex items-center justify-between">

          {/* TITLE */}
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            <NotifDropdown />

            {/* USER */}
            <div className="flex items-center gap-3 border-l pl-4">

              {/* AVATAR */}
              <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>

                <button
                  onClick={() => router.post("/logout")}
                  className="text-xs text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>

            </div>

          </div>

        </header>

        {/* CONTENT */}
        <main className="p-6">{children}</main>

      </div>
    </div>
  );
}