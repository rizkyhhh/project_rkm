import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

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
    <AppLayout
    title="Tambah Presensi"
  subtitle="Input kehadiran karyawan">
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Tambah Presensi</h1>
          <p className="text-sm text-gray-500">
            Input data kehadiran karyawan
          </p>
        </div>

        <Card className="shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* DATA PRESENSI */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                Data Presensi
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="label">Karyawan</label>
                  <select
                    value={data.id_karyawan}
                    onChange={(e) => setData("id_karyawan", e.target.value)}
                    className="input"
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
                  <label className="label">Status</label>
                  <select
                    value={data.presensi_status}
                    onChange={(e) => {
                      setData("presensi_status", e.target.value);

                      if (e.target.value !== "Hadir") {
                        setData("jam_masuk", "");
                        setData("jam_pulang", "");
                      }
                    }}
                    className="input"
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
                  <label className="label">Tanggal</label>
                  <input
                    type="date"
                    value={data.tanggal}
                    onChange={(e) => setData("tanggal", e.target.value)}
                    className="input"
                  />
                </div>

              </div>
            </div>

            {/* JAM */}
            {data.presensi_status === "Hadir" && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">
                  Waktu Kehadiran
                </h3>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="label">Jam Masuk</label>
                    <input
                      type="time"
                      min="06:00"
                      max="12:00"
                      value={data.jam_masuk}
                      onChange={(e) => setData("jam_masuk", e.target.value)}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Jam Pulang</label>
                    <input
                      type="time"
                      min="16:00"
                      max="21:00"
                      value={data.jam_pulang}
                      onChange={(e) => setData("jam_pulang", e.target.value)}
                      className="input"
                    />
                  </div>

                </div>
              </div>
            )}

            {/* BUTTON */}
            <div className="flex justify-end gap-3 pt-4">
              <Link href="/presensi">
                <Button variant="warning">Kembali</Button>
              </Link>

              <Button type="submit" disabled={processing}>
                {processing ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

          </form>
        </Card>

      </div>
    </AppLayout>
  );
}