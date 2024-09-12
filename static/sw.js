self.addEventListener("install", (event) => {
	// Service worker installation
	event.waitUntil(
		caches.open("v1").then((cache) => {
			return cache.addAll([]);
		})
	);
});

self.addEventListener("activate", (event) => {
	// Service worker activation
	event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
	// Handle fetch events
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
