# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Freshly-scaffolded Vite + React 19 + TypeScript single-page app. No routing, state management, backend, or test setup exists yet — `src/App.tsx` still contains the starter landing page. Treat this as a blank slate: introduce libraries and structure deliberately as features are added.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Type-check (tsc -b, all project references) then vite build → dist/
npm run lint     # Run Oxlint
npm run preview  # Serve the production build locally
```

There is no test runner configured. `npm run build` is the primary correctness gate — it runs `tsc -b` before bundling, so type errors fail the build.

## Toolchain notes

- **Linter is Oxlint, not ESLint.** Config lives in `.oxlintrc.json` with the `react`, `typescript`, and `oxc` plugins. `react/rules-of-hooks` is an error. To enable type-aware rules, install `oxlint-tsgolint` and set `options.typeAware: true` (see `README.md`).
- **TypeScript uses project references** (`tsconfig.json` → `tsconfig.app.json` for `src/`, `tsconfig.node.json` for config files). Bundler mode is on: `verbatimModuleSyntax` requires `import type` for type-only imports, and `allowImportingTsExtensions` means `.tsx`/`.ts` extensions appear in import paths. `noUnusedLocals` and `noUnusedParameters` are enforced.
- **React 19** with `react-jsx` transform (no `import React` needed). The React Compiler is intentionally not enabled.

## Structure

- `src/main.tsx` — entry point; mounts `<App />` into `#root` under `<StrictMode>`.
- `src/App.tsx` — root component (currently the starter template).
- `public/` — static assets served at the root path (e.g. `/icons.svg`, referenced via `<use href="/icons.svg#...">` in App.tsx).
- `src/assets/` — assets imported through the bundler (fingerprinted).

## Git and GitHub

This repo is `MarkBotros0/message-of-hope`. Several GitHub accounts are
authenticated via `gh` on this machine, and **only `MarkBotros0` has write
access here** — a push under any other account fails with a 403
(`Permission ... denied`).

Before pushing, confirm the active account and switch if needed:

```bash
gh auth status && gh auth switch --user MarkBotros0
```

`gh auth switch` changes the active account globally, so it also affects other
repos on this machine. `MarkBotros0` owns both this repo and `new-hope`, so
leaving it active is the right default.
