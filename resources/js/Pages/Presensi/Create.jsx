import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import { useForm } from "@inertiajs/react";

export default function Create({ karyawan }) {
  const { data, setData, post, processing } = useForm({
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

    if (data.presensi_status === "Hadir") {
      if (!data.jam_masuk) {
        alert("Jam masuk wajib diisi");
        return;
      }

      if (data.jam_masuk < "06:00" || data.jam_masuk > "12:00") {
        alert("Jam masuk hanya boleh antara 06:00 - 12:00");
        return;
      }

      if (data.jam_pulang && (data.jam_pulang < "16:00" || data.jam_pulang > "21:00")) {
        alert("Jam pulang hanya boleh antara 16:00 - 21:00");
        return;
      }

      if (data.jam_masuk > "09:00") {
        setData("presensi_status", "Absen");
      }
    }

    post("/presensi");
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Tambah Presensi</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <div className="col-span-2">
              <label className="block text-sm mb-1">Karyawan</label>
              <select
                value={data.id_karyawan}
                onChange={(e) => setData("id_karyawan", e.target.value)}
                className="w-full border rounded px-3 h-10"
              >
                <option value="">Pilih Karyawan</option>
                {karyawan.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nama_lengkap}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Status</label>
              <select
                value={data.presensi_status}
                onChange={(e) => {
                  setData("presensi_status", e.target.value);

                  if (e.target.value !== "Hadir") {
                    setData("jam_masuk", "");
                    setData("jam_pulang", "");
                  }
                }}
                className="w-full border rounded px-3 h-10"
              >
                <option value="">Pilih Status</option>
                <option value="Hadir">Hadir</option>
                <option value="Izin">Izin</option>
                <option value="Sakit">Sakit</option>
                <option value="Cuti">Cuti</option>
                <option value="Libur">Libur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Tanggal</label>
              <input
                type="date"
                value={data.tanggal}
                onChange={(e) => setData("tanggal", e.target.value)}
                className="w-full border rounded px-3 h-10"
              />
            </div>

            {data.presensi_status === "Hadir" && (
              <>
                <div>
                  <label className="block text-sm mb-1">Jam Masuk</label>
                  <input
                    type="time"
                    min="06:00"
                    max="12:00"
                    value={data.jam_masuk}
                    onChange={(e) => setData("jam_masuk", e.target.value)}
                    className="w-full border rounded px-3 h-10"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Jam Pulang</label>
                  <input
                    type="time"
                    min="16:00"
                    max="21:00"
                    value={data.jam_pulang}
                    onChange={(e) => setData("jam_pulang", e.target.value)}
                    className="w-full border rounded px-3 h-10"
                  />
                </div>
              </>
            )}

            <div className="col-span-2 flex gap-2 mt-2">
              <Button type="submit" disabled={processing}>
                {processing ? "Menyimpan..." : "Simpan"}
              </Button>

              <a href="/presensi">
                <Button variant="warning">Kembali</Button>
              </a>
            </div>

          </form>
        </Card>
      </div>
    </AppLayout>
  );
}