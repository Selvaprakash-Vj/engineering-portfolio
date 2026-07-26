# Phase 4.1 + 4.2 — Content Lock and Clean Routing

## Phase 4.1

- Confirmed the public email, LinkedIn and GitHub links.
- Connected every résumé action to `public/Selvaprakash_Vijayaraman_Resume.pdf`.
- Added GitHub, LinkedIn and email access inside the digital résumé.
- Updated the dossier revision and last-system-update labels.
- Added a dedicated recruiter-facing digital résumé page.
- Removed remaining link placeholders from the active application.

## Phase 4.2

Clean routes:

```text
/projects/machineguard-ai
/projects/finance-tracker
/resume
```

Navigation behaviour:

- Project cards update the URL through the browser History API.
- Back and forward buttons work without reloading the application.
- The home-page scroll position is saved before entering a case study.
- Returning through browser history restores the previous scroll position.
- Portfolio return actions use `/#projects` and land directly in Project Lab.
- Legacy `?project=` URLs are migrated automatically.
- Resume and project pages can be opened directly or refreshed locally.
- GitHub Pages direct-route fallback is prepared through `public/404.html`.

## No new dependencies

The router is implemented inside `src/routing.tsx`; React Router was intentionally not added.
