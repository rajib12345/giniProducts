self.addEventListener('install', (e) => {
  console.log("===== calling install listener ======");
  // e.waitUntil(
  //   caches.open('fox-store').then((cache) => cache.addAll([
  //     'static/PWA/',
  //     'static/PWA/index.html',
  //     'static/PWA/index.js',
  //     'static/PWA/style.css',
  //     'static/PWA/fox1.jpg',
  //     'static/PWA/fox2.jpg',
  //     'static/PWA/fox3.jpg',
  //     'static/PWA/fox4.jpg',
  //   ])),
  // );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  // e.respondWith(
  //   caches.match(e.request).then((response) => response || fetch(e.request)),
  // );
});
