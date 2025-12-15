# Lumica DAISENKO Blade Color Chooser

Next.js app for matching any 6-digit hex color to the closest official Lumica DAISENKO Blade Charge preset, with live sprite previews and tri-language UI (中文 / 日本語 / English).

## Features
- Hex input → closest official color, RGB distance, mode (Standard/Extended) and sprite preview.
- Official sprite crop pulled from `public/lumica_colors.jpg` with per-color positioning.
- Full list of 24 colors with quick-select buttons.
- i18n toggle (Chinese/Japanese/English) for all labels and color names (Japanese in Katakana).
- Product reference links and hero imagery for context.

## Getting Started
Install dependencies and start the dev server:
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Building
```bash
npm run build
```
Note: `next/font` downloads Geist/Geist Mono at build time; ensure network access or swap to local fonts if building offline.

## Project Structure
- `app/page.tsx` – main UI, matching logic, i18n copy.
- `data/lumica_colors.json` – official color data.
- `public/` – product and sprite images (`lumica_colors.jpg` used for slices).
