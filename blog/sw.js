// The old Chirpy blog (now /blog_legacy/) registered a caching service worker
// at /blog/. This replacement removes it so returning visitors see the new blog.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.registration.unregister();
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    const windows = await self.clients.matchAll({ type: 'window' });
    windows.forEach((client) => client.navigate(client.url));
  })());
});
