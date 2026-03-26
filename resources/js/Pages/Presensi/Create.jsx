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

    if (!data.id_karyawan || !data.tanggal || !data.presensi_status) {
      alert("Lengkapi data terlebih dahulu");
      return;
    }

    if (data.presensi_status === "Hadir" && !data.jam_masuk) {
      alert("Jam masuk wajib diisi untuk hadir");
      return;
    }

    post("/presensi");
  };

  return (
    <div>
      <h1>Tambah Presensi</h1>

      <form onSubmit={handleSubmit}>
        {/* KARYAWAN */}
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

        {/* STATUS */}
        <select
          value={data.presensi_status}
          onChange={(e) => {
            setData("presensi_status", e.target.value);

            // reset jam kalau bukan hadir
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

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}