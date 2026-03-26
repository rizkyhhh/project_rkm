import { router, Link, usePage } from "@inertiajs/react";

export default function Index({ karyawan }) {
  const { flash } = usePage().props;

  const handleDelete = (id) => {
    if (confirm("Yakin hapus data ini?")) {
      router.delete(`/karyawan/${id}`);
    }
  };

  return (
    <div>
      <h1>Data Karyawan</h1>

      {/* FLASH MESSAGE */}
      {flash?.success && (
        <div
          style={{
            background: "#d4edda",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {flash.success}
        </div>
      )}

      {/* BUTTON TAMBAH */}
      <Link href="/karyawan/create">Tambah Karyawan</Link>

      <ul>
        {karyawan.map((item) => (
          <li key={item.id}>
            {item.nama_lengkap} - {item.cabang?.nama}

            {" | "}

            <Link href={`/karyawan/${item.id}/edit`}>Edit</Link>

            {" | "}

            <button onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}