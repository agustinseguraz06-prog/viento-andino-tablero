// ANDINITO - service worker: instalable + notificaciones del resumen diario
const ICONO = "https://itrygljklylfoxtyipey.supabase.co/functions/v1/andinito?icono=192";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data.json(); } catch (x) { d = { title: "ANDINITO", body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "ANDINITO", {
    body: d.body || "", icon: ICONO, badge: ICONO, tag: "andinito-reporte", renotify: true,
    data: { url: d.url || "./" }
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL(e.notification.data.url, self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((cs) => {
    for (const c of cs) if (c.url.startsWith(self.registration.scope) && "focus" in c) { c.navigate(url); return c.focus(); }
    return clients.openWindow(url);
  }));
});
