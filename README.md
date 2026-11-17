# Mufradat | Kamus Visual Bahasa Arab

Website edukasi statis untuk mempelajari kosakata bahasa Arab tentang lingkungan sekitar melalui ilustrasi, tulisan Arab berharakat, transliterasi, terjemahan, Text-to-Speech, dan kuis.

## Arsitektur
- **Frontend:** React + Vite
- **Styling:** CSS responsif
- **Data:** file JSON lokal
- **Audio:** Web Speech API (`speechSynthesis`), tanpa file audio dan tanpa layanan TTS eksternal
- **Penyimpanan favorit:** LocalStorage pada browser
- **Backend/database:** tidak digunakan
- **Deployment:** Vercel
- **Repository:** GitHub

Website ini memang dibuat sebagai static web app. Tidak memerlukan Supabase, server API, autentikasi, atau database.

## Menjalankan secara lokal
Pastikan Node.js versi LTS sudah terpasang.

```bash
npm install
npm run dev
```

Buka URL lokal yang diberikan Vite.

## Build dan preview produksi

```bash
npm run build
npm run preview
```

Folder hasil build adalah `dist`.

## Deploy ke Vercel
1. Ekstrak ZIP.
2. Buat repository baru di GitHub dan push seluruh isi folder project.
3. Di Vercel, pilih **Add New → Project**.
4. Import repository GitHub.
5. Pilih framework **Vite**.
6. Build command: `npm run build`.
7. Output directory: `dist`.
8. Klik **Deploy**.

## Mengubah kosakata
Edit `src/data/vocabulary.json`. Setiap kosakata memakai properti:
- `id`: ID unik
- `category`: nama kategori
- `arabic`: tulisan Arab berharakat
- `latin`: transliterasi
- `meaning`: arti bahasa Indonesia
- `emoji`: ilustrasi sementara
- `color`: variasi warna kartu
- `example`: contoh kalimat Arab
- `exampleMeaning`: terjemahan contoh

## Cara kerja Text-to-Speech
Aplikasi menggunakan Web Speech API dari browser. Saat tombol speaker ditekan, browser mencoba memilih suara dengan bahasa Arab (`ar-SA`). Ketersediaan dan kualitas suara bergantung pada browser, sistem operasi, dan voice pack yang terpasang pada perangkat. Tidak semua perangkat menyediakan suara Arab.

Untuk hasil yang lebih baik:
- Gunakan browser modern seperti Chrome atau Edge.
- Pastikan perangkat memiliki voice/language pack bahasa Arab jika suara Arab belum tersedia.
- Uji pelafalan pada beberapa perangkat sebelum dipakai sebagai materi ajar.

## Catatan materi
Periksa kembali harakat, transliterasi, dan contoh kalimat bersama pengajar bahasa Arab sebelum website digunakan sebagai bahan ajar resmi.
