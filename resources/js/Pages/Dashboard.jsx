import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";

export default function Dashboard({
  totalKaryawan,
  totalPresensi,
  hadir,
  izin,
  absen,
}) {
  return (
    <AppLayout
      title="Dashboard"
      subtitle="Ringkasan data karyawan dan presensi"
    >
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">

        {/* SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

          <Card className="text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Karyawan</p>
            <p className="text-3xl font-bold">{totalKaryawan}</p>
          </Card>

          <Card className="text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Presensi</p>
            <p className="text-3xl font-bold">{totalPresensi}</p>
          </Card>

          <Card className="text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Hadir</p>
            <p className="text-3xl font-bold text-green-600">{hadir}</p>
          </Card>

          {/* 🔥 TAMBAHAN */}
          <Card className="text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Izin</p>
            <p className="text-3xl font-bold text-blue-600">{izin}</p>
          </Card>

          <Card className="text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Absen</p>
            <p className="text-3xl font-bold text-red-600">{absen}</p>
          </Card>

        </div>

        {/* INFO */}
        <Card>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Informasi Sistem
          </h3>

          <p className="text-sm text-gray-500">
            Dashboard menampilkan ringkasan aktivitas karyawan dan presensi secara real-time.
          </p>
        </Card>

      </div>
    </AppLayout>
  );
}