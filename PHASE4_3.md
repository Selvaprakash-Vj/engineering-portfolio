# Phase 4.3 — Cinematic Scroll System

This release fixes the TypeScript production-build error for CSS side-effect imports and adds the first cinematic scroll layer to the professional portfolio.

## Build fix

`src/vite-env.d.ts` now includes Vite client types and a CSS module declaration:

```ts
/// <reference types="vite/client" />
declare module '*.css'
```

This resolves:

```text
TS2882: Cannot find module or type declarations for side-effect import of './styles.css'.
```

## Animation system

- GSAP + ScrollTrigger scene orchestration
- Natural browser scrolling; no rigid wheel hijacking
- Section entrance, focus and exit transitions
- Active section progress rail
- Scene-change scan flash
- Scroll-responsive rotor and project graphics
- Animated career, engineering and education lines
- Background grid evolution by section
- Reduced-motion and mobile-safe fallbacks

## Dependency

```powershell
npm install gsap
```

## Validate

```powershell
npm run build
npm run preview
```
