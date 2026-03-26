import { useForm } from "@inertiajs/react";

export default function Edit({ presensi, karyawan }) {
  const { data, setData, put } = useForm({
    id_karyawan: presensi.id_karyawan,
    tanggal: presensi.tanggal,
    jam_masuk: presensi.jam_masuk,
    jam_pulang: presensi.jam_pulang || "",
    presensi_status: presensi.presensi_status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/presensi/${presensi.id}`);
  };

  return (
    <div>
      <h1>Edit Presensi</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={data.id_karyawan}
          onChange={(e) => setData("id_karyawan", e.target.value)}
        >
          {karyawan.map((k) => (
            <option key={k.id} value={k.id}>
              {k.nama_lengkap}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={data.tanggal}
          onChange={(e) => setData("tanggal", e.target.value)}
        />

        <input
          type="time"
          value={data.jam_masuk}
          onChange={(e) => setData("jam_masuk", e.target.value)}
        />

        <input
          type="time"
          value={data.jam_pulang}
          onChange={(e) => setData("jam_pulang", e.target.value)}
        />

        <select
          value={data.presensi_status}
          onChange={(e) => setData("presensi_status", e.target.value)}
        >
          <option value="Tepat Waktu">Tepat Waktu</option>
          <option value="Terlambat">Terlambat</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}