import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Edit({ karyawan, cabang, organisasi, jabatan, level_jabatan }) {
  const [form, setForm] = useState({
    ...karyawan
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(`/karyawan/${karyawan.id}`, form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Karyawan</h1>

      <input
        value={form.nama_lengkap}
        onChange={(e) => setForm({...form, nama_lengkap: e.target.value})}
      />

      <select
        value={form.cabang_id}
        onChange={(e) => setForm({...form, cabang_id: e.target.value})}
      >
        {cabang.map(c => (
          <option key={c.id} value={c.id}>{c.nama}</option>
        ))}
      </select>

      <button type="submit">Update</button>
    </form>
  );
}