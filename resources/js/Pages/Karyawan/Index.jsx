import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import Badge from "@/Components/UI/Badge";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ karyawan }) {

  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    if (confirm("Yakin hapus data karyawan ini?")) {
      router.delete(`/karyawan/${id}`);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID");
  };

  const getKontrakInfo = (tanggal) => {
    const today = new Date();
    const end = new Date(tanggal);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    if (diff <= 0) {
      return <Badge type="danger">Kontrak Habis</Badge>;
    }
    if (diff <= 7) {
      return <Badge type="danger">Sisa {diff} hari</Badge>;
    }
    if (diff <= 30) {
      return <Badge type="warning">Sisa {diff} hari</Badge>;
    }

    return <Badge type="success">Sisa {diff} hari</Badge>;
  };

  // FILTER SEARCH
  const filtered = karyawan.filter((k) =>
    k.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
    k.nomor_induk_karyawan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout
    title="Karyawan"
    subtitle="Manajemen data karyawan">
      
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">
        

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Karyawan</h1>
            <p className="text-sm text-gray-500">
              Manajemen data karyawan
            </p>
          </div>

          <Link href="/karyawan/create">
            <Button>+ Tambah Karyawan</Button>
          </Link>
        </div>

        {/* SEARCH */}
        <Card>
          <input
            type="text"
            placeholder="Cari nama atau NIK..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-md px-4 h-11 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </Card>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <Card>
            <p className="text-center text-gray-500 text-sm">
              Tidak ada data karyawan
            </p>
          </Card>
        )}

        {/* LIST */}
        <div className="space-y-4">

          {filtered.map((item) => (
            <Card
              key={item.id}
              className="shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start gap-4">

                {/* LEFT */}
                <div className="space-y-1">

                  <h3 className="text-lg font-semibold">
                    {item.nama_lengkap}
                  </h3>

                  <p className="text-sm text-gray-500">
                    NIK: {item.nomor_induk_karyawan}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.cabang?.nama} • {item.organisasi?.nama}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.jabatan?.nama}
                    {item.level_jabatan?.nama && ` • ${item.level_jabatan.nama}`}
                  </p>

                  <div className="text-xs text-gray-400 pt-1 space-y-0.5">
                    <p>Gabung: {formatDate(item.tanggal_gabung)}</p>
                    <p>
                      Kontrak: {formatDate(item.tanggal_mulai_kontrak)} →{" "}
                      {formatDate(item.tanggal_akhir_kontrak)}
                    </p>
                  </div>

                  <div className="pt-2">
                    {getKontrakInfo(item.tanggal_akhir_kontrak)}
                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex gap-2 shrink-0">

                  <Link href={`/karyawan/${item.id}/edit`}>
                    <Button variant="warning">Edit</Button>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>

                </div>

              </div>
            </Card>
          ))}

        </div>

      </div>
    </AppLayout>
  );
}