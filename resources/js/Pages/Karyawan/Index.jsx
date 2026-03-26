import { router, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ karyawan }) {
  const { flash } = usePage().props;
  const { notifikasi, notifikasiUnread } = usePage().props;
  const handleDelete = (id) => {
    if (confirm("Yakin hapus data ini?")) {
      router.delete(`/karyawan/${id}`);
    }
  };

  return (
    <AppLayout>
      <h1>Data Karyawan</h1>

      {/* FLASH MESSAGE */}
      {flash?.success && (
        <div
          style={{
            background: "#d4edda",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {flash.success}
        </div>
      )}

      {/* BUTTON TAMBAH */}
      <Link
        href="/karyawan/create"
        style={{
          display: "inline-block",
          marginBottom: 10,
          background: "#2563eb",
          color: "white",
          padding: "6px 12px",
          borderRadius: 5,
          textDecoration: "none",
        }}
      >
        + Tambah Karyawan
      </Link>
      
        {/* NOTIFIKASI */}
      <div style={{ marginBottom: 20 }}>
        <strong>🔔 Notifikasi ({notifikasiUnread})</strong>

        <div style={{
          border: "1px solid #ddd",
          padding: 10,
          borderRadius: 5,
          marginTop: 5,
          maxWidth: 400
        }}>
          {notifikasi.length === 0 && <p>Tidak ada notifikasi</p>}

          {notifikasi.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <b>{item.judul}</b>
              <br />
              <small>{item.pesan}</small>

              {!item.is_read && (
                <>
                  {" "}
                  <button
                    onClick={() => router.post(`/notifikasi/${item.id}/read`)}
                    style={{ marginLeft: 5 }}
                  >
                    ✔
                  </button>
                </>
              )}

              <hr />
            </div>
          ))}

          <Link href="/notifikasi">Lihat Semua</Link>
        </div>
      </div>
      {/* LIST DATA */}
      <div style={{ marginTop: 10 }}>
        {karyawan.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginBottom: 8,
              borderRadius: 5,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{item.nama_lengkap}</strong>
              <br />
              <small>{item.cabang?.nama}</small>
            </div>

            <div>
              <Link
                href={`/karyawan/${item.id}/edit`}
                style={{ marginRight: 10 }}
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  color: "white",
                  background: "red",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: 5,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}