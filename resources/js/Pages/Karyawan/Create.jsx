import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Create({ cabang, organisasi, jabatan, level_jabatan }) {
  const [form, setForm] = useState({
    nama_lengkap: "",
    nomor_induk_karyawan: "",
    alamat: "",
    cabang_id: "",
    organisasi_id: "",
    jabatan_id: "",
    level_jabatan_id: "",
    id_user: 1,
    tanggal_gabung: "",
    tanggal_mulai_kontrak: "",
    tanggal_akhir_kontrak: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post("/karyawan", form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Tambah Karyawan</h1>

      <input placeholder="Nama" onChange={(e) => setForm({...form, nama_lengkap: e.target.value})} />

      <input placeholder="NIK" onChange={(e) => setForm({...form, nomor_induk_karyawan: e.target.value})} />

      <select onChange={(e) => setForm({...form, cabang_id: e.target.value})}>
        <option>Pilih Cabang</option>
        {cabang.map(c => (
          <option key={c.id} value={c.id}>{c.nama}</option>
        ))}
      </select>
      <select onChange={(e) => setForm({...form, organisasi_id: e.target.value})}>
        <option value="">Pilih Organisasi</option>
        {organisasi.map(o => (
            <option key={o.id} value={o.id}>{o.nama}</option>
        ))}
    </select>

    <select onChange={(e) => setForm({...form, jabatan_id: e.target.value})}>
  <option value="">Pilih Jabatan</option>
  {jabatan.map(j => (
    <option key={j.id} value={j.id}>{j.nama}</option>
  ))}
</select>

<select onChange={(e) => setForm({...form, level_jabatan_id: e.target.value})}>
  <option value="">Pilih Level Jabatan</option>
  {level_jabatan.map(l => (
    <option key={l.id} value={l.id}>{l.nama}</option>
  ))}
</select>

<input type="date" onChange={(e) => setForm({...form, tanggal_gabung: e.target.value})} />
<input type="date" onChange={(e) => setForm({...form, tanggal_mulai_kontrak: e.target.value})} />
<input type="date" onChange={(e) => setForm({...form, tanggal_akhir_kontrak: e.target.value})} />

      <button type="submit">Simpan</button>
    </form>
  );
}