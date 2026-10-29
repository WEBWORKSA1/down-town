/* Down.Town Get Matched funnel: branching steps, estimate before contact, lead scoring, resume, follow-up qualifiers */
(function () {
  "use strict";
  var f = document.getElementById("funnel");
  if (!f) return;
  var $ = function (s, c) { return (c || f).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || f).querySelectorAll(s)); };
  var KEY = "dt-funnel";
  var steps = $$(".step"), bars = $$(".steps-bar i"), cnt = $(".step-count"), reset = $("[data-reset]");
  var order = steps.map(function (s) { return s.getAttribute("data-step"); });
  var cur = 0;
  var NEED_LABEL = { home: "Rent a home", buy: "Buy a home", office: "Office space", retail: "Retail or restaurant space", flex: "Coworking / flexible office", venue: "Event venue", relocate: "Team relocation" };
  var params = new URLSearchParams(location.search);
  var store = {
    get: function () { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };
  var fmt = function (n) { return Math.round(n).toLocaleString("en"); };
  var val = function (name) { var el = f.elements[name]; if (!el) return ""; if (el.length && !el.tagName) { var c = Array.prototype.filter.call(el, function (x) { return x.checked; }); return c.map(function (x) { return x.value; }).join(", "); } return el.type === "checkbox" ? (el.checked ? el.value : "") : el.value; };
  var need = function () { return val("need"); };

  function visible(el) { return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length); }

  function applyBranch() {
    var n = need(), city = val("city");
    f.setAttribute("data-need", n);
    $$("[data-branch]").forEach(function (b) { b.hidden = b.getAttribute("data-branch").split(" ").indexOf(n) < 0; });
    $$("[data-title-for]").forEach(function (t) { t.hidden = t.getAttribute("data-title-for").split(" ").indexOf(n) < 0; });
    $$("[data-show]").forEach(function (el) {
      var rule = el.getAttribute("data-show"), k = rule.split(":")[0], vals = rule.slice(k.length + 1);
      el.hidden = k === "need" ? vals.split(" ").indexOf(n) < 0 : city !== vals;
    });
  }

  function show(i) {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach(function (s, j) { s.hidden = j !== cur; });
    bars.forEach(function (b, j) { b.classList.toggle("on", j <= cur); });
    var total = steps.length - 1;
    if (cnt) cnt.textContent = order[cur] === "done" ? "All done" : "Step " + (cur + 1) + " of " + total;
    if (order[cur] === "estimate") estimate();
    if (cur > 0 && order[cur] !== "done") { var first = $("input:not([type=hidden]):not([type=radio]):not([type=checkbox]),select", steps[cur]); if (first && visible(first)) first.focus({ preventScroll: true }); }
    var top = f.getBoundingClientRect().top + window.scrollY - 90;
    if (window.scrollY > top) window.scrollTo({ top: top, behavior: "smooth" });
  }

  function status(msg, el) { var st = el || $(".form-status", steps[cur]); if (st) { st.className = "form-status" + (msg ? " err" : ""); st.textContent = msg || ""; } }

  function valid() {
    var step = steps[cur], ok = true;
    if (order[cur] === "need" && !need()) { ok = false; }
    $$("[required], [data-need-for]", step).forEach(function (el) {
      if (!ok || !visible(el)) return;
      var nf = el.getAttribute("data-need-for");
      if (nf && nf.split(" ").indexOf(need()) < 0) return;
      if (nf && !el.value) { el.setCustomValidity("Please fill this in so we can estimate."); } else el.setCustomValidity("");
      if (!el.checkValidity()) { el.reportValidity(); ok = false; }
    });
    return ok;
  }

  /* ----- Estimate shown before contact details (value first) ----- */
  var PER = { office: [150, 200], hybrid: [100, 150], light: [60, 100] };
  var VENUE = { reception: [8, 10], banquet: [10, 12], theatre: [6, 8], classroom: [15, 20], boardroom: [20, 25] };
  function money(n) { var c = val("currency"); return (c ? c + " " : "") + fmt(n); }
  function estimate() {
    var n = need(), box = document.getElementById("estimate"), html = "", out = "";
    if (n === "office" || n === "relocate") {
      var t = +val("team_size") || 0, r = PER[val("work_style")] || PER.hybrid, lo = t * r[0], hi = t * r[1];
      html = "<b class='big'>≈ " + fmt(lo) + "–" + fmt(hi) + " sq ft</b><p>About " + fmt(lo / 10.764) + "–" + fmt(hi / 10.764) + " m² of usable space for " + t + " people working " + ({ office: "mostly in the office", hybrid: "hybrid, 2–3 office days a week", light: "mostly remotely" })[val("work_style")] + ". Add 10–20% if you expect to grow during the lease, and remember rentable area is often 10–20% larger than usable area once common parts are added.</p>";
      out = fmt(lo) + "–" + fmt(hi) + " sq ft";
      if (n === "relocate") html += "<p>Plan 9–12 months for an office move: search and negotiation, fit-out, IT, then the move itself.</p>";
    } else if (n === "flex") {
      var d = +val("desks") || 0;
      html = "<b class='big'>" + d + (d === 1 ? " desk" : " desks") + " · " + val("flex_type").toLowerCase() + "</b><p>A private office for " + d + " typically takes about " + fmt(d * 50) + "–" + fmt(d * 70) + " sq ft inside a coworking floor. Ask for all-in pricing (meeting-room credits, IT, cleaning, mail) and compare it with a lease in the <a href='/tools/coworking-vs-lease.html'>Coworking vs Lease tool</a>.</p>";
      out = d + " desks";
    } else if (n === "home") {
      var b = +val("budget") || 0;
      html = "<b class='big'>" + money(b) + " / month</b><p>Many landlords look for gross annual income of roughly 40× the monthly rent (about " + money(b * 40) + " a year), or rent at no more than 30–35% of take-home pay. Budget for a deposit (often one to two months) and moving costs too.</p>";
      out = money(b) + "/mo";
    } else if (n === "buy") {
      var p = +val("budget") || 0;
      html = "<b class='big'>" + money(p * 0.2) + " down at 20%</b><p>On a " + money(p) + " purchase, closing and transaction costs commonly add 2–5% (" + money(p * 0.02) + "–" + money(p * 0.05) + "), with condo or strata fees monthly on top. Compare owning with renting in the <a href='/tools/rent-vs-buy.html'>Rent vs Buy tool</a>.</p>";
      out = money(p);
    } else if (n === "retail") {
      var rb = +val("budget_retail") || 0;
      html = "<b class='big'>" + (rb ? "≈ " + fmt(rb * 12 / 0.1) + " a year in sales" : "Occupancy cost under 8–12% of sales") + "</b><p>" + (rb ? "At " + fmt(rb) + " a month all-in, a common rule of thumb (occupancy cost around 10% of sales; 6–10% for restaurants) points to roughly that level of turnover. " : "That is the common rule of thumb for rent plus charges (6–10% for restaurants). ") + "Test a location with the <a href='/tools/storefront-revenue.html'>Storefront Revenue Estimator</a>.</p>";
      out = rb ? fmt(rb) + "/mo" : "";
    } else if (n === "venue") {
      var g = +val("guests") || 0, lay = val("layout") || "reception", v = VENUE[lay], bud = +val("budget_event") || 0;
      html = "<b class='big'>≈ " + fmt(g * v[0]) + "–" + fmt(g * v[1]) + " sq ft room</b><p>A " + f.elements.layout.selectedOptions[0].text.toLowerCase() + " for " + g + " guests needs about " + fmt(g * v[0] / 10.764) + "–" + fmt(g * v[1] / 10.764) + " m² of clear floor." + (bud && g ? " Your budget works out at about " + fmt(bud / g) + " per guest, all in." : "") + " Ask venues about food-and-drink minimums and hold periods.</p>";
      out = g + " guests";
    }
    box.innerHTML = html || "<p>Answer the questions above and we'll size it up.</p>";
    f.dataset.estimate = out;
    var rows = [["Need", NEED_LABEL[n]], ["Downtown", val("city") === "Another city" ? val("city_other") : val("city")], ["When", val("timeline")]];
    if (val("musthave")) rows.push(["Must-haves", val("musthave")]);
    document.getElementById("summary").innerHTML = rows.filter(function (r) { return r[1]; }).map(function (r) { return "<li><span>" + r[0] + "</span><b></b></li>"; }).join("");
    $$("#summary b").forEach(function (b, i) { b.textContent = rows.filter(function (r) { return r[1]; })[i][1]; });
  }

  /* ----- Lead score (internal triage) ----- */
  function score() {
    var n = need(), s = { office: 30, relocate: 30, retail: 25, venue: 20, buy: 20, flex: 15, home: 10 }[n] || 0;
    s += { "As soon as possible": 25, "Within 1 month": 25, "1–3 months": 20, "3–6 months": 12, "6–12 months": 6, "12+ months": 3 }[val("timeline")] || 0;
    var t = +val("team_size") || 0, g = +val("guests") || 0;
    if (t >= 50) s += 20; else if (t >= 15) s += 12; else if (t >= 5) s += 6;
    if (g >= 200) s += 15; else if (g >= 50) s += 8;
    if ((n === "buy" || n === "home") && val("budget")) s += n === "buy" ? 10 : 5;
    if (val("phone")) s += 10;
    if (val("company")) s += 5;
    s = Math.min(100, s);
    return [s, s >= 65 ? "A" : s >= 40 ? "B" : "C"];
  }

  /* ----- Persist / restore ----- */
  function save() {
    var o = {};
    new FormData(f).forEach(function (v, k) { if (k === "_hp" || k === "consent" || k === "email" || k === "phone") return; o[k] = o[k] ? [].concat(o[k], v) : v; });
    o._step = cur; store.set(o); if (reset) reset.hidden = false;
  }
  function restore(o) {
    Object.keys(o).forEach(function (k) {
      if (k === "_step") return;
      var el = f.elements[k]; if (!el) return;
      var vals = [].concat(o[k]);
      if (el.length && !el.tagName) Array.prototype.forEach.call(el, function (x) { x.checked = vals.indexOf(x.value) > -1; });
      else if (el.type === "checkbox") el.checked = vals.indexOf(el.value) > -1;
      else el.value = vals[0];
    });
  }
  function setNeed(v) { var r = $("input[name=need][value='" + v + "']"); if (r) { r.checked = true; return true; } return false; }
  function setCity(v) {
    var sel = f.elements.city, lv = (v || "").toLowerCase();
    Array.prototype.forEach.call(sel.options, function (o) { if (o.value.toLowerCase() === lv || (o.getAttribute("data-slug") || "") === lv) sel.value = o.value; });
  }

  var saved = store.get(), start = 0;
  if (saved && !params.get("need")) { restore(saved); start = Math.min(saved._step || 0, order.indexOf("contact")); if (reset) reset.hidden = false; }
  var pn = params.get("need") || ({ move: "home", business: "retail" })[location.hash.slice(1)];
  if (pn && setNeed(pn)) start = 1;
  if (params.get("city")) setCity(params.get("city"));
  [["team", "team_size"], ["people", "team_size"], ["guests", "guests"], ["desks", "desks"], ["budget", "budget"]].forEach(function (p) { if (params.get(p[0]) && f.elements[p[1]]) f.elements[p[1]].value = params.get(p[0]); });
  if (pn && params.get("city") && start === 1) start = 2;
  applyBranch(); show(start);

  /* ----- Events ----- */
  $$("input[name=need]").forEach(function (r) { r.addEventListener("change", function () { applyBranch(); save(); setTimeout(function () { show(1); }, 140); }); });
  f.addEventListener("change", function (e) { if (e.target.name === "city" || e.target.name === "need") applyBranch(); if (order[cur] !== "done") save(); });
  $$("[data-next]").forEach(function (b) { b.addEventListener("click", function () { if (valid()) { status(""); show(cur + 1); save(); } }); });
  $$("[data-prev]").forEach(function (b) { b.addEventListener("click", function () { show(cur - 1); }); });
  if (reset) reset.addEventListener("click", function () { store.clear(); f.reset(); applyBranch(); show(0); reset.hidden = true; });
  f.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target.tagName === "INPUT" && order[cur] !== "contact") { e.preventDefault(); var nx = $("[data-next]", steps[cur]); if (nx) nx.click(); } });

  function send(data, onOk, onErr) {
    var url = typeof window.DT_RELAY === "function" ? window.DT_RELAY() : "";
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(onOk).catch(onErr);
  }

  f.addEventListener("submit", function (e) {
    e.preventDefault();
    if (order[cur] !== "contact") return;
    if (!valid()) return;
    var hp = f.elements._hp; if (hp && hp.value) return;
    var btn = $("[type=submit]"), data = {};
    var doneStep = steps[order.indexOf("done")];
    new FormData(f).forEach(function (v, k) {
      if (k === "_hp" || v === "" || k === "call" || k === "slots") return;
      var el = f.elements[k], node = el && (el.tagName ? el : el[0]);
      if (node && node.closest && node.closest("[data-branch][hidden], [data-show][hidden]")) return;
      data[k] = data[k] ? data[k] + ", " + v : v;
    });
    var sc = score(), n = need(), city = val("city") === "Another city" ? val("city_other") || "Another city" : val("city");
    data.need = NEED_LABEL[n] || n; data.city = city;
    data.estimate = f.dataset.estimate || ""; data.lead_score = sc[0]; data.lead_tier = sc[1];
    data._subject = "Down.Town | Lead " + sc[1] + " | " + data.need + " | " + city + " | " + (data.name || "");
    data._template = "table"; data._captcha = "false"; data.form = "Get matched lead"; data.page = location.href; data.submitted = new Date().toISOString();
    ["source_utm", "source_referrer", "source_landing", "device"].forEach(function (k) { var el = document.querySelector("form[data-form] input[name=" + k + "]"); if (el) data[k] = el.value; });
    if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }
    status("");
    send(data, function () {
      store.clear();
      try { localStorage.setItem("dt-lead", String(Date.now())); } catch (er) {}
      var fn = $("[data-first-name]"); if (fn && data.name) fn.textContent = ", " + data.name;
      f.dataset.email = data.email; f.dataset.subject = data._subject;
      show(order.indexOf("done")); if (reset) reset.hidden = true;
    }, function () {
      status("Not sent: the connection dropped. Check your network and press the button again.");
    });
    setTimeout(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; } }, 1500);
  });

  var fu = $("[data-followup]");
  if (fu) fu.addEventListener("click", function () {
    var st = $("[data-followup-status]");
    var data = { form: "Lead follow-up", email: f.dataset.email || "", call: val("call"), slots: val("slots"), _subject: "Down.Town | Follow-up | " + (f.dataset.subject || ""), _template: "table", _captcha: "false", submitted: new Date().toISOString() };
    if (!data.call && !data.slots) { status("Pick an option first, or skip this step.", st); return; }
    fu.disabled = true;
    send(data, function () { st.className = "form-status ok"; st.textContent = "Thanks — we'll pass that on with your introductions."; }, function () { fu.disabled = false; status("Not sent. Please try again.", st); });
  });
  $$("input[name=slots]").forEach(function (c) { c.addEventListener("change", function () { var on = $$("input[name=slots]:checked"); if (on.length > 3) c.checked = false; }); });
})();
