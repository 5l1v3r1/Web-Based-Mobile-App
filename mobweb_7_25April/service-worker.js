const STATIC_ASSETS = [ 
	'./',
	'./css/desktop.css',
	'./css/smartphone.css',
	'./offline.html', 
];

const STATIC_CACHE_NAME = 'manga-static';
const DYNAMIC_CACHE_NAME = 'manga-dynamic';

self.addEventListener('install', (evt) => {
   	// evt.waitUntil( 
	//     caches.open(CACHE_NAME).then((cache) => { 
	//         console.log('[ServiceWorker] Pre-caching offline page'); 
	//         return cache.addAll(FILES_TO_CACHE);
	//     })
  	// );
	//  self.skipWaiting();
	 const cache = await caches.open(STATIC_CACHE_NAME);
	 cache.addAll(STATIC_ASSETS);
});

self.addEventListener('fetch', function(evt) {
	// if (evt.request.mode !== 'navigate') 
	// { // Not a page navigation, bail. 
	// 	return; 
	// } 
	// evt.respondWith( 
	//     fetch(evt.request) 
	//         .catch(() => { 
	//             return caches.open(CACHE_NAME) 
	//                 .then((cache) => { 
	//                     return cache.match('offline.html'); 
	//                 }); 
	//         })
	// )
	const req = evt.request;
	evt.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
	const cachedResponse = await caches.match(req);
	const url = new URL(req.url);

	if (url.origin == location.origin) {
		evt.respondWith(cacheFirst(req));
	} else {
		evt.respondWith(networkFirst(req));
	}
	return cachedResponse || fetch(req);
}

async function networkFirst(req) {
	const cache = await caches.open(DYNAMIC_CACHE_NAME);
	try {
		const res = await fetch(req);
		cache.put(req, res.clone());
		return res;
	} catch(error) {
		return await cache.match(req);
	}
}

self.addEventListener('activate', (evt) => {
	evt.waitUntil( 
	    caches.keys().then((keyList) => { 
	        return Promise.all(keyList.map((key) => { 
	            if (key !== STATIC_CACHE_NAME) { 
	                console.log('[ServiceWorker] Removing old cache', key); 
	                return caches.delete(key); 
	            } 
	        }));
	    })
	); 
});

