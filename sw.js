// El Cuaderno service worker: keeps the app working offline and handles updates.
// To publish an update: change VERSION here AND APP_VERSION in index.html, then upload both.
// The reading model has its own cache ("transformers-cache") and survives app updates.
const VERSION = 'el-cuaderno-v1.0.1';
const SHELL = ['./', './index.html', './ocr-worker.js', './manifest.json', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  // cache: 'reload' skips GitHub Pages' 10-minute browser cache so a new version gets new files
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' })))));
  // no skipWaiting here: the new version waits until you tap "Update now"
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('el-cuaderno-') && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const library = url.hostname === 'cdn.jsdelivr.net' || url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com');
  if (!sameOrigin && !library) return; // model downloads go straight to the network

  if (sameOrigin) {
    // app files come from this version's cache, so the app only changes when you choose to update
    e.respondWith(
      caches.open(VERSION).then((c) => c.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) c.put(req, res.clone());
        return res;
      }).catch(() => c.match('./index.html'))))
    );
  } else {
    // pinned library versions never change: cache first
    e.respondWith(
      caches.open(VERSION).then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok || res.type === 'opaque') c.put(req, res.clone());
        return res;
      })))
    );
  }
});
