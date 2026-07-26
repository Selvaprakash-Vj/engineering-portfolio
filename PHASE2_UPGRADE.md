# Upgrade the existing Phase 1 folder

Target folder:

```text
D:\Engineering_Portfolio
```

## Method 1 — Extract the update ZIP directly

1. Stop the running Vite server with `Ctrl + C`.
2. Create a quick backup copy of `D:\Engineering_Portfolio`.
3. Extract the Phase 2 update ZIP directly into `D:\Engineering_Portfolio`.
4. Allow Windows to replace the existing files.
5. Start the website:

```powershell
cd D:\Engineering_Portfolio
npm run dev
```

No new npm packages were added, so a fresh `npm install` is normally unnecessary.

## Files replaced by the update

```text
src\App.tsx
src\site.ts
src\styles.css
README.md
package.json
```

Your existing `node_modules`, `package-lock.json`, CV PDF and any other local files remain untouched.
