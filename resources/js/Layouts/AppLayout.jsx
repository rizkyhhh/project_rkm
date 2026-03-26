import NotifBadge from "@/Components/NotifBadge";

export default function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: 200,
        background: "#1e293b",
        color: "white",
        padding: 20
      }}>
        <h3>Admin</h3>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href="/karyawan" style={{ color: "white" }}>Karyawan</a></li>
          <li><a href="/presensi" style={{ color: "white" }}>Presensi</a></li>
          <li><a href="/notifikasi" style={{ color: "white" }}>Notifikasi</a></li>
        </ul>
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1 }}>

        {/* NAVBAR */}
        <div style={{
          height: 60,
          background: "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: "1px solid #ddd"
        }}>
          <h3>Dashboard</h3>

          {/* 🔔 NOTIF BADGE */}
          <div style={{ cursor: "pointer" }}>
            <a href="/notifikasi">
              <NotifBadge />
            </a>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: 20 }}>
          {children}
        </div>

      </div>
    </div>
  );
}