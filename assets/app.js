(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Any author string that is one of his name variants is shown in bold.
  function isHim(name) {
    return /sattar/i.test(name) || /عبد ?الستار/.test(name);
  }

  function authorLine(p) {
    var parts = p.authors.map(function (a) {
      return isHim(a) ? "<strong>" + esc(a) + "</strong>" : esc(a);
    });
    var s = parts.join(", ");
    if (p.etal) s += " et al.";
    return s;
  }

  function venueLine(p) {
    if (!p.venue) return "";
    var s = esc(p.venue);
    if (p.volume) s += ", " + esc(p.volume) + (p.issue ? "(" + esc(p.issue) + ")" : "");
    else if (p.issue) s += ", no. " + esc(p.issue);
    if (p.pages) s += ", " + esc(p.pages);
    return s;
  }

  function sorted() {
    return PAPERS.slice().sort(function (a, b) {
      return ((b.year || 0) * 100 + (b.month || 0)) - ((a.year || 0) * 100 + (a.month || 0));
    });
  }

  function pubItem(p, showYear) {
    var area = AREAS[p.area];
    return '<li class="pub">' +
      '<div class="yr">' + (showYear ? (p.year || "—") : "") + "</div>" +
      "<div>" +
      "<h3" + (p.ar ? ' class="ar" dir="rtl" lang="ar"' : "") + '><a href="paper.html?id=' + encodeURIComponent(p.id) + '">' + esc(p.title) + "</a></h3>" +
      '<p class="by">' + authorLine(p) + "</p>" +
      (p.venue ? '<p class="where">' + venueLine(p) + "</p>" : "") +
      (area ? '<span class="tag">' + esc(area.name) + "</span>" : "") +
      (p.lang ? '<span class="tag plain">In ' + esc(p.lang) + "</span>" : "") +
      "</div></li>";
  }

  /* ---------- shared bits ---------- */

  function nav() {
    var btn = $(".nav-toggle"), menu = $(".nav");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // A small note that only appears around his birthday (15 October).
  function birthday() {
    var d = new Date();
    if (d.getMonth() !== 9 || d.getDate() < 13 || d.getDate() > 22) return;
    try { if (sessionStorage.getItem("ribbon-closed")) return; } catch (e) {}
    var r = document.createElement("div");
    r.className = "ribbon";
    r.innerHTML = "<b>Happy birthday, Dr. Iskander.</b> With gratitude from your students. " +
      '<button type="button" aria-label="Close">&times;</button>';
    r.querySelector("button").addEventListener("click", function () {
      r.remove();
      try { sessionStorage.setItem("ribbon-closed", "1"); } catch (e) {}
    });
    document.body.insertBefore(r, document.body.firstChild);
  }

  function year() {
    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- home ---------- */

  function home() {
    var list = sorted();
    var venues = {}, people = {}, years = [];
    list.forEach(function (p) {
      if (p.venue) venues[p.venue] = 1;
      p.authors.forEach(function (a) { if (!isHim(a)) people[a] = 1; });
      if (p.year) years.push(p.year);
    });
    $("#n-papers").textContent = list.length;
    $("#n-venues").textContent = Object.keys(venues).length;
    $("#n-people").textContent = Object.keys(people).length;
    $("#n-since").textContent = Math.min.apply(null, years);

    var counts = {};
    list.forEach(function (p) { counts[p.area] = (counts[p.area] || 0) + 1; });
    $("#areas").innerHTML = Object.keys(AREAS).map(function (k) {
      var a = AREAS[k];
      return '<li><a href="research.html#area=' + k + '">' +
        '<span class="n"></span>' +
        "<div><h3>" + esc(a.name) + "</h3><p>" + esc(a.blurb) + "</p></div>" +
        '<span class="count">' + (counts[k] || 0) + (counts[k] === 1 ? " paper" : " papers") + "</span>" +
        "</a></li>";
    }).join("");

    $("#recent").innerHTML = list.slice(0, 5).map(function (p) { return pubItem(p, true); }).join("");
  }

  /* ---------- research index ---------- */

  function research() {
    var state = { q: "", area: "all", year: "all" };
    var all = sorted();

    // read #area=hr&year=2025 from the address so links from the home page land filtered
    location.hash.replace(/^#/, "").split("&").forEach(function (kv) {
      var p = kv.split("=");
      if (p[0] === "area" && AREAS[p[1]]) state.area = p[1];
      if (p[0] === "year" && p[1]) state.year = p[1];
    });

    var chips = $("#chips");
    var opts = [["all", "All fields"]].concat(Object.keys(AREAS).map(function (k) { return [k, AREAS[k].name]; }));
    chips.innerHTML = opts.map(function (o) {
      return '<button type="button" class="chip" data-area="' + o[0] + '" aria-pressed="' + (state.area === o[0]) + '">' + esc(o[1]) + "</button>";
    }).join("");
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      state.area = b.getAttribute("data-area");
      [].forEach.call(chips.children, function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      draw();
    });

    var ys = {};
    all.forEach(function (p) { ys[p.year || "undated"] = 1; });
    var sel = $("#year-filter");
    sel.innerHTML = '<option value="all">All years</option>' + Object.keys(ys).sort().reverse().map(function (y) {
      return '<option value="' + y + '">' + (y === "undated" ? "Undated" : y) + "</option>";
    }).join("");
    sel.value = state.year;
    sel.addEventListener("change", function () { state.year = sel.value; draw(); });

    var q = $("#q");
    q.addEventListener("input", function () { state.q = q.value.trim().toLowerCase(); draw(); });

    function match(p) {
      if (state.area !== "all" && p.area !== state.area) return false;
      if (state.year !== "all" && String(p.year || "undated") !== state.year) return false;
      if (state.q) {
        var hay = [p.title, p.titleAr, p.titleEn, p.venue, p.abstract, p.authors.join(" ")].join(" ").toLowerCase();
        return state.q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
      }
      return true;
    }

    function draw() {
      var hits = all.filter(match);
      var h = [];
      if (state.area !== "all") h.push("area=" + state.area);
      if (state.year !== "all") h.push("year=" + state.year);
      history.replaceState(null, "", h.length ? "#" + h.join("&") : location.pathname);

      $("#result-line").textContent = hits.length === all.length
        ? "Showing all " + all.length + " publications, newest first."
        : "Showing " + hits.length + " of " + all.length + " publications.";

      if (!hits.length) {
        $("#list").innerHTML = '<p class="empty">Nothing matches that search. Try a broader word, or clear the filters.</p>';
        return;
      }
      var groups = {}, order = [];
      hits.forEach(function (p) {
        var k = p.year || "Undated";
        if (!groups[k]) { groups[k] = []; order.push(k); }
        groups[k].push(p);
      });
      $("#list").innerHTML = order.map(function (k) {
        return '<section class="ygroup"><h2>' + k + " &middot; " + groups[k].length + "</h2>" +
          '<ul class="pubs">' + groups[k].map(function (p) { return pubItem(p, false); }).join("") + "</ul></section>";
      }).join("");
    }

    draw();
  }

  /* ---------- single paper ---------- */

  function apa(p) {
    var names = p.authors.slice();
    var s = esc(names.join(", ")) + (p.etal ? ", et al." : "");
    s += " (" + (p.year || "n.d.") + "). " + esc(p.title) + ".";
    if (p.venue) {
      s += " <i>" + esc(p.venue) + "</i>";
      if (p.volume) s += ", <i>" + esc(p.volume) + "</i>" + (p.issue ? "(" + esc(p.issue) + ")" : "");
      if (p.pages) s += ", " + esc(p.pages);
      s += ".";
    }
    if (p.doi) s += " https://doi.org/" + esc(p.doi);
    return s;
  }

  function paper() {
    var id = (location.search.match(/[?&]id=([^&]+)/) || [])[1];
    id = id ? decodeURIComponent(id) : "";
    var list = sorted();
    var i = -1;
    list.forEach(function (p, n) { if (p.id === id) i = n; });
    var root = $("#paper");
    if (i < 0) {
      root.innerHTML = '<p class="empty">This paper could not be found. <a href="research.html">Back to all research</a>.</p>';
      return;
    }
    var p = list[i], area = AREAS[p.area];
    document.title = p.title + " — " + PROFILE.shortName;

    var facts = [
      ["Published in", p.venue],
      ["Volume / issue", p.volume ? p.volume + (p.issue ? " (" + p.issue + ")" : "") : (p.issue ? p.issue : "")],
      ["Pages", p.pages],
      ["Date", p.date || (p.rgDate ? "" : p.year)],
      ["Date on ResearchGate", p.rgDate],
      ["Field", area && area.name],
      ["Type", p.type],
      ["Language", p.lang || "English"],
      ["DOI", p.doi ? '<a href="https://doi.org/' + esc(p.doi) + '">' + esc(p.doi) + "</a>" : ""]
    ].filter(function (f) { return f[1]; });

    var related = list.filter(function (q) { return q.area === p.area && q.id !== p.id; }).slice(0, 4);
    var prev = list[i - 1], next = list[i + 1];
    var main = p.sources.filter(function (s) { return s.url !== RG && s.url.indexOf("researchgate") === -1; })[0] || p.sources[0];

    root.innerHTML =
      '<p class="crumbs"><a href="research.html">Research</a> / ' +
      '<a href="research.html#area=' + p.area + '">' + esc(area ? area.name : "") + "</a></p>" +
      '<div class="paper"><article>' +
      '<p class="eyebrow">' + esc(p.type) + (p.year ? " &middot; " + p.year : "") + "</p>" +
      "<h1" + (p.ar ? ' class="ar" dir="rtl" lang="ar"' : "") + ">" + esc(p.title) + "</h1>" +
      (p.titleAr ? '<p class="ar ar-title" dir="rtl" lang="ar">' + esc(p.titleAr) + "</p>" : "") +
      (p.titleEn ? '<p class="en-title">' + esc(p.titleEn) + "</p>" : "") +
      '<p class="authors">' + authorLine(p) + "</p>" +
      (p.abstract ? "<h2>Abstract</h2>" +
        '<blockquote class="abstract' + (p.abstractAr ? ' ar" dir="rtl" lang="ar' : "") + '">' + esc(p.abstract) + "</blockquote>" +
        '<p class="src-note">Abstract excerpt quoted as it appears on ResearchGate.</p>' : "") +
      "<h2>Cite this paper</h2>" +
      '<div class="cite" id="cite">' + apa(p) + "</div>" +
      '<div class="actions" style="margin-top:14px">' +
      '<button class="btn" type="button" id="copy">Copy citation</button>' +
      (main ? '<a class="btn solid" href="' + esc(main.url) + '" target="_blank" rel="noopener">' + (main.url === RG ? "View on ResearchGate" : "Read at the publisher") + ' <span class="arr">&rarr;</span></a>' : "") +
      "</div>" +
      "<h2 style=\"margin-top:40px\">Sources</h2>" +
      '<ol class="sources">' + p.sources.map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>";
      }).join("") + "</ol>" +
      (p.rgNote ? '<p class="src-note">' + esc(p.rgNote) + "</p>" : "") +
      (p.notOnRG ? '<p class="src-note">Not in the ResearchGate publication list; taken from the journal\'s own page.</p>' : "") +
      '<p class="src-note">Links open online and need an internet connection.</p>' +
      (related.length ? '<h2 style="margin-top:48px">More in ' + esc(area.name) + '</h2><ul class="pubs">' +
        related.map(function (q) { return pubItem(q, true); }).join("") + "</ul>" : "") +
      '<nav class="pager">' +
      (prev ? '<a href="paper.html?id=' + encodeURIComponent(prev.id) + '"><small>&larr; Newer</small>' + esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="next" href="paper.html?id=' + encodeURIComponent(next.id) + '"><small>Older &rarr;</small>' + esc(next.title) + "</a>" : "") +
      "</nav></article>" +
      '<aside><dl class="facts">' + facts.map(function (f) {
        return "<div><dt>" + f[0] + "</dt><dd>" + (f[0] === "DOI" ? f[1] : esc(f[1])) + "</dd></div>";
      }).join("") + "</dl></aside></div>";

    $("#copy").addEventListener("click", function () {
      var text = $("#cite").innerText;
      var btn = this;
      function done() {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy citation"; }, 1800);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else fallback();
      function fallback() {
        var t = document.createElement("textarea");
        t.value = text; document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        t.remove();
      }
    });
  }

  /* ---------- sources ---------- */

  function sources() {
    var list = sorted();
    $("#n-rg").textContent = PROFILE.rgCount;
    $("#src-list").innerHTML = list.map(function (p) {
      return '<li><a class="t' + (p.ar ? ' ar" dir="rtl" lang="ar' : "") + '" href="paper.html?id=' + encodeURIComponent(p.id) + '">' + esc(p.title) + "</a>" +
        "<ul>" + p.sources.map(function (s) {
          return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>";
        }).join("") + "</ul></li>";
    }).join("");
  }

  /* ---------- profile ---------- */

  function profile() {
    var people = {};
    PAPERS.forEach(function (p) {
      p.authors.forEach(function (a) { if (!isHim(a)) people[a] = (people[a] || 0) + 1; });
    });
    var names = Object.keys(people).sort(function (a, b) { return people[b] - people[a] || a.localeCompare(b); });
    $("#coauthors").innerHTML = names.map(function (n) {
      return "<li>" + esc(n) + "<small>" + people[n] + (people[n] === 1 ? " paper" : " papers") + " together</small></li>";
    }).join("");
    $("#variants").textContent = PROFILE.variants.join(" · ");
    $("#n-total").textContent = PAPERS.length;
  }

  document.addEventListener("DOMContentLoaded", function () {
    nav(); birthday(); year();
    var page = document.body.getAttribute("data-page");
    if (page === "home") home();
    if (page === "research") research();
    if (page === "paper") paper();
    if (page === "profile") profile();
    if (page === "sources") sources();
  });
})();
