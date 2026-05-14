# Deploy Expense Tracker PWA to GitHub Pages

## Steps

1. Push code to GitHub:
```bash
cd /Users/Tamur/dev/pwa
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:tamurtariq/Expense-Tracker-PWA.git
git branch -M main
git push -u origin main
```

2. Enable GitHub Pages:
- Go to repo Settings → Pages
- Source: main branch, root folder
- Save

Your app will be at:
https://tamurtariq.github.io/Expense-Tracker-PWA/

## Note
Service worker needs root path references to work correctly on GitHub Pages.
