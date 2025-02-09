self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('cache-v4').then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./contactanos.html",
        "./Oferta_educativa.html",
        "./plan.html",
        "./estilos.css",
        "./ofertaE.css",
        "./plan.css",
        "./manifest.json",
        "./app.js",
        "./offline.html",
        
        "./imagenes/actitud.png",
        "./imagenes/beca.png",
        "./imagenes/conocimiento.png",
        "./imagenes/escudo.png",
        "./imagenes/escuelasuperior.png",
        "./imagenes/graduacion.png",
        "./imagenes/icon.png",
        "./imagenes/icono1.png",
        "./imagenes/icono2.png",
        "./imagenes/inicio_cap.png",
        "./imagenes/mujer-removebg-preview.png",
        "./imagenes/multitalentoso.png",
        "./imagenes/papeleria.png",
        "./imagenes/par_students-removebg-preview.png",
        "./imagenes/plan_cap.png",
        "./imagenes/planeta-tierra.png",
        "./imagenes/profesional.jpg",
        "./imagenes/public-service.png",
        "./imagenes/unam.jpg",
        "./imagenes/valor.png"
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


self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetching', e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Cache encontrada', e.request.url);
                return response;
            }
            var requestClone = e.request.clone();
            fetch(requestClone).then(function(response) {
                if(!response){
                    console.log('No se encontro respuesta');
                    return response;
                }
                var responseClone = response.clone();
                
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, responseClone);
                    return response;
                });
            })
            .catch(function(err){
                console.log('Error al hacer fetch', err);
            })
        })
    )
})
