import AppLayout from "@/Layouts/AppLayout";
import Card from "@/Components/UI/Card";
import Button from "@/Components/UI/Button";
import axios from "axios";
import { useState } from "react";

export default function Notifikasi({ notifikasi }) {

  const [list, setList] = useState(notifikasi);

  const markAllRead = async () => {
    await axios.post("/notifikasi/read-all");

    setList(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const markAsRead = async (id) => {
    try {
      await axios.post(`/notifikasi/${id}/mark-as-read`);

      setList(prev =>
        prev.map(n =>
          n.id === id ? { ...n, is_read: true } : n
        )
      );

    } catch (e) {
      console.error(e);
    }
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
    <AppLayout
      title="Notifikasi"
      subtitle="Inbox notifikasi sistem"
    >
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Inbox</h2>

          <Button variant="warning" onClick={markAllRead}>
            Tandai semua dibaca
          </Button>
        </div>

        {/* EMPTY */}
        {list.length === 0 && (
          <Card>
            <p className="text-center text-gray-500 text-sm">
              Tidak ada notifikasi
            </p>
          </Card>
        )}

        {/* LIST */}
        <div className="space-y-3">

          {list.map((n) => (
            <Card
              key={n.id}
              className={`transition hover:shadow-md ${
                !n.is_read ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <div className={`p-3 rounded ${getTypeStyle(n.judul)}`}>

                {/* HEADER */}
                <div className="flex justify-between items-start gap-2">

                  <div>
                    <h4 className="font-semibold text-sm">
                      {n.judul}
                    </h4>

                    <p className="text-sm text-gray-600 mt-1">
                      {n.pesan}
                    </p>
                  </div>

                  <div className="text-right space-y-1">

                    <span className="text-xs text-gray-400 block">
                      {n.time}
                    </span>

                    {/* 🔥 BUTTON PER ITEM */}
                    {!n.is_read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Tandai dibaca
                      </button>
                    )}

                  </div>

                </div>

                {/* STATUS */}
                {!n.is_read && (
                  <span className="inline-block mt-2 text-xs text-blue-600 font-medium">
                    ● Belum dibaca
                  </span>
                )}

              </div>
            </Card>
          ))}

        </div>

      </div>
    </AppLayout>
  );
}