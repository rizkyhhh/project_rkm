import { useForm } from "@inertiajs/react";

export default function Edit({ presensi, karyawan }) {
  const { data, setData, put } = useForm({
    id_karyawan: presensi.id_karyawan,
    tanggal: presensi.tanggal,
    jam_masuk: presensi.jam_masuk || "",
    jam_pulang: presensi.jam_pulang || "",
    presensi_status: presensi.presensi_status,
  });

  const karyawanSelected = karyawan.find(
    (k) => k.id == data.id_karyawan
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.tanggal || !data.presensi_status) {
      alert("Lengkapi data");
      return;
    }

    if (data.presensi_status === "Hadir" && !data.jam_masuk) {
      alert("Jam masuk wajib diisi");
      return;
    }

    put(`/presensi/${presensi.id}`);
  };

  return (
    <div>
      <h1>Edit Presensi</h1>

      <form onSubmit={handleSubmit}>
        {/* KARYAWAN (READONLY) */}
        <div>
          <label>Karyawan:</label>
          <br />
          <b>{karyawanSelected?.nama_lengkap}</b>
        </div>

        <br />

        {/* STATUS */}
        <select
          value={data.presensi_status}
          onChange={(e) => {
            setData("presensi_status", e.target.value);

            if (e.target.value !== "Hadir") {
              setData("jam_masuk", "");
              setData("jam_pulang", "");
            }
          }}
        >
          <option value="">Pilih Status</option>
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
          <option value="Cuti">Cuti</option>
          <option value="Libur">Libur</option>
        </select>

        <br />

        {/* TANGGAL */}
        <input
          type="date"
          value={data.tanggal}
          onChange={(e) => setData("tanggal", e.target.value)}
        />

        <br />

        {/* JAM */}
        {data.presensi_status === "Hadir" && (
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
}