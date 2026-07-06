// Thalvaràn — Service Worker
// Cached die App-Hülle beim ersten Besuch, damit sie danach auch ohne
// Netz startet (z. B. wenn im Saal das WLAN mal hakt).
const CACHE_NAME = "thalvaran-kodex-v1";
const CORE_ASSETS = [
  "./thalvaran-kodex-app.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Strategie: Netzwerk zuerst (für aktuelle Live-Daten übers Backend),
// bei Fehlschlag (kein Netz) auf den Cache zurückfallen.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
