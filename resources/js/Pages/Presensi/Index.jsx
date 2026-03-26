import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ presensi, karyawan, filter }) {
  const [tanggal, setTanggal] = useState(filter.tanggal || "");
  const [idKaryawan, setIdKaryawan] = useState(filter.id_karyawan || "");

  const handleFilter = (e) => {
    e.preventDefault();

    router.get("/presensi", {
      tanggal: tanggal,
      id_karyawan: idKaryawan,
    });
  };

  return (
    <div>
      <h1>Data Presensi</h1>
      <form onSubmit={handleFilter}>
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />

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

        <button type="submit">Filter</button>
      </form>

      <br />

      <a href="/presensi/create">Tambah Presensi</a>

      <ul>
        {presensi.map((item) => (
          <li key={item.id}>
            {item.karyawan?.nama_lengkap} - {item.tanggal} - {item.presensi_status}

            <a href={`/presensi/${item.id}/edit`}>Edit</a>

            <button onClick={() => {
              if (confirm("Yakin hapus?")) {
                router.delete(`/presensi/${item.id}`);
              }
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}