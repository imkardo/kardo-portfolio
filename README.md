# Kardo Heidari — Portfolio

Bilingual (EN/FA, RTL) personal portfolio. Vite + React 19 + TypeScript + Tailwind CSS v4.
No backend required — content lives in code, browser overrides, and optionally Supabase.

- **Site:** `http://localhost:5173/#/` (English default, `فا` switcher in navbar for Persian)
- **Admin:** `http://localhost:5173/#/kh-8291-console` — hidden content editor (all sections, both languages)

## Quick start

```sh
npm install
npm run dev      # http://localhost:5173/
npm run build    # typecheck + production build → dist/
npm run preview  # serve the production build locally
```

Requires Node 20+. No other setup.

## Project layout

```
index.html            SEO meta, fonts, JSON-LD
public/               favicon.svg, og.jpg, robots.txt, sitemap.xml
src/main.tsx          entry → App
src/App.tsx           providers + HashRouter (site vs /admin)
src/components/       navbar, footer, logo, mockups, error boundary, sections/
src/data/             English content (11 files — the defaults)
src/data-fa/          Persian content (10 files — full translations)
src/lib/              i18n (EN/FA + dir), dict (UI strings), site-data (store),
                      supabase (lazy client), utils
src/pages/Admin.tsx   hidden admin panel (login + 13 editors)
supabase/schema.sql   optional backend: content + inquiries tables + RLS
```

## How content works

1. Defaults come from `src/data/*` (EN) and `src/data-fa/*` (FA).
2. Admin edits save to `localStorage` (`kardo-site-overrides-v3`) instantly.
3. If Supabase env vars are set, edits also sync to the `site_content` table
   (one row per language) and load from there on start. DB wins over local.

Edit code defaults directly, or use the admin panel and fine-tune wording there.

## Admin panel

Open `/#/kh-8291-console`. Local mode password: `Kardo.0707` (override with
`VITE_ADMIN_PASSWORD` in `.env`). With Supabase configured it uses
Supabase Auth instead — sign in as your admin email.

Tabs cover profile, projects, services, testimonials, stacks, gallery,
experience, skills, process, stats, nav/chips/terminal, inquiries, settings.
Use the **English | فارسی** toggle to edit each language. Settings offers
JSON export/import (validated) and reset-to-defaults (two-click confirm).

## Supabase (optional)

1. Create a free project at supabase.com.
2. SQL Editor → run `supabase/schema.sql` (tables + RLS; writes restricted to
   the admin email in the policy — update it if your address changes).
3. Authentication → Providers → Email → turn OFF "Allow new users to sign up",
   then add your admin user manually.
4. Copy URL + anon key to `.env` (see `.env.example`) and restart/redeploy.
5. Never commit `.env` (gitignored). Never use a service-role key client-side.

## Deploy (Vercel)

```sh
npm run build   # outputs dist/
```

Import the repo in Vercel (framework preset: Vite, output: `dist`).
`vercel.json` already sets security headers. Hash routing (`#/…`) works on any
static host with no rewrites needed.

**Domain:** SEO tags, `robots.txt`, and `sitemap.xml` use the placeholder
`https://kardo-portfolio.vercel.app/`. After deploying to your real domain,
search-replace it in `index.html`, `public/robots.txt`, `public/sitemap.xml`.

## Scripts

| Script                 | What                                                      |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Vite dev server (port 5173)                               |
| `npm run build`        | `tsc --noEmit` + production build                         |
| `npm run typecheck`    | TypeScript only                                           |
| `npm run lint`         | ESLint                                                    |
| `npm run format`       | Prettier write                                            |
| `npm run format:check` | Prettier check (CI)                                       |
| `npm run smoke`        | Static dist smoke test (no browser needed)                |
| `npm run test:e2e`     | Playwright browser smoke (needs `npx playwright install`) |
