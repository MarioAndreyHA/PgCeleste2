self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('cache-v4').then(cache => {
      return cache.addAll([
        "/",
        "/Index.html",
        "/contactanos.html",
        "/Oferta_educativa.html",
        "/plan.html",
        "/estilos.css",
        "/ofertaE.css",
        "/plan.css",
        "/manifest.json",
        "/app.js",
        "/offline.html",
        
        "/imagenes/actitud.png",
        "/imagenes/beca.png",
        "/imagenes/conocimiento.png",
        "/imagenes/escudo.png",
        "/imagenes/escuelasuperior.png",
        "/imagenes/graduacion.png",
        "/imagenes/icon.png",
        "/imagenes/icono1.png",
        "/imagenes/icono2.png",
        "/imagenes/inicio_cap.png",
        "/imagenes/mujer-removebg-preview.png",
        "/imagenes/multitalentoso.png",
        "/imagenes/papeleria.png",
        "/imagenes/par_students-removebg-preview.png",
        "/imagenes/plan_cap.png",
        "/imagenes/planeta-tierra.png",
        "/imagenes/profesional.jpg",
        "/imagenes/public-service.png",
        "/imagenes/unam.jpg",
        "/imagenes/valor.png"
      ]);
    })
  );
});


self.addEventListener('activate', event => {
  console.log('Service worker Activado');
  const cacheWhitelist = ['cache-v4'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('/offline.html'))
  );
});