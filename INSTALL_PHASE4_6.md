# Install Phase 4.6

1. Stop the development server with `Ctrl + C`.
2. Extract this update directly into:

   `D:\Engineering_Portfolio`

3. Allow Windows to replace the included files.
4. Your résumé PDF is not included and remains untouched at:

   `public\Selvaprakash_Vijayaraman_Resume.pdf`

5. Start the project:

```powershell
cd D:\Engineering_Portfolio
npm run dev
```

6. Validate the production build:

```powershell
npm run build
npm run preview
```

## Public URL note

SEO and sitemap files currently use:

`https://selvaprakash-vj.github.io/engineering-portfolio/`

If your final repository name or domain differs, update `publicUrl` in `src\site.ts` and the absolute URLs listed in `PHASE4_6.md` before deployment.
