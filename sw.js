const CACHE_NAME = "yes-chef-pro-v6";
const CORE = ["./","./index.html","./manifest.json","./icon.svg","./icon-192.png","./icon-512.png","./yes-chef-pro-logo.jpg"];
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE).catch(()=>{})));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const u = new URL(event.request.url);
  if (u.origin !== location.origin) return;
  event.respondWith(fetch(event.request).then(res => {
    const copy=res.clone();
    caches.open(CACHE_NAME).then(c=>c.put(event.request,copy)).catch(()=>{});
    return res;
  }).catch(()=>caches.match(event.request)));
});
