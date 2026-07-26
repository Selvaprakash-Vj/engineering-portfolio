# Phase 5.0 — Public Launch Preparation

This release adds the repository and deployment foundation for the first public version of the Selva Engineering Portfolio.

## Included

- More breathing room in the homepage hero
- GitHub Actions deployment to GitHub Pages
- Project-site build base for `/engineering-portfolio/`
- Local builds and previews remain available at `/`
- Public-release preflight checks
- Required Pages routing support for direct project and résumé URLs
- Launch-ready build marker: `05.0 // LAUNCH READY`

## Planned public address

`https://selvaprakash-vj.github.io/engineering-portfolio/`

The workflow assumes the GitHub repository is named `engineering-portfolio`. If the repository name changes, update the `base` value in `vite.config.ts` and the public URLs in `src/site.ts`, `index.html`, `public/sitemap.xml`, and `public/robots.txt`.
