/* Down.Town v2 — saved list, exit-intent, sticky CTA, attribution, event filters (no dependencies) */
(function () {
  "use strict";
  var doc = document;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var ls = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var ss = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  var params = new URLSearchParams(location.search);

  /* ---------- Attribution: first-touch UTM, referrer and landing page ride along with every form ---------- */
  if (!ss.get("dt-attr")) {
    var utm = [];
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach(function (k) { if (params.get(k)) utm.push(k + "=" + params.get(k)); });
    ss.set("dt-attr", JSON.stringify({ utm: utm.join("&"), ref: doc.referrer && doc.referrer.indexOf(location.host) < 0 ? doc.referrer : "", land: location.pathname }));
  }
  var attr = {}; try { attr = JSON.parse(ss.get("dt-attr") || "{}"); } catch (e) {}
  $$("form[data-form]").forEach(function (f) {
    [["source_utm", attr.utm], ["source_referrer", attr.ref], ["source_landing", attr.land], ["device", window.matchMedia("(max-width: 760px)").matches ? "mobile" : "desktop"]].forEach(function (p) {
      if (!p[1]) return;
      var i = doc.createElement("input"); i.type = "hidden"; i.name = p[0]; i.value = p[1]; f.appendChild(i);
    });
    f.addEventListener("submit", function () {
      if (/lead|matched|venue|space|relocation/i.test(f.getAttribute("data-form"))) ls.set("dt-lead", String(Date.now()));
    });
  });

  /* ---------- Saved guides (this browser only) ---------- */
  function readSaved() { try { return JSON.parse(ls.get("dt-saved") || "[]"); } catch (e) { return []; } }
  function writeSaved(a) { ls.set("dt-saved", JSON.stringify(a.slice(0, 40))); paintSaved(); }
  function paintSaved() {
    var a = readSaved(), n = $(".saved-count");
    if (n) { n.textContent = a.length; n.hidden = !a.length; }
    $$("[data-save]").forEach(function (b) {
      var on = a.some(function (x) { return x.u === b.getAttribute("data-save"); });
      b.setAttribute("aria-pressed", on); b.textContent = on ? "Saved" : "Save";
    });
    var list = $("#saved-list"), empty = $("#saved-empty");
    if (!list) return;
    list.innerHTML = "";
    a.forEach(function (x) {
      var li = doc.createElement("li"), link = doc.createElement("a"), rm = doc.createElement("button");
      link.href = x.u; link.textContent = x.t; rm.type = "button"; rm.textContent = "Remove";
      rm.addEventListener("click", function () { writeSaved(readSaved().filter(function (y) { return y.u !== x.u; })); });
      li.appendChild(link); li.appendChild(rm); list.appendChild(li);
    });
    if (empty) empty.hidden = a.length > 0;
  }
  $$("[data-save]").forEach(function (b) {
    b.addEventListener("click", function () {
      var u = b.getAttribute("data-save"), a = readSaved(), had = a.some(function (x) { return x.u === u; });
      writeSaved(had ? a.filter(function (x) { return x.u !== u; }) : [{ u: u, t: b.getAttribute("data-save-title") || doc.title }].concat(a));
    });
  });
  var drawer = $("#saved");
  function closeDrawer() { if (drawer) drawer.hidden = true; }
  $$("[data-saved-open]").forEach(function (b) { b.addEventListener("click", function () { if (drawer) { paintSaved(); drawer.hidden = false; var c = $("[data-saved-close]", drawer); if (c) c.focus(); } }); });
  $$("[data-saved-close]").forEach(function (b) { b.addEventListener("click", closeDrawer); });
  if (drawer) drawer.addEventListener("click", function (e) { if (e.target === drawer) closeDrawer(); });
  paintSaved();

  /* ---------- Exit-intent (desktop only, at most once a week, never after a request was sent) ---------- */
  var xm = $("#xmodal");
  function closeXm() { if (xm) xm.hidden = true; }
  if (xm) {
    $$("[data-xm-close]").forEach(function (b) { b.addEventListener("click", closeXm); });
    xm.addEventListener("click", function (e) { if (e.target === xm) closeXm(); });
    var armed = false, last = +(ls.get("dt-xm") || 0), lead = +(ls.get("dt-lead") || 0), week = 7 * 864e5;
    var eligible = window.matchMedia("(min-width: 900px) and (pointer: fine)").matches && Date.now() - last > week && Date.now() - lead > 30 * 864e5;
    if (eligible) {
      setTimeout(function () { armed = true; }, 15000);
      doc.addEventListener("mouseout", function (e) {
        if (!armed || e.relatedTarget || e.clientY > 8) return;
        if (!$("#consent") || !$("#consent").hidden) return;
        armed = false; ls.set("dt-xm", String(Date.now())); xm.hidden = false;
        var f = $(".intent", xm); if (f) f.focus();
      });
    }
  }

  /* ---------- Sticky mobile CTA ---------- */
  var sc = $("#sticky-cta");
  if (sc) {
    sc.hidden = false;
    var onScroll = function () {
      var consentOpen = $("#consent") && !$("#consent").hidden;
      sc.classList.toggle("show", window.scrollY > 700 && !consentOpen);
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); closeXm(); } });

  /* ---------- Month parsing for events ("Late March–April", "December", "Spring") ---------- */
  var MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  var SEASONS = { spring: [3, 4, 5], summer: [6, 7, 8], autumn: [9, 10, 11], fall: [9, 10, 11], winter: [12, 1, 2] };
  function monthsOf(txt) {
    var t = (txt || "").toLowerCase(), found = [];
    MONTHS.forEach(function (m, i) { var at = t.indexOf(m.slice(0, 3)); if (at > -1) found.push([at, i + 1]); });
    found.sort(function (a, b) { return a[0] - b[0]; });
    var ms = found.map(function (x) { return x[1]; });
    if (ms.length >= 2 && /[–-]|to|through/.test(t)) {
      var out = [], a = ms[0], b = ms[ms.length - 1], k = a;
      for (var g = 0; g < 12; g++) { out.push(k); if (k === b) break; k = k % 12 + 1; }
      return out;
    }
    if (!ms.length) Object.keys(SEASONS).forEach(function (s) { if (t.indexOf(s) > -1) ms = ms.concat(SEASONS[s]); });
    return ms;
  }
  window.DT_monthsOf = monthsOf;

  /* Events table filters */
  var evt = $("#ev-table");
  if (evt) {
    var rows = $$("tbody tr", evt), mSel = $("#ev-month"), rSel = $("#ev-region"), qIn = $("#ev-q"), cnt = $("#ev-count");
    rows.forEach(function (r) { r.setAttribute("data-m", "," + monthsOf(r.getAttribute("data-when")).join(",") + ","); });
    var now = new Date().getMonth() + 1;
    if (mSel && !params.get("month")) mSel.value = "all"; else if (mSel) mSel.value = params.get("month");
    function applyEv() {
      var m = mSel ? mSel.value : "all", rg = rSel ? rSel.value : "all", q = (qIn && qIn.value || "").toLowerCase(), n = 0;
      if (m === "now") m = String(now);
      rows.forEach(function (r) {
        var ok = (m === "all" || r.getAttribute("data-m").indexOf("," + m + ",") > -1) && (rg === "all" || r.getAttribute("data-r") === rg) && (!q || r.textContent.toLowerCase().indexOf(q) > -1);
        r.hidden = !ok; if (ok) n++;
      });
      if (cnt) cnt.textContent = n + (n === 1 ? " event" : " events");
    }
    [mSel, rSel].forEach(function (s) { if (s) s.addEventListener("change", applyEv); });
    if (qIn) qIn.addEventListener("input", applyEv);
    applyEv();
  }

  /* "This month downtown" lists (home page) */
  $$("[data-month-list]").forEach(function (box) {
    var items = $$(".month-item", box), now = new Date().getMonth() + 1, next = now % 12 + 1, shown = 0, max = +box.getAttribute("data-month-list") || 6;
    items.forEach(function (it) {
      var ms = monthsOf(it.getAttribute("data-when")), ok = ms.indexOf(now) > -1 || ms.indexOf(next) > -1;
      it.hidden = !(ok && shown < max); if (ok && shown < max) shown++;
    });
    var lbl = $("[data-month-label]"); if (lbl) lbl.textContent = new Date().toLocaleString("en", { month: "long" }) + " and " + new Date(2026, next - 1, 1).toLocaleString("en", { month: "long" });
    if (!shown) items.slice(0, max).forEach(function (it) { it.hidden = false; });
  });

  /* Contact page topic prefill (?topic=correction) */
  var topic = params.get("topic"), tSel = $("#c-topic");
  if (topic && tSel) $$("option", tSel).forEach(function (o) { if (o.value.toLowerCase().indexOf(topic) > -1) tSel.value = o.value; });
})();
