# Install Phase 6.1 — Bilingual Core

## 1. Stop the local server

```powershell
Ctrl + C
```

## 2. Extract the update

Extract the update ZIP directly into:

```text
D:\Engineering_Portfolio
```

Allow Windows to replace the included files.

The package adds the German CV document at:

```text
D:\Engineering_Portfolio\public\Selvaprakash_Vijayaraman_Lebenslauf.docx
```

Your existing English resume PDF remains untouched.

## 3. Build and test

```powershell
cd D:\Engineering_Portfolio
npm run build
npm run dev
```

Test these routes:

```text
http://localhost:5173/
http://localhost:5173/de/
http://localhost:5173/resume
http://localhost:5173/de/lebenslauf
```

Test the EN / DE switch on the homepage and both digital-resume routes.

## 4. Publish

```powershell
git add .
git commit -m "Add German portfolio and digital resume"
git push
```

GitHub Actions will redeploy the website automatically.

## Phase boundary

MachineGuard AI and Finance Tracker remain English in Phase 6.1. Their German project pages belong to Phase 6.2.
