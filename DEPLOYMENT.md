# CROATOA.LIVE — Vercel deploy, domain cutover, SEO, integrations

This document covers deploying the standalone site in [`sites/croatoa-live`](./) to **Vercel** at **https://croatoa.live**, plus **Google Search Console**, **Bandsintown**, and **Spotify embed** notes.

## Vercel project setup

1. Push this repository to GitHub (same remote you already use).
2. In the [Vercel Dashboard](https://vercel.com) → **Add New…** → **Project** → **Import** this repo.
3. **Framework preset:** **Next.js** (auto-detected).
4. **Root Directory:** `sites/croatoa-live`  
   (Critical: do **not** use `.` — that builds the presave app at the repo root instead.)
5. **Build Command:** `npm run build` (default).
6. **Output:** Next default (`.next`).
7. **Install Command:** `npm install` (default).
8. Deploy once on a Vercel preview URL and verify the homepage, Spotify embed, and Bandsintown block.

### Fix: “No Next.js version detected”

Vercel only reads `package.json` in the **Root Directory** you set for the project. If Root Directory is empty or `.`, Vercel uses the repo root (the presave app) or may not find the band site’s `package.json`.

1. **Project → Settings → General → Root Directory** → **Edit**.
2. Enter exactly: `sites/croatoa-live` (no leading `/`, no trailing slash).
3. Confirm Vercel shows **Framework: Next.js** after saving (this folder’s [`package.json`](./package.json) includes `"next"` in `dependencies` and [`vercel.json`](./vercel.json) sets `"framework": "nextjs"`).
4. **Redeploy** (Deployments → … → Redeploy).

If you already attached `croatoa.live` to a project that was created with Root Directory `.`, change Root Directory as above, then redeploy — do not create a second project for the same domain.

**Import screen:** When importing the repo, click **Edit** next to Root Directory and select or type `sites/croatoa-live` *before* the first deploy.

### Environment variables (optional)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Full production URL with protocol, e.g. `https://croatoa.live`. Used for `metadataBase`, Open Graph URLs, and canonical behavior when not on Vercel’s auto URL. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console **HTML tag** verification string (content value only). Adds `<meta name="google-site-verification" …>` when set. |

### Point croatoa.live at this project (overwrite previous site)

1. In the **new** Vercel project → **Settings** → **Domains** → add `croatoa.live` and `www.croatoa.live` if you use both.
2. In the **old** Vercel project that previously served `croatoa.live` → **Domains** → **remove** `croatoa.live` (or reassign) so the domain is free to attach to the new project.
3. At your DNS host (often Vercel nameservers or your registrar), set records exactly as Vercel shows for the domain (usually **A** / **CNAME** to Vercel). Wait for SSL to show “Valid”.
4. Set `NEXT_PUBLIC_SITE_URL=https://croatoa.live` in **Production** env on the new project and redeploy.

**Rollback:** keep the old project without deleting it until the new site is verified live; you can temporarily move the domain back if needed.

---

## Google Search Console (SEO indexing)

No proprietary “Google integration” is required for ranking; **Search Console** is for measurement, indexing requests, and issue visibility.

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add a **Domain** property for `croatoa.live` (recommended) or a **URL prefix** property for `https://croatoa.live/`.
3. **Verify** using one of:
   - **DNS TXT** record (domain property), or  
   - **HTML tag**: copy the verification token into Vercel env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then click **Verify** in Search Console.
4. After deploy, submit **Sitemaps** → `https://croatoa.live/sitemap.xml`.
5. Use **URL Inspection** on the homepage and key URLs; request indexing if needed.
6. Optional: [Bing Webmaster Tools](https://www.bing.com/webmasters) — import from Google or add the site separately.

**Note:** Strong SEO also depends on **unique titles/descriptions**, **fast LCP**, **mobile UX**, **real backlinks**, and **consistent NAP-style signals** (band name + Wilmington, NC) across streaming profiles — the site already encodes that in copy and `MusicGroup` / `WebSite` JSON-LD.

---

## Bandsintown

### Events widget

The site loads the official widget script (`widget.bandsintown.com/main.min.js`) and a `bit-widget-initializer` anchor with `data-artist-name` matching [`lib/site-config.ts`](./lib/site-config.ts).

If your dashboard provides a **custom embed** (API key, different attributes, or `data-artist-id`), replace the anchor attributes in [`components/BandsintownEvents.tsx`](./components/BandsintownEvents.tsx) with the snippet from [Bandsintown artist tools](https://artists.bandsintown.com/artists/2609891/tools).

### Fan email list (managed in Bandsintown)

Bandsintown’s **fan mailing list** is configured in the artist tools UI, not invented on this server.

1. Open [artist tools](https://artists.bandsintown.com/artists/2609891/tools) while signed in as artist/manager.
2. Copy the **fan / email capture** embed (script + markup or iframe).
3. Paste into [`components/FanListEmbed.tsx`](./components/FanListEmbed.tsx) (see file header), or render via a safe pattern you control (e.g. env-driven HTML only if you trust the source).

The **Fan signal** section explains this on the site for visitors; implementation stays in your repo under your control.

---

## Spotify embed and “play counts”

The homepage embeds Spotify’s **official iframe** for the artist (`/embed/artist/…`). Streams are attributed by **Spotify’s own rules** (signed-in listener, valid playback session, etc.) — same class of playback as the Spotify app / web player. The site includes a short disclaimer next to the player.

---

## Local development (this subfolder only)

```bash
cd sites/croatoa-live
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Content sync

Bio and tracklist live in [`data/`](./data/) for a self-contained build. When you change repo-root `bio.txt` / `tracklist.txt`, mirror updates into `sites/croatoa-live/data/` (see [`data/README.md`](./data/README.md)).
