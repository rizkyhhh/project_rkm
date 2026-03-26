import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Index({ presensi, karyawan, filter }) {
  const [tanggal, setTanggal] = useState(filter.tanggal || "");
  const [idKaryawan, setIdKaryawan] = useState(filter.id_karyawan || "");

  // AUTO FILTER
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.get(
        "/presensi",
        {
          tanggal,
          id_karyawan: idKaryawan,
        },
        {
          preserveState: true,
          replace: true,
        }
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [tanggal, idKaryawan]);

  return (
    <div>
      <h1>Data Presensi</h1>

      {/* FILTER */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />

        <button
          onClick={() => {
            setTanggal("");
            setIdKaryawan("");

            router.get(
              "/presensi",
              {},
              {
                preserveState: true,
                replace: true,
              }
            );
          }}
        >
          Reset
        </button>

        <select
          value={idKaryawan}
          onChange={(e) => setIdKaryawan(e.target.value)}
        >
          <option value="">Semua Karyawan</option>
          {karyawan.map((k) => (
            <option key={k.id} value={k.id}>
              {k.nama_lengkap}
            </option>
          ))}
        </select>
      </div>

      <a href="/presensi/create">Tambah Presensi</a>

      <ul>
        {presensi.map((item) => {
          const isPending = item.approval_status === "pending";

          return (
            <li key={item.id}>
              <b>{item.karyawan?.nama_lengkap}</b> - {item.tanggal} -

              {/* STATUS */}
              {" "}
              {(() => {
                const status = item.presensi_status;

                // 🟡 PENDING
                if (item.approval_status === "pending") {
                  return (
                    <span style={{ color: "orange" }}>
                      {status} (Menunggu)
                    </span>
                  );
                }

                // 🔴 REJECT
                if (item.approval_status === "rejected") {
                  return <span style={{ color: "red" }}>Absen</span>;
                }

                // 🟢 APPROVED NON-HADIR
                if (["Izin", "Sakit", "Cuti"].includes(status)) {
                  return <span style={{ color: "green" }}>{status}</span>;
                }

                // 🟢 HADIR
                if (
                  ["Datang Awal", "Tepat Waktu", "Terlambat"].includes(status)
                ) {
                  return <span style={{ color: "green" }}>{status}</span>;
                }

                return <span>{status}</span>;
              })()}

              {/* ACTION */}
              {" | "}
              <a href={`/presensi/${item.id}/edit`}>Edit</a>

              <button
                onClick={() => {
                  if (confirm("Yakin hapus?")) {
                    router.delete(`/presensi/${item.id}`);
                  }
                }}
              >
                Delete
              </button>

              {/* APPROVAL */}
              {isPending && (
                <>
                  {" | "}
                  <button
                    onClick={() =>
                      router.post(`/presensi/${item.id}/approve`)
                    }
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      router.post(`/presensi/${item.id}/reject`)
                    }
                  >
                    Reject
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}