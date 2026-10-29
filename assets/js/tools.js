/* Down.Town — interactive tools. Everything runs in the browser; nothing is sent unless a form is submitted. */
(function () {
  "use strict";
  var doc = document, C = window.DT_CITIES || [];
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var num = function (id) { var el = doc.getElementById(id); var v = el ? parseFloat(el.value) : 0; return isFinite(v) ? v : 0; };
  var money = function (v) { var s = Math.round(Math.abs(v)).toLocaleString(); return (v < 0 ? "−" : "") + s; };
  var set = function (id, t) { var el = doc.getElementById(id); if (el) el.textContent = t; };
  var params = new URLSearchParams(location.search);
  var KEYS = ["walk", "transit", "food", "night", "culture", "family", "business", "value"];
  var LABEL = { walk: "Walkability", transit: "Transit", food: "Food & drink", night: "Nightlife", culture: "Culture", family: "Family life", business: "Business climate", value: "Value for money" };
  var ROOT = doc.documentElement.getAttribute("data-root") || "";

  /* ---------- Find Your Downtown ---------- */
  var mf = $("#match-form");
  if (mf && C.length) {
    var words = ["Doesn't matter", "Nice to have", "Matters", "Important", "Essential"];
    var run = function () {
      var w = {}; $$("[data-w]", mf).forEach(function (r) { w[r.getAttribute("data-w")] = +r.value; var o = r.parentNode.querySelector("output"); if (o) o.textContent = words[+r.value]; });
      var reg = $("#w-region").value, tot = 0; KEYS.forEach(function (k) { tot += w[k]; });
      var res = C.filter(function (c) { return reg === "all" || c.rslug === reg; }).map(function (c) {
        var s = 0; KEYS.forEach(function (k) { s += w[k] * c.s[k]; });
        return { c: c, pct: tot ? Math.round(s / tot * 10) : c.index };
      }).sort(function (a, b) { return b.pct - a.pct; });
      var list = $("#m-list"); list.innerHTML = "";
      if (!res.length) { set("m-top", "—"); return; }
      set("m-top", "Downtown " + res[0].c.name);
      res.slice(0, 5).forEach(function (r, i) {
        var li = doc.createElement("li");
        li.innerHTML = '<span class="pct">' + r.pct + '%</span><a></a><span class="small">' + r.c.region + "</span>";
        var a = li.querySelector("a"); a.href = ROOT + "explore/" + r.c.slug + ".html"; a.textContent = (i + 1) + ". " + r.c.name;
        list.appendChild(li);
      });
      var top = res[0].c, best = KEYS.slice().sort(function (a, b) { return (w[b] * top.s[b]) - (w[a] * top.s[a]); }).slice(0, 2);
      set("m-why", top.name + " leads on what you weighted most: " + LABEL[best[0]].toLowerCase() + " (" + top.s[best[0]] + "/10) and " + LABEL[best[1]].toLowerCase() + " (" + top.s[best[1]] + "/10).");
      var h = $("#m-hidden"); if (h) h.value = res.slice(0, 5).map(function (r) { return r.c.name + " " + r.pct + "%"; }).join(", ");
      var p = $("#m-prio"); if (p) p.value = KEYS.map(function (k) { return LABEL[k] + ": " + words[w[k]]; }).join("; ");
    };
    mf.addEventListener("input", run); $("#w-region").addEventListener("change", run); run();
  }

  /* ---------- Compare ---------- */
  var ct = $("#cmp-table");
  if (ct && C.length) {
    var a = $("#cmp-a"), b = $("#cmp-b"), c3 = $("#cmp-c");
    a.value = params.get("a") || "toronto"; b.value = params.get("b") || "chicago"; c3.value = params.get("c") || "";
    var by = {}; C.forEach(function (x) { by[x.slug] = x; });
    var draw = function () {
      var picks = [a.value, b.value, c3.value].filter(function (v, i, arr) { return v && by[v] && arr.indexOf(v) === i; }).map(function (v) { return by[v]; });
      var head = "<thead><tr><th>Category</th>" + picks.map(function (p) { return '<th><a href="' + ROOT + "explore/" + p.slug + '.html">' + p.name + "</a></th>"; }).join("") + "</tr></thead>";
      var wins = {}; picks.forEach(function (p) { wins[p.slug] = 0; });
      var rows = KEYS.map(function (k) {
        var mx = Math.max.apply(null, picks.map(function (p) { return p.s[k]; }));
        return "<tr><th>" + LABEL[k] + "</th>" + picks.map(function (p) { var w = p.s[k] === mx && picks.length > 1; if (w) wins[p.slug]++; return '<td class="' + (w ? "win" : "") + '">' + p.s[k] + "/10</td>"; }).join("") + "</tr>";
      }).join("");
      var idx = "<tr><th>Down.Town Index</th>" + picks.map(function (p) { return "<td><b>" + p.index + "</b>/100</td>"; }).join("") + "</tr>";
      ct.innerHTML = head + "<tbody>" + idx + rows + "</tbody>";
      var sorted = picks.slice().sort(function (x, y) { return wins[y.slug] - wins[x.slug] || y.index - x.index; });
      set("cmp-verdict", picks.length < 2 ? "Pick at least two different downtowns." :
        sorted[0].name + " wins " + wins[sorted[0].slug] + " of 8 categories; " + sorted[1].name + " wins " + wins[sorted[1].slug] + ". Ties count for both. Read each guide before deciding — scores can't capture everything.");
      var q = "?a=" + a.value + "&b=" + b.value + (c3.value ? "&c=" + c3.value : "");
      history.replaceState(null, "", q);
    };
    [a, b, c3].forEach(function (s) { s.addEventListener("change", draw); }); draw();
  }

  /* ---------- Rent budget ---------- */
  if ($("#rent-form")) {
    var rent = function () {
      var inc = num("r-income"), g = inc / 12, net = g * (1 - num("r-tax") / 100), debt = num("r-debt"), car = num("r-car"), save = net * num("r-save") / 100;
      var r25 = g * .25, r30 = g * .30, r35 = g * .35;
      var main = Math.max(0, Math.min(r30, net - debt - save - net * 0.35) + car);
      set("r-main", money(main) + " / month"); set("r-25", money(r25)); set("r-30", money(r30)); set("r-35", money(r35)); set("r-net", money(net));
      var left = net - main - debt - save + car; set("r-left", money(left));
      set("r-verdict", main < r25 ? "Your debts and savings goal keep housing below the 25% line — that's a cautious, resilient budget. Paying down debt raises it fastest." :
        main <= r30 + car ? "This budget sits within the classic 30% rule" + (car ? ", boosted by the car costs you'd drop." : ".") + " Landlords often ask for income of about 2.5–3× the rent." :
        "This stretches past 30% of gross income. It can work if other costs are low — check the 'left after' line covers food, transport and emergencies.");
    };
    $("#rent-form").addEventListener("input", rent); rent();
  }

  /* ---------- Car vs car-free ---------- */
  if ($("#car-form")) {
    var car2 = function () {
      var own = (num("c-dep") + num("c-ins") + num("c-fuel") + num("c-park")) * 12 + num("c-maint") + num("c-reg");
      var free = num("a-pass") * 12 + num("a-bike") + num("a-ride") * num("a-ridec") * 12 + num("a-rent") * num("a-rentc");
      var save = own - free;
      set("car-save", money(save) + " / year"); set("car-own", money(own)); set("car-free", money(free)); set("car-month", money(save / 12));
      set("car-days", num("a-rentc") > 0 ? Math.max(0, Math.floor(save / num("a-rentc"))) + " more days" : "—");
      set("car-verdict", save > 0 ? "Going car-free saves about " + money(save) + " a year on these numbers. That's " + money(save / 12) + " a month you could put toward rent closer to work." :
        "On these numbers, keeping the car is cheaper. Check depreciation and parking — they are the most often underestimated costs.");
    };
    $("#car-form").addEventListener("input", car2); car2();
  }

  /* ---------- Storefront revenue ---------- */
  if ($("#sf-form")) {
    var sf = function () {
      var pass = num("sf-pass"), days = num("sf-days"), ent = num("sf-enter") / 100, buy = num("sf-buy") / 100, tk = num("sf-ticket"), m = num("sf-margin") / 100;
      var vis = pass * ent, cust = vis * buy, rev = cust * tk * days, gp = rev * m, rent = num("sf-rent"), fixed = num("sf-fixed"), profit = gp - rent - fixed;
      var be = (tk * m * days) > 0 ? (rent + fixed) / (tk * m * days) : 0, occ = rev > 0 ? rent / rev * 100 : 0;
      set("sf-rev", money(rev) + " / month"); set("sf-vis", Math.round(vis).toLocaleString()); set("sf-cust", Math.round(cust).toLocaleString());
      set("sf-gp", money(gp)); set("sf-occ", rev > 0 ? occ.toFixed(1) + "%" : "—"); set("sf-profit", money(profit)); set("sf-be", Math.ceil(be).toLocaleString());
      set("sf-verdict", rev <= 0 ? "Enter foot traffic and conversion to see an estimate." :
        profit < 0 ? "On these numbers the space loses about " + money(-profit) + " a month. You'd need about " + Math.ceil(be) + " customers a day (you have " + Math.round(cust) + ") — negotiate rent, raise average sale, or find more traffic." :
        occ > 15 ? "Profitable on paper, but occupancy is " + occ.toFixed(1) + "% of sales — high. A slow month could hurt. Push for rent-free months or a TI allowance." :
        "This space pencils out: occupancy is " + occ.toFixed(1) + "% of sales and the margin covers fixed costs. Stress-test it with a lower entry rate before signing.");
    };
    $("#sf-form").addEventListener("input", sf); sf();
  }

  /* ---------- Rankings sort ---------- */
  var rt = $("#rank-table");
  if (rt) {
    var dir = {};
    $$("[data-sort]", rt).forEach(function (b) {
      b.addEventListener("click", function () {
        var col = +b.getAttribute("data-sort"), body = rt.tBodies[0], rows = $$("tr", body);
        dir[col] = !dir[col];
        rows.sort(function (x, y) { var a1 = +x.cells[col].getAttribute("data-v"), b1 = +y.cells[col].getAttribute("data-v"); return dir[col] ? b1 - a1 : a1 - b1; });
        rows.forEach(function (r, i) { r.cells[0].textContent = i + 1; body.appendChild(r); });
        $$("[data-sort]", rt).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      });
    });
  }

  /* ---------- Events filter ---------- */
  var ev = $("#ev-list");
  if (ev) {
    var chips = $$("[data-evr]");
    chips.forEach(function (ch) {
      ch.addEventListener("click", function () {
        var r = ch.getAttribute("data-evr");
        chips.forEach(function (x) { x.setAttribute("aria-pressed", x === ch); });
        $$("#ev-list > div").forEach(function (d) { d.hidden = !(r === "all" || d.getAttribute("data-r") === r); });
      });
    });
  }
})();
