# Portfolio Build Hotfix 4.5.1

This hotfix removes the obsolete Vite 7-style object form of `build.rollupOptions.output.manualChunks`.
Vite 8 no longer accepts that object form. The portfolio now uses Vite's default production chunking,
which is appropriate for the current application size and avoids the TypeScript build failure.

## Install

1. Stop the development server with `Ctrl + C`.
2. Copy `vite.config.ts` into `D:\Engineering_Portfolio` and replace the existing file.
3. Run:

```powershell
cd D:\Engineering_Portfolio
npm run build
npm run preview
```

A successful build creates the `dist` directory.
