// ANDINITO - service worker minimo (instalable; siempre usa la red para tener datos al dia)
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
