# Selva Engineering Portfolio

A futuristic professional personal-brand website for Selvaprakash Vijayaraman, focused on mechanical development, CAE/FEM, simulation automation and data-driven engineering.

## Local development

```powershell
npm install
npm run dev
```

## Production checks

```powershell
npm run preflight
npm run build
npm run preview
```

## GitHub Pages build

```powershell
npm run build:github
```

The public project-site target is:

`https://selvaprakash-vj.github.io/engineering-portfolio/`

Deployment is automated by `.github/workflows/deploy.yml` after pushes to `main`.

## Main routes

- `/`
- `/resume`
- `/projects/machineguard-ai`
- `/projects/finance-tracker`

## Public assets

- `public/Selvaprakash_Vijayaraman_Resume.pdf`
- `public/MachineGuard_AI_Project_Report.pdf`

The Finance Tracker page describes the architecture only. Personal financial data and the private source system must never be committed to this repository.
