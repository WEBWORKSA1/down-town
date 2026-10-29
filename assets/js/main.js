/* Down.Town — core interactions (no dependencies) */
(function () {
  "use strict";
  var S = window.SITE || {};
  var doc = document, root = doc.documentElement;
  var ROOT = root.getAttribute("data-root") || "";
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var params = new URLSearchParams(location.search);

  /* Theme toggle */
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme");
      var dark = cur ? cur === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next); store.set("dt-theme", next);
    });
  });

  /* Mobile menu */
  var mb = $(".menu-btn"), nav = $("#nav");
  if (mb && nav) {
    mb.addEventListener("click", function () {
      var ob = $(".owner-bar"); root.style.setProperty("--ob", (ob ? Math.max(0, ob.getBoundingClientRect().bottom) : 0) + "px");
      var open = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", open);
    });
  }

  /* Skylines: deterministic, generated from a seed so every city keeps its own outline */
  function rng(seed) {
    var h = 1779033703 ^ seed.length;
    for (var i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return function () { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
  }
  $$("[data-sky]").forEach(function (el) {
    var r = rng(el.getAttribute("data-sky")), tall = +el.getAttribute("data-tall") || 2, w = +el.getAttribute("data-w") || 1200,
        h = +el.getAttribute("data-h") || 150, dens = +el.getAttribute("data-d") || 0.2, base = el.getAttribute("data-base") || "#2b3449";
    var ri = function (a, b) { return a + Math.floor(r() * (b - a + 1)); }, x = 0, rects = "", wins = "";
    while (x < w) {
      var bw = ri(26, 64), bh = ri(Math.floor(h * 0.22), Math.min(Math.floor(h * (0.42 + 0.12 * tall)), h - 6));
      if (r() < 0.08 * tall) bh = Math.min(h - 2, Math.floor(bh * 1.45));
      var y = h - bh;
      rects += '<rect x="' + x + '" y="' + y + '" width="' + (bw - 3) + '" height="' + bh + '"/>';
      if (r() < 0.25 && bh > h * 0.5) rects += '<rect x="' + (x + (bw >> 1) - 2) + '" y="' + (y - 10) + '" width="3" height="10"/>';
      for (var ry = y + 7; ry < h - 6; ry += 11) for (var rx = x + 5; rx < x + bw - 8; rx += 9) if (r() < dens) wins += '<rect x="' + rx + '" y="' + ry + '" width="4" height="5"/>';
      x += bw;
    }
    el.innerHTML = '<svg viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"><g fill="' + base + '">' + rects + '</g><g fill="#ffd166" opacity=".85">' + wins + "</g></svg>";
  });

  /* Route-map train: one orchestrated moment; parked at the hub for reduced motion */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$(".routemap .train").forEach(function (t) { var a = t.querySelector("animateMotion"); if (a) a.remove(); t.setAttribute("cx", 505); t.setAttribute("cy", 170); });
  }

  $$("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  /* Consent notice */
  function npa() { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }
  if (store.get("dt-consent") === "essential") npa();
  var c = $("#consent");
  if (c && !store.get("dt-consent")) {
    c.hidden = false;
    $$("[data-consent]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-consent"); store.set("dt-consent", v);
        if (v === "essential") npa();
        c.hidden = true;
      });
    });
  }

  /* Manual ad units (only when slot IDs are configured; Auto ads run regardless) */
  $$(".ad-zone").forEach(function (z) {
    var slot = (S.adSlots || {})[z.getAttribute("data-slot")];
    if (!slot) { z.remove(); return; }
    z.classList.add("filled");
    var ins = doc.createElement("ins");
    ins.className = "adsbygoogle"; ins.style.display = "block";
    ins.setAttribute("data-ad-client", S.adsenseClient); ins.setAttribute("data-ad-slot", slot);
    ins.setAttribute("data-ad-format", "auto"); ins.setAttribute("data-full-width-responsive", "true");
    z.appendChild(ins);
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  });

  /* Form relay: address assembled at runtime only */
  function relay() {
    if (S.relayAlias) return "https://formsubmit.co/ajax/" + S.relayAlias;
    var k = S._k || [];
    var dec = function (s) { return atob(s).split("").reverse().join(""); };
    return "https://formsubmit.co/ajax/" + dec(k[0] + k[1]) + String.fromCharCode(64) + dec(k[2] + k[3]);
  }
  window.DT_RELAY = relay;

  /* Hidden-address mail links: <a data-mail="Subject">text</a> */
  $$("a[data-mail]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var k = S._k || [], dec = function (s) { return atob(s).split("").reverse().join(""); };
      location.href = "mai" + "lto:" + dec(k[0] + k[1]) + String.fromCharCode(64) + dec(k[2] + k[3]) +
        "?subject=" + encodeURIComponent(a.getAttribute("data-mail") || "Down.Town enquiry");
    });
  });

  /* Prefill fields from URL (?city=chicago&interest=...) */
  $$("form [data-prefill]").forEach(function (el) {
    var v = params.get(el.getAttribute("data-prefill"));
    if (!v) return;
    if (el.tagName === "SELECT") {
      $$("option", el).forEach(function (o) { if (o.value === v || o.textContent === v) el.value = o.value; });
    } else el.value = v;
  });

  /* Character counters */
  $$("[data-count]").forEach(function (t) {
    var out = doc.getElementById(t.getAttribute("data-count")); var max = +t.getAttribute("maxlength") || 0;
    var upd = function () { if (out) out.textContent = t.value.length + " / " + max; };
    t.addEventListener("input", upd); upd();
  });

  /* Multi-step forms */
  $$("form[data-steps]").forEach(function (f) {
    var steps = $$(".step", f), bars = $$(".steps-bar i", f), cnt = $(".step-count", f), i = 0;
    function status(msg) { var st = $(".form-status", f); if (st) { st.className = "form-status" + (msg ? " err" : ""); st.textContent = msg || ""; } }
    function show(n) {
      steps.forEach(function (s, j) { s.hidden = j !== n; });
      bars.forEach(function (b, j) { b.classList.toggle("on", j <= n); });
      if (cnt) cnt.textContent = "Step " + (n + 1) + " of " + steps.length;
      i = n;
      if (n > 0) { var first = $("input:not([type=hidden]),select,textarea", steps[n]); if (first) first.focus({ preventScroll: true }); }
    }
    function valid() {
      var ok = true;
      $$("[required]", steps[i]).forEach(function (el) { if (ok && !el.checkValidity()) { el.reportValidity(); ok = false; } });
      var g = $("[data-need-one]", steps[i]);
      if (ok && g && !$("input:checked", g)) { status("Choose at least one option to continue."); ok = false; }
      if (ok) status("");
      return ok;
    }
    $$("[data-next]", f).forEach(function (b) { b.addEventListener("click", function () { if (valid()) show(i + 1); }); });
    $$("[data-prev]", f).forEach(function (b) { b.addEventListener("click", function () { show(i - 1); }); });
    /* one-tap: radio choices in a [data-auto] step advance automatically */
    $$(".step[data-auto] input[type=radio]", f).forEach(function (r) {
      r.addEventListener("change", function () { setTimeout(function () { if (valid()) show(i + 1); }, 160); });
    });
    show(0);
  });

  /* Submit all forms through the relay */
  $$("form[data-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = $(".form-status", f), btn = $("[type=submit]", f);
      var hp = $(".hp input", f); if (hp && hp.value) return;
      var data = {};
      new FormData(f).forEach(function (v, k) {
        if (k === "_hp" || v === "") return;
        data[k] = data[k] ? data[k] + ", " + v : v;
      });
      var kind = f.getAttribute("data-form");
      data._subject = "Down.Town | " + kind + (data.name ? " | " + data.name : "") + (data.city ? " | " + data.city : "");
      data._template = "table"; data._captcha = "false";
      data.form = kind; data.page = location.href; data.submitted = new Date().toISOString();
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }
      if (status) { status.className = "form-status"; status.textContent = ""; }
      fetch(relay(), { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function () {
          var go = f.getAttribute("data-redirect");
          if (go) { location.href = ROOT + go + "?f=" + encodeURIComponent(kind); return; }
          if (status) { status.className = "form-status ok"; status.textContent = f.getAttribute("data-ok") || "Sent. We reply within two business days."; }
          f.reset();
        })
        .catch(function () {
          if (status) { status.className = "form-status err"; status.textContent = "Not sent: the connection dropped. Check your network and press the button again."; }
        })
        .finally(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; } });
    });
  });

  /* Lite YouTube: nothing loads from YouTube until a visitor presses play */
  $$("[data-yt]").forEach(function (b) {
    var id = b.getAttribute("data-yt");
    b.style.backgroundImage = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";
    b.addEventListener("click", function () {
      var fr = doc.createElement("iframe");
      fr.className = "yt-frame";
      fr.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      fr.title = b.getAttribute("aria-label") || "Video";
      fr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      fr.allowFullscreen = true;
      b.replaceWith(fr);
    });
  });

  /* Track tabs (Get Matched) */
  $$("[role=tablist]").forEach(function (tl) {
    var tabs = $$("[role=tab]", tl);
    function sel(t) {
      tabs.forEach(function (x) {
        var on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1;
        var p = doc.getElementById(x.getAttribute("aria-controls")); if (p) p.hidden = !on;
      });
    }
    tabs.forEach(function (t, n) {
      t.addEventListener("click", function () { sel(t); history.replaceState(null, "", "#" + t.getAttribute("data-track")); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var nx = tabs[(n + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; nx.focus(); sel(nx); }
      });
    });
    var want = location.hash.slice(1) || params.get("track");
    var start = tabs.filter(function (t) { return t.getAttribute("data-track") === want; })[0] || tabs[0];
    sel(start);
  });

  /* Support: tiers, recurring toggle, payment links */
  var tiers = $$(".tier");
  if (tiers.length) {
    var amt = $("#amount");
    tiers.forEach(function (t) {
      t.addEventListener("click", function () {
        tiers.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        t.setAttribute("aria-pressed", "true");
        if (amt) amt.value = t.getAttribute("data-amount");
        var lvl = $("#level"); if (lvl) lvl.value = t.getAttribute("data-name");
      });
    });
  }
  $$(".toggle").forEach(function (tg) {
    var bs = $$("button", tg), out = doc.getElementById(tg.getAttribute("data-target"));
    bs.forEach(function (b) {
      b.addEventListener("click", function () {
        bs.forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        if (out) out.value = b.getAttribute("data-value");
        $$("[data-per]").forEach(function (s) { s.textContent = b.getAttribute("data-value") === "monthly" ? "/mo" : ""; });
      });
    });
  });
  var box = $("#pay-links");
  if (box) {
    var p = S.payments || {}, any = false;
    [["paypal", "Give with PayPal"], ["stripe", "Give by card"], ["buymeacoffee", "Buy us a coffee"], ["kofi", "Support on Ko-fi"]].forEach(function (l) {
      if (!p[l[0]]) return; any = true;
      var a = doc.createElement("a"); a.href = p[l[0]]; a.className = "btn amber"; a.target = "_blank"; a.rel = "noopener"; a.textContent = l[1]; box.appendChild(a);
    });
    var pn = $("#pay-note"); if (pn) pn.hidden = !any;
  }

  /* Contents list for long articles */
  var toc = $("#toc"), prose = $(".prose");
  if (toc && prose) {
    var hs = $$("h2", prose);
    if (hs.length < 3) { toc.closest(".card").remove(); }
    else {
      var ol = doc.createElement("ol");
      hs.forEach(function (h, n) {
        if (!h.id) h.id = "s" + (n + 1) + "-" + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
        var li = doc.createElement("li"), a = doc.createElement("a"); a.href = "#" + h.id; a.textContent = h.textContent; li.appendChild(a); ol.appendChild(li);
      });
      toc.appendChild(ol);
    }
  }

  /* Share */
  $$("[data-share]").forEach(function (b) {
    b.addEventListener("click", function () {
      var url = location.href.split("#")[0], title = doc.title;
      if (b.getAttribute("data-share") === "native" && navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { b.textContent = "Link copied"; setTimeout(function () { b.textContent = "Copy link"; }, 1800); });
    });
  });

  /* Back to top */
  var tt = $(".to-top");
  if (tt) {
    window.addEventListener("scroll", function () { tt.classList.toggle("show", window.scrollY > 1200); }, { passive: true });
    tt.addEventListener("click", function () { window.scrollTo({ top: 0 }); });
  }

  /* Site search (index loads on first open) */
  var ov = $("#search"), qi = $("#q"), res = $("#search-res"), loaded = false, selIdx = -1;
  function loadIndex(cb) {
    if (loaded || window.DT_SEARCH) { loaded = true; cb(); return; }
    var s = doc.createElement("script"); s.src = ROOT + "assets/js/search-index.js";
    s.onload = function () { loaded = true; cb(); }; doc.head.appendChild(s);
  }
  function render(q) {
    var idx = window.DT_SEARCH || [], terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    var hits = !terms.length ? idx.slice(0, 8) : idx.map(function (d) {
      var hay = (d.t + " " + d.d + " " + (d.x || "")).toLowerCase(), sc = 0;
      terms.forEach(function (t) { if (d.t.toLowerCase().indexOf(t) > -1) sc += 5; else if (hay.indexOf(t) > -1) sc += 1; else sc -= 20; });
      return [sc, d];
    }).filter(function (x) { return x[0] > 0; }).sort(function (a, b) { return b[0] - a[0]; }).slice(0, 12).map(function (x) { return x[1]; });
    res.innerHTML = "";
    if (!hits.length) { res.innerHTML = '<li class="muted" style="padding:1rem">No matches. Try a city name, "lease", "rent" or "contest".</li>'; return; }
    hits.forEach(function (d) {
      var li = doc.createElement("li"), a = doc.createElement("a"); a.href = ROOT + d.u;
      a.innerHTML = '<span class="bullet ' + d.k + '">' + d.k.toUpperCase() + '</span><b></b><small></small>';
      a.querySelector("b").textContent = d.t; a.querySelector("small").textContent = d.d;
      li.appendChild(a); res.appendChild(li);
    });
    selIdx = -1;
  }
  function openSearch(q) {
    if (!ov) return;
    ov.hidden = false; qi.value = q || ""; qi.focus();
    loadIndex(function () { render(qi.value); });
  }
  function closeSearch() { if (ov) ov.hidden = true; }
  window.DT_openSearch = openSearch;
  $$("[data-search-open]").forEach(function (b) { b.addEventListener("click", function () { openSearch(""); }); });
  if (ov) {
    ov.addEventListener("click", function (e) { if (e.target === ov) closeSearch(); });
    qi.addEventListener("input", function () { render(qi.value); });
    qi.addEventListener("keydown", function (e) {
      var links = $$("a", res);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); selIdx = Math.max(0, Math.min(links.length - 1, selIdx + (e.key === "ArrowDown" ? 1 : -1)));
        links.forEach(function (l, n) { l.classList.toggle("sel", n === selIdx); });
      } else if (e.key === "Enter") { var t = links[selIdx >= 0 ? selIdx : 0]; if (t) location.href = t.href; }
    });
  }
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSearch();
    var typing = /INPUT|TEXTAREA|SELECT/.test((doc.activeElement || {}).tagName);
    if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") || (e.key === "/" && !typing)) { e.preventDefault(); openSearch(""); }
  });
  if (params.get("q")) openSearch(params.get("q"));
  var finder = $("#finder");
  if (finder) finder.addEventListener("submit", function (e) { e.preventDefault(); openSearch($("input", finder).value); });

  /* Explore directory: region chips, text filter, sort, on-demand map */
  var dir = $("#city-dir");
  if (dir) {
    var tiles = $$(".city-tile", dir), chips = $$("[data-region]"), fq = $("#city-q"), sortSel = $("#city-sort"), empty = $("#city-empty");
    var region = params.get("region") || "all";
    function apply() {
      var q = (fq && fq.value || "").toLowerCase(), shown = 0;
      tiles.forEach(function (t) {
        var ok = (region === "all" || t.getAttribute("data-r") === region) && (!q || t.getAttribute("data-s").indexOf(q) > -1);
        t.hidden = !ok; if (ok) shown++;
      });
      chips.forEach(function (ch) { ch.setAttribute("aria-pressed", ch.getAttribute("data-region") === region); });
      if (empty) empty.hidden = shown > 0;
    }
    chips.forEach(function (ch) { ch.addEventListener("click", function () { region = ch.getAttribute("data-region"); apply(); }); });
    if (fq) fq.addEventListener("input", apply);
    if (sortSel) sortSel.addEventListener("change", function () {
      var k = sortSel.value;
      tiles.sort(function (a, b) {
        if (k === "name") return a.getAttribute("data-n").localeCompare(b.getAttribute("data-n"));
        return (+b.getAttribute("data-" + k)) - (+a.getAttribute("data-" + k));
      }).forEach(function (t) { dir.appendChild(t); });
    });
    apply();
  }
  var mapBtn = $("#show-map");
  if (mapBtn) mapBtn.addEventListener("click", function () {
    var m = $("#map"); m.hidden = false; mapBtn.hidden = true;
    var css = doc.createElement("link"); css.rel = "stylesheet"; css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"; doc.head.appendChild(css);
    var s = doc.createElement("script"); s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    s.onload = function () {
      var L = window.L, map = L.map(m, { scrollWheelZoom: false, worldCopyJump: true }).setView([25, 10], 2);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
      (window.DT_CITIES || []).forEach(function (cty) {
        L.circleMarker([cty.lat, cty.lng], { radius: 8, color: "#1d2330", weight: 3, fillColor: "#f2a900", fillOpacity: 1 })
          .addTo(map).bindPopup('<b>' + cty.name + '</b><br>' + cty.district + '<br><a href="' + ROOT + 'explore/' + cty.slug + '.html">Open the guide</a>');
      });
    };
    doc.head.appendChild(s);
  });
})();
