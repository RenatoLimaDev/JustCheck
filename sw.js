const CACHE = 'justcheck-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// network-first para o HTML (deploy novo aparece), cache-first para o resto
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isDoc = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isDoc) {
    e.respondWith(fetch(req).then(r => {
      caches.open(CACHE).then(c => c.put(req, r.clone()));
      return r;
    }).catch(() => caches.match(req).then(m => m || caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(req).then(m => m || fetch(req).then(r => {
      if (r.ok && new URL(req.url).origin === location.origin) caches.open(CACHE).then(c => c.put(req, r.clone()));
      return r;
    })));
  }
});
