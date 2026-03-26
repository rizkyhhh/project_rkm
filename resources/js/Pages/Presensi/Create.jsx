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

    let status = "";

    if (data.jam_masuk > "08:00") {
        status = "Terlambat";
    } else {
        status = "Tepat Waktu";
    }

    post("/presensi", {
        data: {
        ...data,
        presensi_status: status,
        },
    });
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

        {/* Tanggal */}
        <input
          type="date"
          value={data.tanggal}
          onChange={(e) => setData("tanggal", e.target.value)}
        />

        <br />

        {/* Jam Masuk */}
        <input
          type="time"
          value={data.jam_masuk}
          onChange={(e) => setData("jam_masuk", e.target.value)}
        />

        <br />

        {/* Jam Pulang */}
        <input
          type="time"
          value={data.jam_pulang}
          onChange={(e) => setData("jam_pulang", e.target.value)}
        />

        <br />

        {/* Status */}
        <select
          value={data.presensi_status}
          onChange={(e) => setData("presensi_status", e.target.value)}
        >
        </select>

        <br /><br />

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}