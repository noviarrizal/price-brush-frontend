# PriceBrush — Frontend

> Quote any decorating job in 60 seconds. Just say it.

PriceBrush adalah web app (PWA, mobile-first) untuk painter & decorator di UK: jelaskan pekerjaan pakai suara atau teks, AI menyusun quote per item yang bisa diedit, kirim lewat WhatsApp atau PDF, lalu ubah jadi invoice dengan satu tap.

**Status:** tahap perencanaan. Belum ada kode.

## Ringkasan PRD

| | |
| --- | --- |
| Target user | Painter & decorator solo/berdua di UK, kerja dari HP |
| Masalah | Quote dikerjakan malam/weekend, template Word terlihat amatir, app yang ada mahal per user, ribet, sering crash |
| Solusi inti | Voice/teks → AI quote (bisa diedit) → link/PDF via WhatsApp → invoice satu tap |
| Positioning | No per-user fees. No sales calls. Cancel in one tap. |
| Target bisnis | Pembayaran pertama sebelum 31 Des 2026 (1–5 pelanggan) |
| Harga | Free (5 dokumen/bulan, watermark) · Pro £9/bulan atau £79/tahun · Founding Member £49 seumur hidup (50 orang) |
| Marketing utama | SEO lewat tool gratis: kalkulator cat, generator quote & invoice untuk decorator UK |

## Scope repo ini

- Halaman SEO + tool gratis (kalkulator cat, generator quote/invoice) — jalan penuh di browser
- App: login Google, profil bisnis, New quote (suara/teks), Review quote, Send sheet, daftar dokumen, invoice, Settings & upgrade
- Halaman quote publik untuk klien (+ tombol "Accept quote", P1)
- PDF dibuat di browser, autosave lokal (IndexedDB), PWA

## Rencana stack ($0)

React + Vite + TypeScript · Cloudflare Pages (`pricebrush.pages.dev`) · Supabase (auth Google, database) · react-pdf · Cloudflare Web Analytics + Google Search Console.

## Roadmap

1. **14–31 Okt 2026** — Tool gratis live (kalkulator cat, free quote PDF)
2. **1–21 Nov** — MVP berbayar (voice quote, invoice, checkout Polar)
3. **22–30 Nov** — Launch ke direktori & komunitas
4. **1 Des–31 Jan 2027** — Founding Member offer

## Dokumen

- PRD lengkap: [`docs/PRD.md`](docs/PRD.md)
- Versi online dengan diagram & mock-up: https://claude.ai/code/artifact/714b73e1-c4ed-44e9-b84e-4f11fb13d56f
- Backend: repo `price-brush-backend`
