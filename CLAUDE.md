# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The import above is load-bearing: this is **Next.js 16** with React 19 and the App Router. APIs and conventions differ from older Next.js. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.

## Commands

```bash
npm run dev     # start dev server (http://localhost:3000)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (flat config, eslint.config.mjs, extends next/core-web-vitals + next/typescript)
```

There is no test runner configured. `@/*` resolves to `./src/*` (tsconfig paths).

## Architecture

Single-page portfolio. `src/app/page.tsx` composes the whole site by importing
section components and feeding them slices of `portfolioData`, all wrapped in
`<GlassmorphismScene>` (the animated background layer — pure CSS keyframe
animations on `position: fixed` decorative shapes; there is no three.js/WebGL,
the only runtime deps are `next`, `react`, `react-dom`).

Code is organized as **feature modules** under `src/modules/`, with cross-cutting
UI in `src/shared/` and routing/entrypoints in `src/app/`:

- `modules/portfolio/` — the page content and the contact feature
- `modules/glassmorphism/` — the visual background scene + standalone `/glassmorphism` hero page; exposes a public API via `index.ts` barrel
- `shared/components/layout/` — `Header`, `Footer`

### Data-driven content (dependency inversion)
`modules/portfolio/data/portfolioData.ts` is the single source of truth for all
displayed content, typed by `modules/portfolio/types/index.ts`. Section components
are presentational and receive their data as props from `page.tsx` — they never
import the data directly. To change site content, edit `portfolioData.ts`, not the
components. The glassmorphism hero follows the same pattern: config is injected from
the page (see `app/glassmorphism/page.tsx`).

### Contact feature (hexagonal / ports & adapters)
The contact flow is layered, with ports defined as interfaces and concrete
adapters implementing them:

- `domain/contact.ts` — `ContactMessage` type + `validateContactMessage` (pure validation, Spanish error strings)
- `application/sendContactMessage.ts` — `SendContactMessageUseCase`, depends only on the `EmailDeliveryPort` interface
- `services/emailService.ts` — `EmailDeliveryPort` interface + `ResendEmailService` adapter (server-side, calls the Resend HTTP API, HTML-escapes input)
- `services/contactSubmissionService.ts` — `ContactSubmissionPort` + `ContactApiSubmissionService` (client-side, POSTs to `/api/contact`)
- `app/api/contact/route.ts` — Route Handler (`runtime = 'nodejs'`); wires the use case to `ResendEmailService` and maps results to HTTP (422 validation, 500 config/provider errors)

Required env (see `.env.example`): `RESEND_API_KEY`, optional `CONTACT_FROM_EMAIL`.
Missing the key throws `MissingEmailProviderConfigurationError`.

### Styling
Tailwind CSS v4 with **CSS-first config** — there is no `tailwind.config`. Design
tokens (colors like `primary`/`on-surface`, font families, animations) are declared
in the `@theme` block of `src/app/globals.css`; utility classes such as
`text-on-surface` or `font-headline` derive from those tokens. Fonts are loaded via
`next/font/google` in `app/layout.tsx` (Space Grotesk, Inter, JetBrains Mono) plus
Material Symbols via a `<link>`. The site is dark-mode only (`<html className="dark">`).

## Deployment caveat
Two deployment paths coexist and conflict. `.github/workflows/deploy.yml` builds and
uploads `./out` to GitHub Pages, **but** `next.config.ts` no longer sets
`output: 'export'`, so `npm run build` no longer generates `./out` — the Pages
workflow is currently broken/stale (a leftover `out/` exists on disk from an earlier
config). The intended target is now Vercel (recent commits). The contact Route
Handler requires a Node.js runtime and cannot run on a static export anyway, so the
contact form only works on a server-backed deploy (e.g. Vercel). If you re-enable the
Pages path you must restore `output: 'export'` (and remember it disables the contact
API). `next.config.ts` also allowlists remote images from `lh3.googleusercontent.com`.
