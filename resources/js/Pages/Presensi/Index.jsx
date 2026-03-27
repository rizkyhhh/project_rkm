import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import Badge from "@/Components/UI/Badge";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Index({ presensi, karyawan, filter }) {
  const [tanggal, setTanggal] = useState(filter.tanggal || "");
  const [idKaryawan, setIdKaryawan] = useState(filter.id_karyawan || "");

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID");
  };

  const getBadgeType = (status) => {
    if (status === "Absen") return "danger";
    if (status === "Sakit" || status === "Cuti") return "info";
    return "success";
  };

  const getApprovalBadge = (status) => {
    if (status === "pending") return "warning";
    if (status === "rejected") return "danger";
    return "success";
  };

  // 🔥 STATUS GROUPING
  const hadirStatuses = ["Hadir", "Tepat Waktu", "Datang Awal", "Terlambat"];
  const izinStatuses = ["Sakit", "Cuti", "Izin"];
  const absenStatuses = ["Absen"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.get(
        "/presensi",
        { tanggal, id_karyawan: idKaryawan },
        { preserveState: true, replace: true }
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [tanggal, idKaryawan]);

  return (
    <AppLayout
    title="Presensi"
  subtitle="Monitoring kehadiran karyawan">
      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Presensi</h1>
          <p className="text-sm text-gray-500">
            Monitoring kehadiran karyawan
          </p>
        </div>

        {/* SUMMARY */}
        <Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <div>
              <p className="text-sm text-gray-500">Hadir</p>
              <p className="text-3xl font-bold text-green-600">
                {presensi.filter(p => hadirStatuses.includes(p.presensi_status)).length}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Izin</p>
              <p className="text-3xl font-bold text-blue-600">
                {presensi.filter(p => izinStatuses.includes(p.presensi_status)).length}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Absen</p>
              <p className="text-3xl font-bold text-red-600">
                {presensi.filter(p => absenStatuses.includes(p.presensi_status)).length}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">
                {presensi.filter(p => p.approval_status === "pending").length}
              </p>
            </div>

          </div>
        </Card>

        {/* FILTER */}
        <Card>
          <div className="flex flex-wrap gap-6 items-end justify-between">

            <div className="flex gap-6 flex-wrap">

              <div className="flex flex-col min-w-[180px]">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="border rounded-md px-4 h-11 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col min-w-[220px]">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Karyawan
                </label>
                <select
                  value={idKaryawan}
                  onChange={(e) => setIdKaryawan(e.target.value)}
                  className="border rounded-md px-4 h-11 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Karyawan</option>
                  {karyawan.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama_lengkap}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="flex gap-3">
              <Button
                variant="warning"
                onClick={() => {
                  setTanggal("");
                  setIdKaryawan("");
                  router.get("/presensi", {}, { preserveState: true });
                }}
              >
                Reset
              </Button>

              <a href="/presensi/create">
                <Button>+ Presensi</Button>
              </a>
            </div>

          </div>
        </Card>

        {/* LIST */}
        <div className="space-y-5 mt-6">

          {presensi.length === 0 && (
            <Card>
              <p className="text-center text-gray-500 text-sm">
                Tidak ada data presensi
              </p>
            </Card>
          )}

          {presensi.map((item) => (
            <Card key={item.id} className="shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">

                {/* LEFT */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">
                    {item.karyawan?.nama_lengkap}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {formatDate(item.tanggal)}
                  </p>

                  <div className="flex gap-2 pt-1">
                    <Badge type={getBadgeType(item.presensi_status)}>
                      {item.presensi_status}
                    </Badge>

                    <Badge type={getApprovalBadge(item.approval_status)}>
                      {item.approval_status}
                    </Badge>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">

                  {item.approval_status === "pending" && (
                    <>
                      <Button
                        variant="success"
                        onClick={() => router.post(`/presensi/${item.id}/approve`)}
                      >
                        Approve
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => router.post(`/presensi/${item.id}/reject`)}
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  <Button
                    variant="warning"
                    onClick={() => router.visit(`/presensi/${item.id}/edit`)}
                  >
                    Edit
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