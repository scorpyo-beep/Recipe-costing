/*
  Kitchen Costing cache reset.

  The current Kitchen Costing app does NOT use
  a service worker for normal operation.

  This file exists to remove any old service
  worker/cache left behind by previous versions.
*/

self.addEventListener('install', event => {

  self.skipWaiting();

});


self.addEventListener('activate', event => {

  event.waitUntil(

    (async () => {

      /* Delete every old cache */

      const keys =
        await caches.keys();

      await Promise.all(
        keys.map(
          key =>
            caches.delete(key)
        )
      );


      /* Remove this service worker */

      await self.registration.unregister();


      /* Reload any open Kitchen Costing pages */

      const clients =
        await self.clients.matchAll({
          type:'window'
        });


      clients.forEach(client => {

        client.navigate(
          client.url
        );

      });

    })()

  );

});


self.addEventListener(
  'fetch',
  event => {

    /*
      Do not cache anything.
      Always get the current file
      from GitHub Pages.
    */

    event.respondWith(
      fetch(event.request)
    );

  }
);
