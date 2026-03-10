# 🚀 Job Tracker

A clean, modern job application tracker built with **React + Vite + Tailwind CSS**.

## Features
- ✅ Add, edit, delete job applications
- 📊 Dashboard with stats (total, interviews, offers, response rate)
- 🎯 Status tracking: Applied → Interview → Offer / Rejected
- 🔍 Search by company, role, or location
- 🎛️ Filter by status, sort by date or company
- 💾 Persisted in `localStorage` — your data survives refreshes
- 📱 Fully responsive

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production
```bash
npm run build
```
Output goes to the `dist/` folder — ready to host anywhere.

---

## Deploy

### Vercel (recommended — free)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite. Click **Deploy**. Done ✅

### Netlify (free)
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy site** ✅

### GitHub Pages
```bash
npm install --save-dev gh-pages
```
Add to `package.json` scripts:
```json
"deploy": "gh-pages -d dist"
```
Then:
```bash
npm run build && npm run deploy
```

---

## Project Structure
```
src/
├── App.jsx              # Root component
├── main.jsx             # Entry point
├── index.css            # Tailwind base styles
├── constants.js         # Status config & colors
├── hooks/
│   └── useJobs.js       # All state, filtering, storage logic
└── components/
    ├── StatsBar.jsx      # Dashboard stats + pie chart
    ├── Toolbar.jsx       # Search, filter, sort controls
    ├── JobCard.jsx       # Individual job card
    ├── JobForm.jsx       # Add/edit modal form
    └── StatusBadge.jsx   # Colored status pill
```
