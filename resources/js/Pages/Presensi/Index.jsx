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
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getBadgeType = (status) => {
    if (status === "Absen") return "danger";
    if (status === "Sakit" || status === "Cuti") return "warning";
    return "success";
  };

  const getApprovalBadge = (status) => {
    if (status === "pending") return "warning";
    if (status === "rejected") return "danger";
    return "success";
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.get(
        "/presensi",
        {
          tanggal,
          id_karyawan: idKaryawan,
        },
        {
          preserveState: true,
          replace: true,
        }
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [tanggal, idKaryawan]);

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">
          Data Presensi Karyawan
        </h1>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4 items-end">

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Filter Tanggal
            </label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="border rounded px-3 h-10 w-52"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Filter Karyawan
            </label>
            <select
              value={idKaryawan}
              onChange={(e) => setIdKaryawan(e.target.value)}
              className="border rounded px-3 h-10 w-64"
            >
              <option value="">Semua Karyawan</option>
              {karyawan.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.nama_lengkap}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="warning"
              onClick={() => {
                setTanggal("");
                setIdKaryawan("");
                router.get("/presensi", {}, { preserveState: true });
              }}
            >
              Reset Filter
            </Button>

            <a href="/presensi/create">
              <Button>+ Tambah Presensi</Button>
            </a>
          </div>

        </div>
      </Card>

      <div className="space-y-3 mt-4">
        {presensi.length === 0 && (
          <Card>
            <p className="text-center text-gray-500">
              Tidak ada data presensi
            </p>
          </Card>
        )}

        {presensi.map((item) => (
          <Card key={item.id}>
            <div className="flex justify-between items-center">

              <div>
                <h3 className="font-semibold">
                  {item.karyawan?.nama_lengkap}
                </h3>

                <p className="text-sm text-gray-500">
                  {formatDate(item.tanggal)}
                </p>

                <div className="mt-2 flex gap-2">
                  <Badge type={getBadgeType(item.presensi_status)}>
                    {item.presensi_status}
                  </Badge>

                  <Badge type={getApprovalBadge(item.approval_status)}>
                    {item.approval_status}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">

                <div className="text-xs text-gray-400">
                  #{item.id}
                </div>

                <div className="flex gap-2">

                  <a href={`/presensi/${item.id}/edit`}>
                    <Button variant="warning">Edit</Button>
                  </a>

                  {item.approval_status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          router.post(`/presensi/${item.id}/approve`)
                        }
                        className="bg-green-500 text-white text-xs px-2 py-1 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          router.post(`/presensi/${item.id}/reject`)
                        }
                        className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}

                </div>

              </div>

            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}