import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import axios from "axios";

export default function Notifikasi({ notifikasi }) {

  const markAllRead = async () => {
    await axios.post('/notifikasi/read-all');
    window.location.reload();
  };

  const getTypeStyle = (judul) => {
    if (judul.includes("Ditolak")) {
      return "border-l-4 border-red-500 bg-red-50";
    }
    if (judul.includes("Disetujui")) {
      return "border-l-4 border-green-500 bg-green-50";
    }
    return "border-l-4 border-gray-300 bg-gray-50";
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Inbox Notifikasi</h2>

        <Button variant="warning" onClick={markAllRead}>
          Tandai semua dibaca
        </Button>
      </div>

      {notifikasi.length === 0 && (
        <Card>
          <p className="text-center text-gray-500">
            Tidak ada notifikasi
          </p>
        </Card>
      )}

      <div className="space-y-3">
        {notifikasi.map(n => (
          <Card key={n.id}>
            <div className={`p-3 rounded ${getTypeStyle(n.judul)} ${!n.is_read ? "shadow-md" : ""}`}>

              {/* HEADER */}
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">
                  {n.judul}
                </h4>

                <span className="text-xs text-gray-500">
                  {n.time}
                </span>
              </div>

              {/* BODY */}
              <p className="text-sm text-gray-600 mt-1">
                {n.pesan}
              </p>

              {/* UNREAD INDICATOR */}
              {!n.is_read && (
                <div className="mt-2 text-xs text-blue-600 font-medium">
                  Belum dibaca
                </div>
              )}

            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}