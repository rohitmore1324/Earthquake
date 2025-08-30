# Earthquake Visualizer (React + Leaflet)

**Persona**: Casey (Geography student) wants to explore global seismic activity from the past 24 hours.  
**Task**: Visualize earthquakes on an interactive web map with clear details and filtering.

## Features
- Live data from **USGS** (all-day GeoJSON)
- Interactive **map** with circle markers sized/colored by magnitude
- **Popups**: Place, Magnitude, Time, Depth (+ link to USGS event)
- **Filter** by minimum magnitude
- **Sidebar list** (click to zoom to quake)
- **Responsive**, clean Tailwind UI
- **Error/Empty states**

## Tech
React, Vite, TailwindCSS, Leaflet/react-leaflet, Axios, Vitest

## Quick Start
```bash
npm i
npm run dev
```
Open http://localhost:5173

## Build & Deploy
```bash
npm run build
```
Deploy `dist/` to Netlify or Vercel.

## Tests
```bash
npx vitest
```
