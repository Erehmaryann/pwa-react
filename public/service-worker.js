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
            // add all the urls to the cache
            return cache.addAll(urlsToCache);
        })
    );
});

// Listen for the installation event.
self.addEventListener("fetch", event => {

});

// Activate the service worker.
self.addEventListener("activate", event => {

});