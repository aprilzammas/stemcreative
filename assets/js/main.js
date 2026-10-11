(function () {
  "use strict";

  // Edit titles / categories / order here. Files live in assets/img/work and assets/img/thumbs (same filename).
  var CATS = [
    { id: "all", label: "All" },
    { id: "zamma", label: "Zamma · Cap-A-Tread" },
    { id: "katora", label: "Katora Coffee" },
    { id: "identity", label: "Events & Identity" },
    { id: "early", label: "Early Work" }
  ];

  var WORK = [
    { f: "capatread-lifestyle",      c: "zamma",    t: "Cap-A-Tread stair renewal — lifestyle" },
    { f: "capatread-spec-drawing",   c: "zamma",    t: "Cap-A-Tread Type 1 & Type 2 spec drawing" },
    { f: "capatread-install-sheet",  c: "zamma",    t: "Laminate & vinyl stair renewal — install sheet" },
    { f: "flooring-finder-cover",    c: "zamma",    t: "Flooring Finder cover" },
    { f: "capatread-retail-display", c: "zamma",    t: "Cap-A-Tread in-store display" },
    { f: "capatread-signage",        c: "zamma",    t: "Cap-A-Tread signage mockup" },
    { f: "zamma-website",            c: "zamma",    t: "Zamma website" },
    { f: "lowes-product-listing",    c: "zamma",    t: "Lowe’s product listing" },

    { f: "katora-logo",              c: "katora",   t: "Katora Coffee logo" },
    { f: "katora-espresso-menu",     c: "katora",   t: "Espresso menu board" },
    { f: "katora-soup-day",          c: "katora",   t: "Soup Day promo" },
    { f: "katora-live-local",        c: "katora",   t: "Live + Local — art & makers monthly" },
    { f: "katora-website",           c: "katora",   t: "Katora Coffee website" },

    { f: "snaps-poetry",             c: "identity", t: "SNAPS — spoken word & poetry" },
    { f: "aha-logo",                 c: "identity", t: "AHA! — Addicts Helping Addicts" },
    { f: "handsome-hound-logo",      c: "identity", t: "Handsome Hound logo" },

    { f: "era-bulletin",             c: "early",    t: "ERA technical bulletin" },
    { f: "infocomm-show-site",       c: "early",    t: "InfoComm show website" },
    { f: "infocomm-blog",            c: "early",    t: "InfoComm show blog" },
    { f: "ams-website",              c: "early",    t: "AMS website" }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var filtersEl = $("filters"), stripEl = $("strip"), img = $("viewer-img");
  var catEl = $("viewer-cat"), titleEl = $("viewer-title"), countEl = $("viewer-count");
  var current = [], idx = 0;

  function catLabel(id) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i].label;
    return "";
  }

  function show(i) {
    if (!current.length) return;
    idx = (i + current.length) % current.length;
    var w = current[idx];
    img.classList.add("is-loading");
    var next = new Image();
    next.onload = function () {
      img.src = next.src;
      img.classList.remove("is-loading");
    };
    next.onerror = function () { img.classList.remove("is-loading"); };
    next.src = "assets/img/work/" + w.f + ".webp";
    img.alt = w.t;
    catEl.textContent = catLabel(w.c);
    titleEl.textContent = w.t;
    countEl.textContent = (idx + 1) + " / " + current.length;
    var btns = stripEl.children;
    for (var b = 0; b < btns.length; b++) {
      if (b === idx) { btns[b].setAttribute("aria-current", "true"); }
      else btns[b].removeAttribute("aria-current");
    }
    var active = btns[idx];
    if (active && active.scrollIntoView) {
      stripEl.scrollTo({ left: active.offsetLeft - stripEl.clientWidth / 2 + active.clientWidth / 2, behavior: "smooth" });
    }
  }

  function renderStrip() {
    stripEl.innerHTML = "";
    current.forEach(function (w, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", w.t);
      var t = document.createElement("img");
      t.src = "assets/img/thumbs/" + w.f + ".webp";
      t.alt = "";
      t.loading = "lazy";
      b.appendChild(t);
      b.addEventListener("click", function () { show(i); });
      stripEl.appendChild(b);
    });
  }

  function filter(id) {
    current = id === "all" ? WORK.slice() : WORK.filter(function (w) { return w.c === id; });
    var chips = filtersEl.children;
    for (var i = 0; i < chips.length; i++) {
      chips[i].setAttribute("aria-selected", chips[i].dataset.cat === id ? "true" : "false");
    }
    renderStrip();
    show(0);
  }

  CATS.forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.dataset.cat = c.id;
    b.setAttribute("role", "tab");
    b.textContent = c.label;
    b.addEventListener("click", function () { filter(c.id); });
    filtersEl.appendChild(b);
  });

  $("prev").addEventListener("click", function () { show(idx - 1); });
  $("next").addEventListener("click", function () { show(idx + 1); });

  // keyboard arrows while the viewer area has focus
  $("viewer").addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { show(idx - 1); }
    if (e.key === "ArrowRight") { show(idx + 1); }
  });

  // touch swipe on the stage
  var sx = null;
  $("viewer").addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  $("viewer").addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    sx = null;
  });

  var yr = $("yr"); if (yr) yr.textContent = new Date().getFullYear();

  filter("all");
})();
