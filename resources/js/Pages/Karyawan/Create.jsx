import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Create({ cabang, organisasi, jabatan, level_jabatan }) {

  function flattenJabatan(data, level = 0) {
    let result = [];

    data.forEach(item => {
      result.push({
        id: item.id,
        name: `${'-'.repeat(level)} ${item.nama}`
      });

      if (item.children) {
        result = result.concat(flattenJabatan(item.children, level + 1));
      }
    });

    return result;
  }

  const jabatanOptions = flattenJabatan(jabatan);

  const [form, setForm] = useState({
    nama_lengkap: "",
    nomor_induk_karyawan: "",
    alamat: "",
    cabang_id: "",
    organisasi_id: "",
    jabatan_id: "",
    level_jabatan_id: "",
    tanggal_gabung: "",
    tanggal_mulai_kontrak: "",
    tanggal_akhir_kontrak: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post("/karyawan", form);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tambah Karyawan</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>

        <label>Nama</label>
        <input
          value={form.nama_lengkap}
          onChange={(e) => setForm({ ...form, nama_lengkap: e.target.value })}
        />

        <label>NIK</label>
        <input
          value={form.nomor_induk_karyawan}
          onChange={(e) => setForm({ ...form, nomor_induk_karyawan: e.target.value })}
        />

        <label>Cabang</label>
        <select onChange={(e) => setForm({...form, cabang_id: e.target.value})}>
          <option value="">Pilih Cabang</option>
          {cabang.map(c => (
            <option key={c.id} value={c.id}>{c.nama}</option>
          ))}
        </select>

        <label>Organisasi</label>
        <select onChange={(e) => setForm({...form, organisasi_id: e.target.value})}>
          <option value="">Pilih Organisasi</option>
          {organisasi.map(o => (
            <option key={o.id} value={o.id}>{o.nama}</option>
          ))}
        </select>

        <label>Jabatan</label>
        <select onChange={(e) => setForm({...form, jabatan_id: e.target.value})}>
          <option value="">Pilih Jabatan</option>
          {jabatanOptions.map(j => (
            <option key={j.id} value={j.id}>
              {j.name}
            </option>
          ))}
        </select>

        <label>Level Jabatan</label>
        <select onChange={(e) => setForm({...form, level_jabatan_id: e.target.value})}>
          <option value="">Pilih Level</option>
          {level_jabatan.map(l => (
            <option key={l.id} value={l.id}>{l.nama}</option>
          ))}
        </select>

        <label>Tanggal Gabung</label>
        <input type="date" onChange={(e) => setForm({...form, tanggal_gabung: e.target.value})} />

        <label>Mulai Kontrak</label>
        <input type="date" onChange={(e) => setForm({...form, tanggal_mulai_kontrak: e.target.value})} />

        <label>Akhir Kontrak</label>
        <input type="date" onChange={(e) => setForm({...form, tanggal_akhir_kontrak: e.target.value})} />

        <button type="submit">Simpan</button>

      </form>
    </div>
  );
}