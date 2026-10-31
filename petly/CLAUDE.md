# Petly — architecture & decisions

Consumer pet-care app ("everything your pet needs, all in one place").
Expo SDK 58 (managed) · React Native 0.88 · React 19 · Expo Router (typed routes) · React Compiler on.
Lives in `petly/` inside the Cedar-Lab repo; the repo root is an unrelated Next.js site.

See also `AGENTS.md` (Expo's generic agent notes).

## Commands

```bash
npm start            # Expo dev server (Expo Go works — no dev build needed)
npm run check        # tsc --noEmit && expo lint && jest   ← run before EVERY commit
npm run typecheck | lint | test
```

## Layout

```
src/
  app/          Expo Router routes ONLY. Screens stay thin: read stores, call core, render components.
  core/         Framework-free TypeScript + __tests__/. No React / RN / Expo / Zustand / i18next imports
                (enforced by ESLint). Dates, recurrence, tasks, reminders, health, wellness, units,
                validation, formatting, report/handover/emergency builders, sample data, theme tokens + contrast.
  components/   One component per file. ui/ primitives, then feature folders.
  stores/       Zustand. ONE persisted slice per concern (pets, care, medications, vaccinations, visits,
                weights, wellness, reminders, documents, household, settings). lifecycle.ts coordinates
                cross-slice ops (sample data, cascade delete, export, erase).
  hooks/        React glue (useToday, useFormat, useSelectedPet, …).
  lib/          Platform adapters: kv storage, secure store, notifications, haptics, i18n.
  theme/        useTheme (JS palette), cssVars (NativeWind vars), fonts.
  locales/      en.json — every user-facing string.
```

## Rules (non-negotiable)

1. **core/ is framework-free** and unit-tested. Business logic goes there, not in screens.
2. **One component per file.** No inline mega-components.
3. **All text goes through `<Txt>`** (`components/ui/Txt.tsx`). It resolves colour **in JS** from the
   theme via `tone`. Never colour text with a `text-*` class: class colours compile to CSS variables
   that do not reach native Modals, portals, or subtrees outside the variable root, where text falls
   back to black — invisible on web, only visible on device. ESLint bans importing RN `Text` elsewhere.
   Same reasoning for icons (`<Icon tone>`) and for surfaces rendered in portals (bottom sheets take
   `backgroundStyle` from `useTheme()`).
4. **Contrast is measured.** `core/theme/textPairs.ts` lists every text-on-surface pair; the test
   checks both themes against WCAG AA (4.5:1). When a coloured surface gains text, add its pair first.
   Never put white text on a mid-tone brand colour (sage, peach) without measuring.
5. **Never fake a feature.** Anything unbuilt is an explicit `<ComingSoonRow>`.
6. **No hard-coded copy.** Strings live in `src/locales/en.json`; i18next is typed, so a missing key
   is a type error. ESLint `react/jsx-no-literals` blocks literal JSX text.
7. **Styling:** NativeWind 4 + Tailwind 3. Theme tokens → CSS variables (`theme/cssVars.ts`) applied
   at the root, so one class follows light/dark/system. **No `dark:` variants.**
8. Small commits, clear messages. Keep this file current.

## Decisions log

- **Storage: expo-sqlite/kv-store**, not MMKV (MMKV needs a dev build; kv-store runs in Expo Go).
  The sync API is used so slices hydrate before first render.
- **Secrets → expo-secure-store** (`lib/secure.ts`). Today that is only the app-lock flag (kept out of
  the kv store so clearing app data can't silently disable the lock). Future auth tokens go here.
- **Palette:** PRD colours kept except text-secondary: `#7A827D` is 3.9:1 on white (fails AA), so it
  is `#5B635E`. Dark theme uses a lighter green (`#7CC3A1`) as primary with dark ink on it.
- **No backend yet.** Data is local to the device. Cloud accounts, email verification, password
  reset, household invites, public share links, subscriptions are "Coming soon" — the auth screens
  validate input but say plainly that cloud accounts are not available yet.
- **Care completions are an append-only audit log** (`completed` / `undone` entries). The latest entry
  wins; duplicates of the same occurrence are rejected in core.
- **Recent activity is derived** from records (care log, doses, weights, visits, vaccinations), not
  stored separately, so it cannot drift.
- **Sample data** (Max, Luna, Bella) has `isSample: true` and `s-` ids, is badged in the UI, and can be
  removed in one action from Settings.
- **Emergency card QR** encodes plain text with only owner-approved fields (works offline, no public
  URL). Hosted public profiles with revocation are "Coming soon".
- **Health copy** describes recorded changes only and always points to the vet. No diagnoses, no
  dosage advice.
- Pet photos: sample pets use illustrated SVG portraits; users add real photos via expo-image-picker.
