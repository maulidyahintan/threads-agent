// Validasi CSV output sebelum di-upload ke Buffer.
// Pakai: node scripts/validate.mjs accounts/syari/output/2026-W47.csv
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) { console.error("Pakai: node scripts/validate.mjs <file.csv>"); process.exit(1); }

// Parser CSV sederhana (mendukung tanda kutip & baris baru di dalam sel)
function parse(src) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (q) {
      if (c === '"' && src[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const rows = parse(readFileSync(file, "utf8"));
const header = rows.shift();
const expected = ["text", "image_url", "tags", "posting_time"];
const errors = [];
if (header.join() !== expected.join()) errors.push(`Header harus: ${expected.join(",")}`);

rows.forEach((r, i) => {
  const n = i + 2;
  if (r.every((c) => c.trim() === "")) { errors.push(`Baris ${n}: baris kosong (Buffer akan gagal)`); return; }
  const [text = "", img = "", , time = ""] = r;
  const len = [...text].length;
  if (!text.trim()) errors.push(`Baris ${n}: Text kosong`);
  if (len > 500) errors.push(`Baris ${n}: ${len} karakter (maks 500)`);
  const links = text.match(/https?:\/\/\S+/g) || [];
  if (links.length > 5) errors.push(`Baris ${n}: ${links.length} link (maks 5)`);
  if (/\{[^}]*\}|\[link[^\]]*\]|TODO|XXX/i.test(text)) errors.push(`Baris ${n}: masih ada placeholder`);
  if (img && !/^https?:\/\/\S+\.(jpe?g|png|webp)(\?\S*)?$/i.test(img)) errors.push(`Baris ${n}: Image URL harus link langsung ke file gambar`);
  if (time && !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(time)) errors.push(`Baris ${n}: Posting Time harus YYYY-MM-DD HH:MM`);
});

if (errors.length) { console.error(`❌ ${errors.length} masalah:\n- ` + errors.join("\n- ")); process.exit(1); }
console.log(`✅ ${rows.length} posting valid: ${file}`);
