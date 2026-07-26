# Install Phase 4.3

## 1. Stop the development server

```powershell
Ctrl + C
```

## 2. Extract the update ZIP

Extract directly into:

```text
D:\Engineering_Portfolio
```

Allow Windows to replace the included files.

The update does not replace anything inside `public`, so the existing PDF résumé remains untouched.

## 3. Dependency

You already installed GSAP successfully. If this update is later installed on another copy of the project, run:

```powershell
npm install
```

## 4. Production validation

```powershell
cd D:\Engineering_Portfolio
npm run build
npm run preview
```

A successful build creates:

```text
D:\Engineering_Portfolio\dist
```

## 5. Development mode

```powershell
npm run dev
```

## Build error fixed

The update adds `src\vite-env.d.ts`, resolving the TypeScript CSS side-effect import error in `src\main.tsx`.
