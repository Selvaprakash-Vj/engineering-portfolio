# Install Phase 4.4

1. Stop Vite with `Ctrl + C`.
2. Extract the update ZIP directly into:

   `D:\Engineering_Portfolio`

3. Allow Windows to replace the included files.
4. Your PDF resume in `public` is not included in the update and will not be replaced.
5. GSAP is already installed from Phase 4.3, so another installation is not required.
6. Run:

```powershell
cd D:\Engineering_Portfolio
npm run build
npm run preview
```

For normal development:

```powershell
npm run dev
```

## Test

- Homepage: scroll through sections 00–07 and verify that the final contact scene is sharp.
- Confirm the right rail shows the active number and label without the word `SCENE`.
- MachineGuard AI: `/projects/machineguard-ai`
- Finance Tracker: `/projects/finance-tracker`
- Confirm both project pages show their own right-side section rail and varied transitions.
