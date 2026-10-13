// Keeps a copy of the whole site on the device so it opens without internet.
// Bump VERSION whenever any site file changes.
var VERSION = "v1";
var CACHE = "iskander-" + VERSION;
var FILES = [
  "./",
  "index.html",
  "research.html",
  "paper.html",
  "profile.html",
  "sources.html",
  "card.html",
  "manifest.webmanifest",
  "assets/style.css",
  "assets/data.js",
  "assets/abstracts.js",
  "assets/app.js",
  "assets/offline.js",
  "assets/qr.svg",
  "assets/icon-192.png",
  "assets/icon.svg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Online: fetch fresh and refresh the stored copy. Offline: serve the stored copy.
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        return hit || caches.match(req.mode === "navigate" ? "index.html" : req, { ignoreSearch: true });
      });
    })
  );
});
