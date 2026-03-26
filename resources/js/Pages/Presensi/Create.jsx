import { useForm } from "@inertiajs/react";

export default function Create({ karyawan }) {
  const { data, setData, post } = useForm({
    id_karyawan: "",
    tanggal: "",
    jam_masuk: "",
    jam_pulang: "",
    presensi_status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/presensi");
  };

  return (
    <div>
      <h1>Tambah Presensi</h1>

      <form onSubmit={handleSubmit}>
        {/* Karyawan */}
        <select
          value={data.id_karyawan}
          onChange={(e) => setData("id_karyawan", e.target.value)}
        >
          <option value="">Pilih Karyawan</option>
          {karyawan.map((k) => (
            <option key={k.id} value={k.id}>
              {k.nama_lengkap}
            </option>
          ))}
        </select>

        <br />

        {/* Status */}
        <select
          value={data.presensi_status}
          onChange={(e) => setData("presensi_status", e.target.value)}
        >
          <option value="">Pilih Status</option>
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
          <option value="Cuti">Cuti</option>
          <option value="Libur">Libur</option>
        </select>

        <br />

        {/* Tanggal */}
        <input
          type="date"
          value={data.tanggal}
          onChange={(e) => setData("tanggal", e.target.value)}
        />

        <br />

        {/* Jam hanya muncul kalau hadir */}
        {data.presensi_status === "" && (
          <>
            <input
              type="time"
              value={data.jam_masuk}
              onChange={(e) => setData("jam_masuk", e.target.value)}
            />

            <br />

            <input
              type="time"
              value={data.jam_pulang}
              onChange={(e) => setData("jam_pulang", e.target.value)}
            />
          </>
        )}

        <br /><br />

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}