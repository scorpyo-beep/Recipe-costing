const CACHE = 'kitchen-costing-v2';

const CORE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];


/* INSTALL */

self.addEventListener('install', event => {

  event.waitUntil(

    caches
      .open(CACHE)
      .then(cache => cache.addAll(CORE_FILES))
      .then(() => self.skipWaiting())

  );

});


/* ACTIVATE */

self.addEventListener('activate', event => {

  event.waitUntil(

    caches
      .keys()
      .then(keys => {

        return Promise.all(

          keys
            .filter(key => key !== CACHE)
            .map(key => caches.delete(key))

        );

      })
      .then(() => self.clients.claim())

  );

});


/* FETCH */

self.addEventListener('fetch', event => {

  const request = event.request;


  /*
    For page navigation:
    ALWAYS try the newest online version first.

    This prevents the old broken index.html
    from remaining stuck in the installed app.
  */

  if (request.mode === 'navigate') {

    event.respondWith(

      fetch(request)

        .then(response => {

          const copy = response.clone();

          caches
            .open(CACHE)
            .then(cache => {

              cache.put(
                './index.html',
                copy
              );

            });

          return response;

        })

        .catch(() => {

          return caches.match(
            './index.html'
          );

        })

    );

    return;
  }


  /*
    For other files:
    use the cached version when available,
    otherwise go to the network.
  */

  event.respondWith(

    caches
      .match(request)
      .then(cachedResponse => {

        if (cachedResponse) {

          return cachedResponse;

        }

        return fetch(request);

      })

  );

});
