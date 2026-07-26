# Install Phase 5.0

1. Stop Vite with `Ctrl + C`.
2. Extract the update package into `D:\Engineering_Portfolio` and replace the included files.
3. Confirm the résumé is still present at:
   `D:\Engineering_Portfolio\public\Selvaprakash_Vijayaraman_Resume.pdf`
4. Run:

```powershell
cd D:\Engineering_Portfolio
npm install
npm run preflight
npm run build
npm run preview
```

`npm run build` creates a normal local production build at `/`.

The GitHub Actions workflow runs `npm run build:github`, which creates the release for:

`https://selvaprakash-vj.github.io/engineering-portfolio/`

## First publication

Create a new public GitHub repository named `engineering-portfolio`, then run:

```powershell
cd D:\Engineering_Portfolio
git init
git branch -M main
git add .
git commit -m "Launch Selva Engineering Portfolio v1.0"
git remote add origin https://github.com/Selvaprakash-Vj/engineering-portfolio.git
git push -u origin main
```

On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**. The included workflow will build and deploy the site after every push to `main`.
