# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

A Shopify agency directory built on Next.js 16 (App Router), React 19, TypeScript 5, and Tailwind CSS v4. Users can browse, filter, and contact Shopify agencies. Data is stored in Supabase (PostgreSQL).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS v4 (PostCSS plugin — no tailwind.config.js needed)
- **Database:** Supabase (PostgreSQL + RLS)
- **Auth:** Custom HMAC cookie session (middleware.ts) — no third-party auth lib
- **Linting:** ESLint 9 (flat config)

## Common Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## Project Structure

```
app/
  layout.tsx                    # Root layout — site-wide SEO metadata
  page.tsx                      # Homepage — hero search, featured agencies
  sitemap.ts                    # Auto-generated sitemap.xml
  robots.ts                     # robots.txt
  agencies/
    page.tsx                    # Directory listing with sidebar filters
    [slug]/
      page.tsx                  # Agency profile page (dynamic route)
  admin/
    page.tsx                    # Admin dashboard (password protected)
    login/
      page.tsx                  # Admin login page
  get-matched/
    page.tsx                    # Lead capture / Get Matched page
  actions/
    agencies.ts                 # Server Actions: upsertAgency, deleteAgency, toggleStatus
    admin-auth.ts               # Server Actions: adminLogin, adminLogout
    leads.ts                    # Server Action: submitLead
  components/
    HeroSearch.tsx              # Client-side hero search bar with popular chips
    LeadForm.tsx                # Contact / Get Matched form (useActionState)
    AgencyForm.tsx              # Admin add/edit agency form
    AdminAgencyRow.tsx          # Admin list row with edit/delete/publish buttons
    AddAgencyModal.tsx          # Modal wrapper for AgencyForm
    AdminLogoutButton.tsx       # Sign-out button for admin nav
lib/
  seo.ts                        # SEO utilities: generateAgencyMetadata, generateAgencyJsonLd
  supabase.ts                   # Supabase client + typed query helpers (Agency, Lead types)
middleware.ts                   # Protects /admin/* routes via HMAC cookie check
.env.local                      # Env vars (not committed)
SUPABASE-SCHEMA.sql             # Run in Supabase SQL Editor to create tables + RLS
scripts/
  seed-agencies.sql             # Run in Supabase SQL Editor to seed 15+ agencies
  seed-agencies.js              # Node script (requires service role key to bypass RLS)
public/                         # Static assets
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # change to real domain on deploy
ADMIN_PASSWORD=changeme123                   # CHANGE THIS before deploying!
ADMIN_SECRET=<random 32-byte hex string>     # used to sign session cookies
```

## Database (Supabase)

Tables: `agencies`, `leads`, `reviews`. Row Level Security is enabled.
- Public can **read** published agencies and approved reviews
- Public can **insert** leads (contact form)
- Admin writes (insert/update/delete agencies) must be done via Supabase SQL Editor
  because the anon key cannot bypass RLS

**To set up:** Paste `SUPABASE-SCHEMA.sql` into Supabase → SQL Editor → Run.
**To seed 15 agencies:** Paste `scripts/seed-agencies.sql` into Supabase → SQL Editor → Run.

## Admin Authentication

- Middleware (`middleware.ts`) intercepts all `/admin/*` requests
- Checks for a signed HMAC cookie (`admin_session`)
- Unauthenticated requests redirect to `/admin/login`
- Login verifies `ADMIN_PASSWORD` env var, sets a 7-day httpOnly cookie
- Cookie signed with `ADMIN_SECRET` to prevent forgery
- No third-party library — pure Next.js + Node `crypto`

## Conventions

- Use the `app/` directory (App Router) — never `pages/`
- Path alias `@/*` maps to the project root
- TypeScript strict mode — avoid `any`
- Prefer **Server Components** by default; add `"use client"` only when needed
- SEO: every page should export `metadata` or `generateMetadata`
- Agency slugs are URL-safe, lowercase, hyphen-separated (e.g. `elite-shopify-partners`)
- Server Actions live in `app/actions/` — one file per domain
- Shared UI components live in `app/components/`
