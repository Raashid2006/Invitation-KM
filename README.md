# Magesh & Kalaiarasi — Engagement Invitation

A Vite + React invitation site with a tap-to-open wax-seal cover, a rotating
3D gold heart (Three.js), and three pages:

- `/` — Home: names, save-the-date, live countdown
- `/venue` — Venue details with a "Get Directions" link
- `/quotes` — Rotating love quote + a grid of all quotes

## Run it locally

This sandbox has no internet access, so the install had to be skipped here —
run these two commands on your own machine (with internet) instead:

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for hosting

```bash
npm run build
```

This outputs a static site in `dist/`, which you can upload anywhere (Netlify,
Vercel, GitHub Pages, or your own hosting).

## Editing

- Names, date, and venue: `src/pages/Home.jsx` and `src/pages/Venue.jsx`
- Quotes: `src/data/quotes.js`
- Colors and fonts: `src/styles/theme.css` (CSS variables at the top)
- The 3D heart/ring/particles: `src/components/ThreeBackground.jsx`
