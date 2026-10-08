const CACHE_NAME = "yes-chef-pro-v6";

const CORE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./yes-chef-pro-logo.jpg"
];

// Install the new service worker
self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE).catch(() => {});
    })
  );
});

// Remove old caches and activate immediately
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Network first
// This makes sure GitHub Pages gets the newest version.
// If the internet is unavailable, use the cached version.
self.addEventListener("fetch", event => {

  // Only handle requests from this GitHub site
  const url = new URL(event.request.url);

  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {

        // Save the newest version in the cache
        const copy = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, copy);
          })
          .catch(() => {});

        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
