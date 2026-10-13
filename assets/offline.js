// Keeps an offline copy of the site (only when served over http/https, not from file://)
// and offers to add it to the phone's home screen like an app.
(function () {
  if (!/^https?:$/.test(location.protocol)) return;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }

  var KEY = "install-dismissed", WEEK = 7 * 24 * 3600 * 1000;
  var standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone;
  var later = 0;
  try { later = +localStorage.getItem(KEY) || 0; } catch (e) {}
  if (standalone || Date.now() - later < WEEK) return;

  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var deferred = null, bar = null;

  function close(remember) {
    if (bar) { bar.remove(); bar = null; }
    if (remember) { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} }
  }

  function show() {
    if (bar) return;
    bar = document.createElement("div");
    bar.className = "install";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Add to home screen");
    bar.innerHTML = '<img src="assets/icon-192.png" alt="">' +
      "<p><b>Add to your home screen</b><small>" +
      (ios ? "Tap the Share button, then “Add to Home Screen”. It opens like an app, even offline."
           : "It opens like an app, even without internet.") +
      "</small></p>" +
      (ios ? "" : '<button type="button" class="go">Add</button>') +
      '<button type="button" class="x" aria-label="Not now">&times;</button>';
    bar.querySelector(".x").addEventListener("click", function () { close(true); });
    var go = bar.querySelector(".go");
    if (go) go.addEventListener("click", function () {
      if (!deferred) return close(false);
      deferred.prompt();
      deferred.userChoice.then(function (c) { close(c.outcome !== "accepted"); deferred = null; });
    });
    document.body.appendChild(bar);
  }

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferred = e;
    setTimeout(show, 2500);
  });
  window.addEventListener("appinstalled", function () { close(true); });
  if (ios) window.addEventListener("load", function () { setTimeout(show, 2500); });
})();
