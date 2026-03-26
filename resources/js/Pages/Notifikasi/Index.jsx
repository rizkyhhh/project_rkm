import AppLayout from "@/Layouts/AppLayout";
import axios from "axios";

export default function Notifikasi({ notifikasi }) {

  const markAllRead = () => {
    axios.post('/notifikasi/read-all').then(() => {
      window.location.reload();
    });
  };

  return (
    <AppLayout>
      <h2>Inbox Notifikasi</h2>

      <button onClick={markAllRead}>
        Tandai semua dibaca
      </button>

      {notifikasi.map(n => (
        <div key={n.id} style={{
          padding: 10,
          marginTop: 10,
          background: n.is_read ? "#eee" : "#cce5ff"
        }}>
          <strong>{n.judul}</strong>
          <p>{n.pesan}</p>
        </div>
      ))}
    </AppLayout>
  );
}