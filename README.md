# Expense Tracker PWA

A mobile-first, offline-capable expense tracking app built as a Progressive Web App.

## Features
- Add, edit, and delete expenses
- Category-based organization (Food, Transport, Shopping, Bills, Entertainment, Health, Other)
- Search and filter transactions
- Sort by date or amount
- Monthly and weekly spending summaries
- Category breakdown with visual bars
- Dark/light theme toggle
- Persistent local storage
- Offline support via service worker
- Installable as a PWA
- Toast notifications
- Confirmation dialogs

## Setup
```bash
cd /Users/Tamur/dev/pwa
python3 -m http.server 8080
```

## PWA Installation
1. Open the app in Chrome/Edge on your phone
2. Tap the install prompt or menu > "Add to Home Screen"
3. App works offline after installation

## Architecture
```
src/
├── data/          # localStorage abstraction, formatting
├── utils/         # animations, notifications
├── components/    # form, card, chart
├── views/         # dashboard orchestrator
└── index.js       # entry point
```

## Deployment
Push to GitHub Pages:
```bash
git add . && git commit -m "Initial commit" && git push origin main
```

Then enable Pages in repo Settings → Pages → main branch.

## Data Model
```json
{
  "id": 1718342400000,
  "title": "Grocery Shopping",
  "amount": 45.50,
  "category": "Food",
  "createdAt": "2026-05-14T10:30:00Z"
}
```
