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
    var m = meta(p), s = esc(p.venue);
    if (m.volume) s += ", " + esc(m.volume) + (m.issue ? "(" + esc(m.issue) + ")" : "");
    else if (m.issue) s += ", no. " + esc(m.issue);
    if (m.pages) s += ", " + esc(m.pages);
    return s;
  }

  function sorted() {
    return PAPERS.slice().sort(function (a, b) {
      return ((b.year || 0) * 100 + (b.month || 0)) - ((a.year || 0) * 100 + (a.month || 0));
    });
  }

  // Full abstract record from the journal's own page, if we have one.
  function full(p) {
    if (typeof ABSTRACTS === "undefined") return null;
    var k = (typeof ABSTRACT_ALIAS !== "undefined" && ABSTRACT_ALIAS[p.id]) || p.id;
    return ABSTRACTS[k] || null;
  }

  function hostLabel(u) {
    var h = (u.match(/^https?:\/\/([^/]+)/) || [])[1] || "";
    if (/journals\.ust\.edu/.test(h)) return "Journal of Social Studies (JSS)";
    if (/jsd\.sdasmart/.test(h)) return "Journal of Scientific Development for Studies and Research (JSD)";
    if (/ukrpublisher/.test(h)) return "UKR Publisher";
    if (/ejua\.net/.test(h)) return "Electronic Journal of University of Aden (EJUA-HS)";
    if (/aijssh/.test(h)) return "AIJSSH";
    return h;
  }

  // Sources for a paper: its own list plus the journal page and PDF the abstract came from.
  function sourcesOf(p) {
    var list = p.sources.slice(), f = full(p);
    var have = function (u) { return list.some(function (s) { return s.url === u; }); };
    if (f) {
      if (f.src && !have(f.src)) list.push({ label: hostLabel(f.src) + " — article page (abstract source)", url: f.src });
      if (f.pdf && !have(f.pdf)) list.push({ label: hostLabel(f.pdf) + " — full text (PDF)", url: f.pdf });
      if (f.doi && !p.doi) list.push({ label: "DOI " + f.doi, url: "https://doi.org/" + f.doi });
    }
    return list;
  }

  // Publication details, filled in from the journal page where our record is blank.
  function meta(p) {
    var f = full(p) || {};
    var pg = p.pages || (f.pg && f.pg.indexOf("_") === -1 ? f.pg : "");
    return {
      volume: p.volume || f.vol || "", issue: p.issue || f.iss || "", pages: pg, doi: p.doi || f.doi || ""
    };
  }

  /* ---------- language of titles and abstracts ---------- */

  // "orig" shows every paper as published. "en" / "ar" switch titles and abstracts
  // to that language only where the journal itself published a version in it;
  // nothing is translated here.
  var LANG = "orig";
  try { LANG = localStorage.getItem("lang") || "orig"; } catch (e) {}
  if (["orig", "en", "ar"].indexOf(LANG) === -1) LANG = "orig";

  function origLang(p) { return p.ar ? "ar" : "en"; }

  // A paper's title in one language, or "" if none was published in it.
  function titleIn(p, l) {
    if (l === origLang(p)) return p.title;
    var t = l === "ar" ? p.titleAr : p.titleEn, f = full(p);
    if (!t && f && typeof TITLES !== "undefined" && TITLES[f.src]) t = TITLES[f.src][l];
    return t ? t.trim() : "";
  }

  // [text, language] to show for the current setting.
  function titleFor(p) {
    var l = LANG === "orig" ? origLang(p) : LANG, t = titleIn(p, l);
    return t ? [t, l] : [p.title, origLang(p)];
  }

  function arClass(l) { return l === "ar" ? ' class="ar" dir="rtl" lang="ar"' : ""; }

  function langSwitch() {
    var page = document.body.getAttribute("data-page");
    var wrap = $(".mast .wrap");
    if (!wrap || ["home", "research", "paper", "sources"].indexOf(page) === -1) return;
    var opts = [["orig", "Original", "Titles and abstracts as published"], ["en", "EN", "English"], ["ar", "عربي", "العربية"]];
    var box = document.createElement("div");
    box.className = "lang";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Language of titles and abstracts");
    box.innerHTML = opts.map(function (o) {
      return '<button type="button" data-l="' + o[0] + '" title="' + o[2] + '"' + (o[0] === "ar" ? ' lang="ar"' : "") +
        ' aria-pressed="' + (LANG === o[0]) + '">' + o[1] + "</button>";
    }).join("");
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b || b.getAttribute("data-l") === LANG) return;
      try { localStorage.setItem("lang", b.getAttribute("data-l")); } catch (err) {}
      location.reload();
    });
    wrap.insertBefore(box, $(".nav-toggle"));
  }

  function pubItem(p, showYear) {
    var area = AREAS[p.area], T = titleFor(p);
    return '<li class="pub">' +
      '<div class="yr">' + (showYear ? (p.year || "—") : "") + "</div>" +
      "<div>" +
      "<h3" + arClass(T[1]) + '><a href="paper.html?id=' + encodeURIComponent(p.id) + '">' + esc(T[0]) + "</a></h3>" +
      '<p class="by">' + authorLine(p) + "</p>" +
      (p.venue ? '<p class="where">' + venueLine(p) + "</p>" : "") +
      (area ? '<span class="tag">' + esc(area.name) + "</span>" : "") +
      (p.lang ? '<span class="tag plain">In ' + esc(p.lang) + "</span>" : "") +
      (LANG !== "orig" && T[1] !== LANG ? '<span class="tag plain">' + (LANG === "en" ? "Arabic title only" : "English title only") + "</span>" : "") +
      (full(p) ?'<span class="tag plain">Full abstract</span>' : "") +
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
        var f = full(p);
        var hay = [p.title, titleIn(p, "ar"), titleIn(p, "en"), p.venue, p.abstract, p.authors.join(" "),
          f ? f.ab.map(function (a) { return a[1]; }).join(" ") : "", f && f.kw ? f.kw.join(" ") : ""].join(" ").toLowerCase();
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
      var m = meta(p);
      if (m.volume) s += ", <i>" + esc(m.volume) + "</i>" + (m.issue ? "(" + esc(m.issue) + ")" : "");
      if (m.pages) s += ", " + esc(m.pages);
      s += ".";
    }
    var d = meta(p).doi;
    if (d) s += " https://doi.org/" + esc(d);
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
    var p = list[i], area = AREAS[p.area], M = meta(p), F = full(p), SRC = sourcesOf(p);
    var T = titleFor(p), other = LANG === "orig" ? titleIn(p, origLang(p) === "ar" ? "en" : "ar") : "";
    var AB = F ? F.ab : [], abNote = "";
    if (F && LANG !== "orig") {
      AB = F.ab.filter(function (a) { return a[0] === LANG; });
      if (!AB.length) {
        AB = F.ab;
        abNote = LANG === "en" ? "No English abstract was published for this paper; it is shown in the original language." :
          "لم يُنشر ملخص عربي لهذا البحث، لذلك يظهر بلغته الأصلية.";
      }
    }
    document.title = T[0] + " — " + PROFILE.shortName;

    var facts = [
      ["Published in", p.venue],
      ["Volume / issue", M.volume ? M.volume + (M.issue ? " (" + M.issue + ")" : "") : (M.issue ? M.issue : "")],
      ["Pages", M.pages],
      ["Date", p.date || (p.rgDate ? "" : p.year)],
      ["Date on ResearchGate", p.rgDate],
      ["Field", area && area.name],
      ["Type", p.type],
      ["Language", p.lang || "English"],
      ["DOI", M.doi ? '<a href="https://doi.org/' + esc(M.doi) + '">' + esc(M.doi) + "</a>" : ""]
    ].filter(function (f) { return f[1]; });

    var related = list.filter(function (q) { return q.area === p.area && q.id !== p.id; }).slice(0, 4);
    var prev = list[i - 1], next = list[i + 1];
    var main = (F && F.pdf) ? { url: F.pdf, pdf: true } :
      (SRC.filter(function (s) { return s.url !== RG && s.url.indexOf("researchgate") === -1; })[0] || SRC[0]);

    root.innerHTML =
      '<p class="crumbs"><a href="research.html">Research</a> / ' +
      '<a href="research.html#area=' + p.area + '">' + esc(area ? area.name : "") + "</a></p>" +
      '<div class="paper"><article>' +
      '<p class="eyebrow">' + esc(p.type) + (p.year ? " &middot; " + p.year : "") + "</p>" +
      "<h1" + arClass(T[1]) + ">" + esc(T[0]) + "</h1>" +
      (other ? (T[1] === "en" ? '<p class="ar ar-title" dir="rtl" lang="ar">' : '<p class="en-title">') + esc(other) + "</p>" : "") +
      '<p class="authors">' + authorLine(p) + "</p>" +
      (abNote ? '<p class="src-note"' + arClass(LANG) + ">" + abNote + "</p>" : "") +
      (F ? AB.map(function (a) {
          var ar = a[0] === "ar";
          return "<h2" + (ar ? ' class="ar" dir="rtl" lang="ar" style="text-align:right;letter-spacing:0"' : "") + ">" + (ar ? "الملخص" : "Abstract") + "</h2>" +
            '<div class="abstract full' + (ar ? ' ar" dir="rtl" lang="ar' : "") + '">' +
            esc(a[1]).split(/\n+/).map(function (para) { return "<p>" + para + "</p>"; }).join("") + "</div>";
        }).join("") +
        (F.kw && F.kw.length ? '<p class="kw"><b>Keywords:</b> ' + F.kw.map(esc).join(" · ") + "</p>" : "") +
        '<p class="src-note">Abstract and keywords reproduced exactly as published on the journal\'s article page: <a href="' + esc(F.src) + '" target="_blank" rel="noopener">' + esc(hostLabel(F.src)) + "</a>.</p>"
      : p.abstract ? "<h2>Abstract</h2>" +
        '<blockquote class="abstract' + (p.abstractAr ? ' ar" dir="rtl" lang="ar' : "") + '">' + esc(p.abstract) + "</blockquote>" +
        '<p class="src-note">Abstract excerpt quoted as it appears on ResearchGate.</p>' : "") +
      "<h2>Cite this paper</h2>" +
      '<div class="cite" id="cite">' + apa(p) + "</div>" +
      '<div class="actions" style="margin-top:14px">' +
      '<button class="btn" type="button" id="copy">Copy citation</button>' +
      (main ? '<a class="btn solid" href="' + esc(main.url) + '" target="_blank" rel="noopener">' + (main.pdf ? "Read the full paper (PDF)" : main.url === RG ? "View on ResearchGate" : "Read at the publisher") + ' <span class="arr">&rarr;</span></a>' : "") +
      "</div>" +
      "<h2 style=\"margin-top:40px\">Sources</h2>" +
      '<ol class="sources">' + SRC.map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>";
      }).join("") + "</ol>" +
      (p.rgNote ? '<p class="src-note">' + esc(p.rgNote) + "</p>" : "") +
      (p.notOnRG ? '<p class="src-note">Not in the ResearchGate publication list; taken from the journal\'s own page.</p>' : "") +
      '<p class="src-note">Links open online and need an internet connection.</p>' +
      (related.length ? '<h2 style="margin-top:48px">More in ' + esc(area.name) + '</h2><ul class="pubs">' +
        related.map(function (q) { return pubItem(q, true); }).join("") + "</ul>" : "") +
      '<nav class="pager">' +
      (prev ? '<a href="paper.html?id=' + encodeURIComponent(prev.id) + '"><small>&larr; Newer</small>' + esc(titleFor(prev)[0]) + "</a>" : "<span></span>") +
      (next ? '<a class="next" href="paper.html?id=' + encodeURIComponent(next.id) + '"><small>Older &rarr;</small>' + esc(titleFor(next)[0]) + "</a>" : "") +
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
      var T = titleFor(p);
      return '<li><a class="t' + (T[1] === "ar" ? ' ar" dir="rtl" lang="ar' : "") + '" href="paper.html?id=' + encodeURIComponent(p.id) + '">' + esc(T[0]) + "</a>" +
        "<ul>" + sourcesOf(p).map(function (s) {
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
    nav(); langSwitch(); birthday(); year();
    var page = document.body.getAttribute("data-page");
    if (page === "home") home();
    if (page === "research") research();
    if (page === "paper") paper();
    if (page === "profile") profile();
    if (page === "sources") sources();
  });
})();
