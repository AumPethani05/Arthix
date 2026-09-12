# Arthix frontend (Next.js)

## Setup
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## What's in here
- `app/page.tsx` — the phone shell with bottom navigation across three screens.
- `components/Dashboard.tsx` — home screen: balance, Vivek's signal, quick actions.
- `components/VivekDecisions.tsx` — the four decision gates: Recommend, Assist first,
  Suppress, Verify. Switch between them with the pill selector.
- `components/Sahayak.tsx` — BhashaSahayak chat, driven by the shared language toggle
  in the top bar (English / Hindi / Gujarati).
- `components/TopBar.tsx`, `components/ui.tsx` — shared chrome and primitives
  (`LedgerRow`, `VerdictShell`).
- `tailwind.config.js` — the full color/typography token set.

## Design notes
This replaces the Stitch export's card-grid look (ALL-CAPS eyebrow labels, middle-dot
joined meta text, arrow-suffixed buttons, identical rounded-shadow tiles for every
element) with a quieter structure built around one recurring motif: a thin ledger-tick
rail on the hero balance, and plain hairline-divided rows for lists instead of stacked
cards. Plus Jakarta Sans and the navy/azure/emerald/amber palette carry over from the
Stitch tokens since those were already solid choices — only the templated chrome was
stripped out.

Next screens to port from the Stitch export when you're ready (not yet built here):
Sahara financial health, JeevanChakra full recommendation feed, onboarding/consent,
brand logo lockup.
