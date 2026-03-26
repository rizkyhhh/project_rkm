import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import { useForm } from "@inertiajs/react";

export default function Edit({
  karyawan,
  cabang,
  organisasi,
  jabatan,
  level_jabatan,
}) {
  const { data, setData, put, processing } = useForm({
    nama_lengkap: karyawan?.nama_lengkap || "",
    nomor_induk_karyawan: karyawan?.nomor_induk_karyawan || "",
    alamat: karyawan?.alamat || "",
    cabang_id: karyawan?.cabang_id || "",
    organisasi_id: karyawan?.organisasi_id || "",
    jabatan_id: karyawan?.jabatan_id || "",
    level_jabatan_id: karyawan?.level_jabatan_id || "",
    tanggal_gabung: karyawan?.tanggal_gabung || "",
    tanggal_mulai_kontrak: karyawan?.tanggal_mulai_kontrak || "",
    tanggal_akhir_kontrak: karyawan?.tanggal_akhir_kontrak || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.nama_lengkap || !data.nomor_induk_karyawan) {
      alert("Nama dan NIK wajib diisi");
      return;
    }

    if (!data.cabang_id || !data.jabatan_id) {
      alert("Lengkapi struktur organisasi");
      return;
    }

    if (!data.tanggal_mulai_kontrak || !data.tanggal_akhir_kontrak) {
      alert("Lengkapi tanggal kontrak");
      return;
    }

    put(`/karyawan/${karyawan.id}`);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <Card>
          <h2 className="text-lg font-semibold mb-2">Edit Karyawan</h2>
          <p className="text-xs text-gray-400 mb-6">
            Perbarui data karyawan
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* DATA UTAMA */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Data Utama
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Nama</label>
                  <input
                    className="w-full border rounded px-3 h-10 mt-1"
                    value={data.nama_lengkap}
                    onChange={(e) =>
                      setData("nama_lengkap", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm">NIK</label>
                  <input
                    className="w-full border rounded px-3 h-10 mt-1"
                    value={data.nomor_induk_karyawan}
                    onChange={(e) =>
                      setData("nomor_induk_karyawan", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* STRUKTUR */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Struktur Organisasi
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <select
                  className="border rounded px-3 h-10"
                  value={data.cabang_id}
                  onChange={(e) => setData("cabang_id", e.target.value)}
                >
                  <option value="">-- Pilih Cabang --</option>
                  {cabang.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nama}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded px-3 h-10"
                  value={data.organisasi_id}
                  onChange={(e) => setData("organisasi_id", e.target.value)}
                >
                  <option value="">-- Pilih Organisasi --</option>
                  {organisasi.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.nama}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded px-3 h-10"
                  value={data.jabatan_id}
                  onChange={(e) => setData("jabatan_id", e.target.value)}
                >
                  <option value="">-- Pilih Jabatan --</option>
                  {jabatan.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.nama}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded px-3 h-10"
                  value={data.level_jabatan_id}
                  onChange={(e) =>
                    setData("level_jabatan_id", e.target.value)
                  }
                >
                  <option value="">-- Pilih Level Jabatan --</option>
                  {level_jabatan.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.nama}
                    </option>
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
                Perbarui periode kontrak karyawan
              </p>

              <div className="grid grid-cols-3 gap-4">

                <div>
                  <label className="text-xs text-gray-500">
                    Tanggal Gabung
                  </label>
                  <input
                    type="date"
                    value={data.tanggal_gabung}
                    onChange={(e) =>
                      setData("tanggal_gabung", e.target.value)
                    }
                    className="w-full border rounded px-3 h-10 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Mulai Kontrak
                  </label>
                  <input
                    type="date"
                    value={data.tanggal_mulai_kontrak}
                    onChange={(e) =>
                      setData("tanggal_mulai_kontrak", e.target.value)
                    }
                    className="w-full border rounded px-3 h-10 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Akhir Kontrak
                  </label>
                  <input
                    type="date"
                    value={data.tanggal_akhir_kontrak}
                    onChange={(e) =>
                      setData("tanggal_akhir_kontrak", e.target.value)
                    }
                    className="w-full border rounded px-3 h-10 mt-1"
                  />
                </div>

              </div>
            </div>

            {/* ALAMAT */}
            <div>
              <label className="text-sm">Alamat</label>
              <textarea
                value={data.alamat}
                onChange={(e) => setData("alamat", e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            {/* BUTTON */}
            <div className="flex gap-2">
              <Button type="submit" disabled={processing}>
                {processing ? "Updating..." : "Update"}
              </Button>

              <a href="/karyawan">
                <Button variant="warning">Kembali</Button>
              </a>
            </div>

          </form>
        </Card>
      </div>
    </AppLayout>
  );
}