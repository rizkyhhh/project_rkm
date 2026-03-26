import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import Badge from "@/Components/UI/Badge";
import { Link, router } from "@inertiajs/react";

export default function Index({ karyawan }) {

  const handleDelete = (id) => {
    if (confirm("Yakin hapus?")) {
      router.delete(`/karyawan/${id}`);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getKontrakInfo = (tanggal) => {
    const today = new Date();
    const end = new Date(tanggal);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    if (diff <= 0) {
      return <Badge type="danger">Kontrak Habis</Badge>;
    }
    if (diff <= 7) {
      return <Badge type="danger">Sisa Kontrak {diff} hari</Badge>;
    }

    if (diff <= 30) {
      return <Badge type="warning">Sisa Kontrak {diff} hari</Badge>;
    }

    return <Badge type="success">Sisa Kontrak {diff} hari</Badge>;
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-semibold">Data Karyawan</h1>

          <Link href="/karyawan/create">
            <Button>+ Tambah</Button>
          </Link>
        </div>

        {karyawan.length === 0 && (
          <Card>
            <p className="text-center text-gray-500">
              Belum ada data karyawan
            </p>
          </Card>
        )}

        <div className="space-y-3">
          {karyawan.map((item) => (
            <Card key={item.id}>
              <div className="flex justify-between items-center">

                <div>
                  <h3 className="font-semibold text-lg">
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
                    {item.level_jabatan?.nama ? ` • ${item.level_jabatan.nama}` : ""}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Gabung: {formatDate(item.tanggal_gabung)}
                  </p>

                  <p className="text-xs text-gray-400">
                    Kontrak: {formatDate(item.tanggal_mulai_kontrak)} → {formatDate(item.tanggal_akhir_kontrak)}
                  </p>

                  <div className="mt-2">
                    {getKontrakInfo(item.tanggal_akhir_kontrak)}
                  </div>
                </div>

                <div className="flex gap-2">
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

