const CACHE_NAME = 'expense-tracker-v1';
const ASSETS = [
  '/', '/index.html', '/main.css', '/manifest.json',
  '/src/index.js','/src/data/db.js','/src/data/format.js',
  '/src/utils/notifications.js','/src/utils/animations.js',
  '/src/components/ExpenseForm.js','/src/components/ExpenseCard.js',
  '/src/components/CategoryChart.js','/src/views/Dashboard.js',
  '/public/icons/192x192.svg','/public/icons/512x512.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => {
    if (cached) return cached;
    return fetch(e.request).then(r => {
      if (!r || r.status !== 200) return r;
      const clone = r.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return r;
    }).catch(() => new Response('Offline', { status: 200 }));
  }));
});
