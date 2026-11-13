# threads-affiliate

Konten mingguan untuk 2 akun Threads (fashion syar'i & anak) yang mempromosikan produk Shopee Affiliate. Posting dijadwalkan lewat Buffer bulk upload.

```
threads-affiliate/
  CLAUDE.md                      # aturan & alur kerja (dibaca Claude tiap run)
  prompts/                       # template posting, dipakai bersama kedua akun
    racun.md                     # 1 produk
    perbandingan.md              # 2–3 produk
    listicle.md                  # 3–5 produk (utas)
    konten-tanpa-link.md         # tips, polling, engagement
  accounts/
    syari/ | anak/
      brand.md                   # persona, gaya bahasa, do & don't
      products.csv               # produk + link affiliate + status
      performance.csv            # klik/komisi dari dashboard Shopee Affiliate
      output/YYYY-Www.csv        # batch mingguan siap upload ke Buffer
  scripts/validate.mjs           # cek CSV sebelum upload
```

## Cara pakai tiap minggu
1. `node scripts/validate.mjs accounts/syari/output/2026-W47.csv`
2. Buffer → channel Threads akun syar'i → Settings → Bulk Upload → upload CSV. Ulangi untuk akun anak.
3. Akhir minggu: salin data klik & komisi dari dashboard Shopee Affiliate ke `performance.csv`.

## Status produk (`products.csv`)
`baru` → `terjadwal` → `diposting` (atau `dilewati` kalau stok habis/ulasan jelek).
