# Facebook personal profile: what to fill in (Sun 18/10, about 20 minutes)

Author: marketing lead · 18/10/2026 · Status: **ready to use** (founder sign-off 18/10/2026: personal profile, groups only) · Plan row: `../launch-plan.md` v0.5, week 1.

Sources: Meta's own Help Centre pages, rendered in local headless Chrome on 17/10/2026 (en-GB). Menu names change, so if a label differs on your screen, look for the nearest match. Labels I couldn't confirm on a Meta page are marked **not verified**.

> **Untuk Arif (ringkasnya):** Ini profil **pribadi** atas nama aslimu, bukan Page bisnis. Tujuannya cuma satu: bisa join grup decorator UK dan membaca. Isi seperlunya. Foto tanpa wajah, bio jujur, privasi ketat, dan 2FA wajib nyala. Umur akun tidak bisa dipercepat. Admin grup bisa menyaring berdasarkan umur akun, jadi buat **hari ini** (Minggu 18/10).

---

## 1. Sign up

> **Untuk Arif:** Nama harus nama yang kamu pakai sehari-hari dan ada di KTP/paspor. Jangan pakai "Arif PriceBrush" atau nama bisnis: Meta melarang kata atau frasa sebagai nama, dan profil hanya untuk perorangan.

| Field | Fill in | Why (source) |
|---|---|---|
| First name / Surname | `Arif` / `Noviarrizal` | "The name on your profile should be the name that your friends call you in everyday life. This name should also appear on a form of ID." Not allowed: "Words or phrases instead of a name", "Titles of any kind". "Profiles are for individual use only. You can create a Page for a business" ([Names allowed](https://www.facebook.com/help/229715077154790/)) |
| Email or mobile | `pricebrush.app@gmail.com` [opinion: it keeps every PriceBrush account in one mailbox you already check]. Use your own mobile number only if Facebook insists | Sign-up asks for "your name, email address or mobile phone number, password, date of birth and gender", then you "need to confirm your email address or mobile phone number" ([Create a profile](https://www.facebook.com/help/188157731232424/)) |
| Password | A new, unique password, kept in your password manager | — |
| Date of birth, gender | Your real ones | Same page |

Then confirm the email with the code Facebook sends. **Not verified:** whether a new account is also asked for a phone number or a selfie check. If it is, follow Facebook's own screens. Never use a third-party "account recovery" service.

---

## 2. Profile picture (no face)

> **Untuk Arif:** Foto profil **selalu publik**. Pakai foto asli jepretanmu sendiri, tanpa wajah. Saya **tidak** menyarankan foto kuas atau kaleng cat (beda dengan memo facebook-check): foto itu bisa membuat orang mengira kamu decorator, padahal bukan. Lebih jujur foto yang cocok dengan "software developer".

- [fact] "Your current profile picture and cover photo are public, so they can be seen by anyone on or off Facebook" ([Who can see your profile picture](https://www.facebook.com/help/193629617349922/)).
- **Use (pick one), a photo you took yourself:**
  1. Your desk from above: laptop (screen off, or showing only a code editor with nothing personal), a mug, a notebook. It says "developer" honestly.
  2. A landscape or street you photographed in Indonesia. It matches "based in Indonesia".
- **Don't use:**
  - the PriceBrush logo (a brand on a personal profile looks like a business account; profiles are "for individual use only");
  - a paint brush or tin (it can suggest you're in the trade);
  - a blank picture [opinion: looks like a fake account to admins];
  - stock photos or AI images.
- **How** ([Add or change your profile picture](https://www.facebook.com/help/163248423739693/)): click your profile picture (top right) → your profile name → the **camera** at the bottom right of your profile picture → upload → save.
- **Cover photo:** optional, and also public. Leave it empty, or use a second photo of the same kind.

---

## 3. Bio (the Intro section)

> **Untuk Arif:** Bio **selalu publik** dan jadi "disclosure" kamu di setiap grup: orang yang klik namamu langsung tahu kamu developer, bukan decorator. Pakai teks persis di bawah.

**Paste (91 characters):**

```
Software developer in Indonesia. Building PriceBrush, free pricing tools for UK decorators.
```

- [fact] "The Intro section of your profile is where you can add a bio… The information in the Intro section of your profile is always public" ([Intro section](https://www.facebook.com/help/1090724464274188/)).
- **How (Meta's steps):** click your profile picture (top right), then your name → in the **Intro** section below your profile picture, click **Edit details** (or the bio button) → type → **Save**.
- Length: a third-party guide says the bio is limited to 101 characters ([Adweek](https://www.adweek.com/performance-marketing/facebook-heres-how-to-add-a-bio-to-your-profile/), older guide, **not verified** on Meta's pages). The `facebook-check` version ("…for UK painters & decorators.") is 102 characters, which is why this one is shorter.
- **Leave empty:** current city, home town, workplace, school, relationship, family. PRD P2 says country only, no city. The bio already says Indonesia.

---

## 4. After the site is live (Sat 31/10, optional, 2 minutes)

> **Untuk Arif:** Setelah situs live dan cek F2 lolos, kamu boleh menambahkan alamat situs di detail profil. Jangan sebelum itu: alamat yang belum hidup terlihat mencurigakan.

- Add the website `https://pricebrush.co.uk` (or `https://pricebrush.pages.dev` if the domain slipped) in your profile's About / contact info, visible to **Public**. The exact menu label is **not verified**: Meta's page "Edit information on your Facebook profile and choose who can see it" covers it, but I didn't render it.

---

## 5. Privacy settings

> **Untuk Arif:** Tujuannya: orang asing tidak bisa menemukanmu lewat email atau nomor HP, tidak melihat daftar temanmu, dan post pribadimu (kalau ada) cuma untuk teman. **Jangan** pakai "Lock profile" walaupun tersedia: admin grup memeriksa profil pendaftar, dan profil terkunci yang baru dibuat terlihat seperti akun palsu (pendapat saya).

Start at: profile picture (top right) → **Settings and privacy** → **Settings** → **Audience and visibility**. Or use **Privacy Checkup** (Settings and privacy → Privacy Checkup), which covers the same items ([Privacy Checkup](https://www.facebook.com/help/443357099140264/)).

| Setting | Choose | Where (Meta's wording) |
|---|---|---|
| Who can send you friend requests? | **Friends of friends** | Audience and visibility → How people find and contact you → "Who can send you friend requests?" → Everyone or Friends of friends ([Meta](https://www.facebook.com/help/217125868312360/)) |
| Profile suggestions from your email address | **No one** | How people find and contact you → "People with your email address" → View. "By default, your setting is set to Possible connections" ([Meta](https://www.facebook.com/help/131297846947406/)) |
| Profile suggestions from your phone number | **No one** | Same page → "People with your phone number" → View |
| Who can see your email, phone number, birthday | **Only me** | Privacy Checkup → "Who can see what you share": "Choose who can see certain information on your profile, such as your phone number, email address, birthday" |
| Who can see your future posts | **Friends** | Privacy Checkup → "Control who can see your future and past posts"; or Audience and visibility → Posts ([Meta](https://www.facebook.com/help/167941163265974/)) |
| Who can see your friends list | **Only me** | Meta lists "Adjust who can see your Friends section on Facebook" (Help Centre search result; page not rendered, so **not verified**) |
| Profile review and tag review | **On** | Listed by Meta as privacy tools ([Lock your profile, "Other ways"](https://www.facebook.com/help/196419427651178/)) |
| Lock profile | **Don't** | "This feature isn't available everywhere… only in certain countries" (same page). Not using it is my opinion (see above) |

**Good to know [fact]:**
- Your name, profile picture, cover photo, gender, username and user ID are always public ([Meta](https://www.facebook.com/help/167941163265974/)).
- **Groups:**
  - In a **private** group, "Only current members can see what's shared in the group and who the members are".
  - In a **public** group, "Anyone on Facebook can see who's in the group" ([Public vs private groups](https://www.facebook.com/help/220336891328465/)).
  - "When you post or comment in a public group, your post or comment will be public and can be seen by anyone" ([Choose who can see your post](https://www.facebook.com/help/120939471321735/)). Write every group comment as if it were public.

---

## 6. Two-factor authentication (required)

> **Untuk Arif:** Wajib. Akun baru yang dibajak = grup hilang semua. Pakai **aplikasi authenticator** (Google Authenticator atau Microsoft Authenticator di HP), bukan SMS. Simpan 10 kode cadangan di password manager atau kertas, jangan di folder yang di-sync ke cloud.

Meta's steps ([How two-factor authentication works](https://www.facebook.com/help/148233965247823/)):

1. Click your profile picture in the top right, then click **Settings and privacy**.
2. Click **Settings**.
3. Click **Accounts Centre**, then click **Password and security**. (Meta: "You may see either Accounts Centre or Meta Account settings.")
4. Click **Two-factor authentication**, then click your account.
5. Choose **Authentication app** and follow the on-screen steps: scan the QR code in the app, then type the 6-digit code.
6. Get your **10 recovery login codes** ("You can get 10 recovery login codes to use when you're unable to use your phone") and store them offline.
7. When asked, **save this browser** on your own laptop only. Meta: "Don't click Save this browser if you're using a public computer."

Meta's three methods: a security key, "login codes from a third-party authentication app", or "text message (SMS) codes". Also turn on **login alerts** (Privacy Checkup → "How to keep your account secure": "Turn on alerts… if someone logs in… from a place that we don't recognise").

---

## 7. What not to do (ever, on this profile)

> **Untuk Arif:** Ini aturan supaya akun tidak kena blokir. Meta bisa menonaktifkan akun karena "advertising, promoting" lewat pesan, tanpa peringatan dulu.

- No **Page** and no **ads account** on this profile (no Meta ads in 2026). A restriction on ads can take the profile, and the groups, with it (`../facebook-check-2026-10-18.md` B1).
- No friend requests to strangers. Meta: "You should send friend requests on Facebook to people you know in real life" ([Meta](https://www.facebook.com/help/240436879374301/), search-result summary).
- No DMs to group members. The only message allowed is the one admin question on 15/11 (`facebook-join-answers.md` §2). Meta lists "Contacting other people for the purpose of… advertising, promoting" as a reason to suspend or disable an account (`../facebook-check-2026-10-18.md` A2).
- No posts on your own timeline about PriceBrush. They aren't needed, and they make the profile look like an advert.

## Done when

- [ ] Name = your everyday name; no-face photo you took; the bio pasted exactly.
- [ ] Friend requests: Friends of friends. Email and phone suggestions: No one. Contact info: Only me. Friends list: Only me. Future posts: Friends.
- [ ] Two-factor authentication on with an authenticator app; 10 recovery codes stored offline; login alerts on.
- [ ] Date created written in the local rules log. It decides the "account ≥ 4 weeks old" check on 21/11.
