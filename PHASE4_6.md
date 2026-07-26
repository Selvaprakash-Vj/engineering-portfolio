# Phase 4.6 — Classy Hero, Accessibility & Sharing Identity

## Hero refinement

The opening scene now uses a clear hierarchy:

1. Name
2. Primary professional role
3. Three focused capability signals
4. One concise engineering statement
5. Two direct actions

The oversized three-role stack was removed from the hero. The deeper AI/ML positioning remains visible through the Engineering Stack and MachineGuard AI evidence.

## Accessibility improvements

- One semantic `<main>` now contains the complete homepage content.
- Skip links target the true main-content region.
- Route changes are announced through a polite live region.
- Active section navigation uses `aria-current`.
- The mobile menu supports Escape-to-close and exposes `aria-controls`.
- Horizontally scrollable technical diagrams are keyboard focusable.
- Forced-colour and print fallbacks are included.
- Existing reduced-motion and touch-device fallbacks remain active.

## SEO and sharing

- Route-aware title and description metadata
- Canonical URLs
- Open Graph and Twitter metadata
- Person / project JSON-LD structured data
- 1200×630 social preview artwork for home, MachineGuard AI, Finance Tracker and Resume
- Static social-preview entry pages for clean project URLs on GitHub Pages
- `robots.txt`, `sitemap.xml`, `site.webmanifest` and app icons

## Planned public URL

```text
https://selvaprakash-vj.github.io/engineering-portfolio/
```

Update the URL configuration before deployment if the final repository name or domain changes.
