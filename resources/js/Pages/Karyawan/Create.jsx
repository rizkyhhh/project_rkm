import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function Create({ cabang, organisasi, jabatan, level_jabatan }) {
  const { data, setData, post, processing } = useForm({
    nama_lengkap: "",
    nomor_induk_karyawan: "",
    cabang_id: "",
    organisasi_id: "",
    jabatan_id: "",
    level_jabatan_id: "",
    tanggal_gabung: "",
    tanggal_mulai_kontrak: "",
    tanggal_akhir_kontrak: "",
    alamat: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.nama_lengkap || !data.nomor_induk_karyawan) {
      alert("Nama dan NIK wajib diisi");
      return;
    }

    if (!data.cabang_id || !data.jabatan_id) {
      alert("Lengkapi data organisasi");
      return;
    }

    if (!data.tanggal_mulai_kontrak || !data.tanggal_akhir_kontrak) {
      alert("Lengkapi tanggal kontrak");
      return;
    }

    post("/karyawan");
  };

  return (
    <AppLayout
    title="Tambah Karyawan"
  subtitle="Tambah data karyawan baru">
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Tambah Data Karyawan</h1>
          <p className="text-sm text-gray-500">
            Masukkan data karyawan dengan lengkap
          </p>
        </div>

        <Card className="shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* DATA UTAMA */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                Data Utama
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="label">Nama</label>
                  <input
                    className="input"
                    placeholder="Nama lengkap"
                    value={data.nama_lengkap}
                    onChange={(e) => setData("nama_lengkap", e.target.value)}
                  />
                </div>

                <div>
                  <label className="label">NIK</label>
                  <input
                    className="input"
                    placeholder="Nomor induk karyawan"
                    value={data.nomor_induk_karyawan}
                    onChange={(e) => setData("nomor_induk_karyawan", e.target.value)}
                  />
                </div>

              </div>
            </div>

            {/* STRUKTUR */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                Struktur Organisasi
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

                <select
                  className="input"
                  value={data.cabang_id}
                  onChange={(e) => setData("cabang_id", parseInt(e.target.value))}
                >
                  <option value="">-- Pilih Cabang --</option>
                  {cabang.map(c => (
                    <option key={c.id} value={c.id}>{c.nama}</option>
                  ))}
                </select>

                <select
                  className="input"
                  value={data.organisasi_id}
                  onChange={(e) => setData("organisasi_id", parseInt(e.target.value))}
                >
                  <option value="">-- Pilih Organisasi --</option>
                  {organisasi.map(o => (
                    <option key={o.id} value={o.id}>{o.nama}</option>
                  ))}
                </select>

                <select
                  className="input"
                  value={data.jabatan_id}
                  onChange={(e) => setData("jabatan_id", parseInt(e.target.value))}
                >
                  <option value="">-- Pilih Jabatan --</option>
                  {jabatan.map(j => (
                    <option key={j.id} value={j.id}>{j.nama}</option>
                  ))}
                </select>

                <select
                  className="input"
                  value={data.level_jabatan_id}
                  onChange={(e) => setData("level_jabatan_id", parseInt(e.target.value))}
                >
                  <option value="">-- Pilih Level Jabatan --</option>
                  {level_jabatan.map(l => (
                    <option key={l.id} value={l.id}>{l.nama}</option>
                  ))}
                </select>

              </div>
            </div>

            {/* KONTRAK */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Informasi Kontrak
              </h3>

              <p className="text-xs text-gray-400 mb-3">
                Isi tanggal bergabung dan periode kontrak karyawan
              </p>

              <div className="grid md:grid-cols-3 gap-5">

                <div>
                  <label className="label">Tanggal Gabung</label>
                  <input
                    type="date"
                    className="input"
                    onChange={(e) => setData("tanggal_gabung", e.target.value)}
                  />
                </div>

                <div>
                  <label className="label">Mulai Kontrak</label>
                  <input
                    type="date"
                    className="input"
                    onChange={(e) => setData("tanggal_mulai_kontrak", e.target.value)}
                  />
                </div>

                <div>
                  <label className="label">Akhir Kontrak</label>
                  <input
                    type="date"
                    className="input"
                    onChange={(e) => setData("tanggal_akhir_kontrak", e.target.value)}
                  />
                </div>

              </div>

              <p className="text-xs text-gray-400 mt-2">
                Contoh: kontrak 1 tahun → 01/01/2025 sampai 31/12/2025
              </p>
            </div>

            {/* ALAMAT */}
            <div>
              <label className="label">Alamat</label>
              <textarea
                className="input h-24"
                placeholder="Alamat lengkap"
                onChange={(e) => setData("alamat", e.target.value)}
              />
            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-3 pt-4">
              <Link href="/karyawan">
                <Button variant="warning">Kembali</Button>
              </Link>

              <Button type="submit">
                {processing ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>

          </form>
        </Card>

      </div>
    </AppLayout>
  );
}