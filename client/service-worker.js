/* eslint-env serviceworker */
/* global importScripts, workbox */

// Carga Workbox desde CDN
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);

// Verificación
if (workbox) {
  console.log("✅ Workbox cargado correctamente");

  // Precaching (esto lo inyecta Workbox con injectManifest en el build)
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  // API: Cache con StaleWhileRevalidate
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith("/api"),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "api-cache",
    })
  );

  // Imágenes: CacheFirst con expiración
  workbox.routing.registerRoute(
    ({ request }) => request.destination === "image",
    new workbox.strategies.CacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        }),
      ],
    })
  );
} else {
  console.error("❌ Workbox no se pudo cargar.");
}
