/* eslint-disable array-callback-return */
// Cache stands for the storage of a browser.
const CACHE_NAME = "version-1";
// The pages we want to show when the app has no internet connection.
const urlsToCache = ["index.html", "offline.html"];

// this in the service worker file actually represents the service worker
const self = this;

// install service worker
self.addEventListener("install", event => {
    event.waitUntil(
        // open the cache
        caches.open(CACHE_NAME).then(cache => {
            console.log("Opened cache");
            // add all the urls to the cache
            return cache.addAll(urlsToCache);
        })
    );
});

// Listen for the installation event.
self.addEventListener("fetch", event => {
    event.respondWith(
        // Check if the request is for one of the pages we want to cache.
        caches.match(event.request).then(async () => {
            try {
                return await fetch(event.request);
            } catch {
                return await caches.match('offline.html');
            }
        })
    );
});

// Activate the service worker.
self.addEventListener("activate", event => {
    const cacheWhitelist = [];
    // Delete all caches that aren't named in CACHE_NAME.
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
                // return null;
            })
        ))

    );
});