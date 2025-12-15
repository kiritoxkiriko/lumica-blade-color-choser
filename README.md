# Lumica DAISENKO Blade Color Chooser

Next.js app for matching any 6-digit hex color to the closest official Lumica DAISENKO Blade Charge preset, with live sprite previews and tri-language UI (中文 / 日本語 / English).

## Overview
- Built with Next.js App Router + Tailwind.
- Uses a 24-color JSON palette and sprite sheet to show the exact official slice.
- All copy and color names localized; Japanese rendered in Katakana.
- Custom logo/favicon set to the Lumica blade photo.

## Features
- Hex input → closest official color, RGB distance, mode (Standard/Extended) and sprite preview.
- Full list of 24 colors with quick-select buttons.
- i18n toggle (Chinese/Japanese/English) for all labels and color names (Japanese in Katakana).
- Product reference links and hero imagery for context.

## Usage
1) Pick language from the top-left selector (中文 / 日本語 / English).
2) Enter a 6-digit hex (with or without `#`) in the Input Color form.
3) Click Match → shows closest official color, mode, RGB distance, and the exact sprite slice.
4) Click any card under “All 24 colors” to jump to that preset and update the match.
5) Official sprite preview mirrors the JSON order, useful for verifying indices.

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
