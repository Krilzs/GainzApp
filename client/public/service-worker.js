import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

// Precachéa todos los archivos estáticos generados en el build
precacheAndRoute(self.__WB_MANIFEST || []);

// Cachea requests de API con stale-while-revalidate
registerRoute(
  ({ url }) => url.pathname.startsWith("/api"),
  new StaleWhileRevalidate({
    cacheName: "api-cache",
  })
);

// Cachea imágenes con cache-first y expiración
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }), // 30 días
    ],
  })
);
