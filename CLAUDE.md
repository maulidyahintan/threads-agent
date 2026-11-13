# threads-affiliate — konteks untuk Claude

Repo ini mengelola konten 2 akun Threads milik Intan yang mempromosikan produk lewat **Shopee Affiliate** (1 akun Shopee Affiliate untuk keduanya).

| Akun | Threads | Folder | Niche |
|---|---|---|---|
| Syar'i | @kianay.aqila | `accounts/syari/` | Fashion syar'i: gamis, abaya, khimar, kaos kaki, inner, outfit syar'i |
| Anak | @kenzi.abqori | `accounts/anak/` | Fashion anak, mainan, buku anak, perlengkapan bayi & balita |

Kedua akun sudah tersambung ke Buffer (paket Free, 2/3 channel, timezone Jakarta). Paket Free: maks 10 posting terjadwal per channel.

## Aturan main (wajib)
- **Hanya posting di akun sendiri.** Tidak ada komen massal/otomatis berisi link di postingan orang lain. Itu spam, melanggar aturan Threads & Shopee Affiliate, dan bikin akun di-ban.
- Membalas pertanyaan orang ("rekomendasi gamis dong") boleh, tapi **manual oleh Intan**, satu per satu, dan harus benar-benar menjawab.
- Volume wajar: 1–3 posting/hari per akun. Akun baru: minggu pertama lebih banyak konten tanpa link (pemanasan).
- Rasio konten: ±60% konten bermanfaat/obrolan, ±40% konten produk berlink.
- Jujur: jangan klaim sudah memakai produk kalau belum. Pakai "lagi aku incar", "reviewnya bagus", "terjual 10rb+".
- Cantumkan penanda affiliate di bio (mis. "link = affiliate, komisi kecil buat aku 🙏").
- Batas Threads: 500 karakter/posting, maks 5 link/posting.

## Alur mingguan
1. Baca `accounts/<akun>/brand.md`, `products.csv`, `performance.csv`.
2. Riset produk di Shopee lewat Chrome (Intan sudah login): cek rating ≥4.8, terjual tinggi, harga, ulasan. Untuk link affiliate, buat di dashboard Shopee Affiliate (affiliate.shopee.co.id) → custom link.
3. Tambah produk baru ke `products.csv` (status `baru`). Jangan pakai produk yang sudah `diposting` dalam 30 hari terakhir.
4. Tulis batch posting pakai template di `prompts/` → simpan `accounts/<akun>/output/YYYY-Www.csv`.
5. Jalankan `node scripts/validate.mjs accounts/<akun>/output/YYYY-Www.csv`.
6. Update status produk jadi `terjadwal`, commit, kirim ringkasan ke Intan.

## Format output (Buffer Bulk Upload)
Kolom wajib (sesuai template Buffer): `text,image_url,tags,posting_time`. Tags harus sudah ada di Buffer, jadi biarkan kosong. Waktu `YYYY-MM-DD HH:MM` (WIB, sesuaikan timezone channel di Buffer).
- 1 file CSV = 1 channel Buffer (upload terpisah per akun).
- Tanpa baris kosong. Image URL harus URL publik langsung ke file gambar, atau kosongkan dan tambahkan gambar di Buffer.
- Bulk upload tidak mendukung "first comment", jadi link affiliate ditaruh di dalam Text.
- Jangan pernah tulis placeholder (mis. `{LINK}`) di output. Posting yang belum lengkap tidak boleh masuk CSV.

## Jadwal posting default (WIB)
- Syar'i: 11:30, 19:30 (+ 20:30 opsional)
- Anak: 12:30, 20:00 (+ 21:00 opsional, jam ibu-ibu santai setelah anak tidur)
