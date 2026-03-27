# HR Management System

Aplikasi admin sederhana untuk mengelola data karyawan dan presensi.  
Dibangun menggunakan Laravel, React (Inertia.js), dan MySQL.

---

## Cara Menjalankan

### 1. Clone Project

git clone https://github.com/username/nama-repo.git
cd nama-repo

---

### 2. Install Dependency

composer install
npm install

---

### 3. Setup Environment

cp .env.example .env

Edit bagian database:

DB_DATABASE=db_project_rizky  
DB_USERNAME=root  
DB_PASSWORD=

---

### 4. Generate Key

php artisan key:generate

---

### 5. Import Database

- Buat database: db_project_rizky  
- Import file: db_project_rizky.sql  

Database sudah berisi data, jadi bisa langsung digunakan tanpa setup tambahan.

---

### 6. Jalankan Aplikasi

php artisan serve  
npm run dev  

Akses di browser:  
http://localhost:8000

---

## Akun Login

Gunakan akun berikut:

Email    : rizky@gmail.com  
Password : 12345678  

Akun ini sudah memiliki data karyawan, presensi, dan notifikasi.

---

## Fitur

### Karyawan
- CRUD karyawan  
- Relasi cabang, organisasi, jabatan, level jabatan  
- Informasi kontrak + indikator sisa kontrak  

### Presensi
- Input presensi  
- Status:
  - Datang Awal  
  - Tepat Waktu  
  - Terlambat  
  - Absen  
  - Izin  
  - Sakit  
  - Cuti  
  - Libur  

- Filter berdasarkan tanggal & karyawan  

### Logic Presensi
- Jam masuk menentukan status otomatis  
- Izin / sakit / cuti akan masuk ke status pending  

### Approval
- Approve / reject presensi  
- Update status otomatis  

### Notifikasi
- Dropdown notifikasi di navbar  
- Halaman inbox  
- Tandai dibaca (per item & semua)  

### Dashboard
- Total karyawan  
- Total presensi  
- Hadir, izin, absen  

---

## Catatan

Login Google (OAuth) tersedia, namun perlu konfigurasi di file .env:

GOOGLE_CLIENT_ID=  
GOOGLE_CLIENT_SECRET=  
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback  

Jika tidak dikonfigurasi, gunakan akun dummy di atas.

---

## Penutup

Project ini dibuat untuk memenuhi studi kasus Fullstack Developer.  
Fokus pada fungsionalitas, logika sistem, dan tampilan yang rapi.
