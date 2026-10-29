/* Down.Town v2 calculators: office space, coworking vs lease, venue budget, moving cost, rent vs buy */
(function () {
  "use strict";
  var doc = document;
  var $ = function (s) { return doc.querySelector(s); };
  var num = function (id) { var el = doc.getElementById(id); var v = el ? parseFloat(el.value) : 0; return isFinite(v) ? v : 0; };
  var str = function (id) { var el = doc.getElementById(id); return el ? el.value : ""; };
  var fmt = function (v) { return Math.round(v).toLocaleString("en"); };
  var set = function (id, t) { var el = doc.getElementById(id); if (el) el.textContent = t; };
  var html = function (id, t) { var el = doc.getElementById(id); if (el) el.innerHTML = t; };
  var link = function (id, href) { var el = doc.getElementById(id); if (el) el.href = href; };
  var params = new URLSearchParams(location.search);
  var city = params.get("city") || "";
  var cq = city ? "&city=" + encodeURIComponent(city) : "";
  function bind(formId, fn) {
    var f = doc.getElementById(formId); if (!f) return;
    Array.prototype.forEach.call(f.elements, function (el) { var k = el.getAttribute("data-param"); if (k && params.get(k)) el.value = params.get(k); });
    f.addEventListener("input", fn); f.addEventListener("change", fn); fn();
  }
  var SQM = 10.7639;

  /* ---------- Office space ---------- */
  bind("office-form", function () {
    var team = Math.max(1, num("o-team")), grow = num("o-grow") / 100, pat = str("o-pattern"), unit = str("o-unit"), load = num("o-load") / 100;
    var per = { office: [150, 200], hybrid: [100, 150], light: [60, 100] }[pat] || [100, 150];
    var heads = Math.ceil(team * (1 + grow));
    var lo = heads * per[0], hi = heads * per[1];
    var desks = pat === "office" ? heads : pat === "hybrid" ? Math.ceil(heads * 0.7) : Math.ceil(heads * 0.4);
    var rooms = Math.max(1, Math.round(heads / 12)), phone = Math.max(1, Math.round(heads / 8));
    var conv = function (v) { return unit === "m2" ? v / SQM : v; }, u = unit === "m2" ? " m²" : " sq ft";
    set("o-main", fmt(conv(lo)) + "–" + fmt(conv(hi)) + u);
    set("o-usable", fmt(conv(lo)) + "–" + fmt(conv(hi)) + u);
    set("o-rentable", fmt(conv(lo * (1 + load))) + "–" + fmt(conv(hi * (1 + load))) + u);
    set("o-heads", heads + " people");
    set("o-desks", desks + " desks");
    set("o-rooms", rooms + " meeting rooms + " + phone + " focus/phone rooms");
    var rent = num("o-rent"), ops = num("o-ops");
    if (rent > 0) {
      var midR = (lo + hi) / 2 * (1 + load), unitArea = unit === "m2" ? midR / SQM : midR;
      var yr = unitArea * (rent + ops);
      set("o-cost", fmt(yr) + " a year (about " + fmt(yr / 12) + " a month)");
    } else set("o-cost", "Add a rent figure to estimate");
    html("o-verdict", heads > 80 ? "At this size, a <b>direct lease</b> on a whole or part floor is usually the most economical — start the search 9–12 months ahead." : heads > 15 ? "A <b>small direct lease or a sublease</b> often beats coworking on cost from about this size, especially on terms of three years or more." : "For under ~15 people, compare <b>coworking private offices</b> and small fitted suites before committing to a long lease.");
    link("o-cta", "/get-matched.html?need=office&team=" + team + cq);
  });

  /* ---------- Coworking vs lease ---------- */
  bind("cw-form", function () {
    var team = Math.max(1, num("cw-team")), months = Math.max(1, num("cw-months")), desk = num("cw-desk");
    var sq = num("cw-sqpp"), rentY = num("cw-rent"), opsY = num("cw-ops"), fit = num("cw-fit"), furn = num("cw-furn"), unit = str("cw-unit");
    var area = team * sq; // in chosen unit
    var coworkM = team * desk;
    var leaseMonthly = area * (rentY + opsY) / 12;
    var upfront = area * fit + team * furn;
    var cowTotal = coworkM * months, leaseTotal = leaseMonthly * months + upfront;
    set("cw-main", leaseTotal < cowTotal ? "Lease saves " + fmt(cowTotal - leaseTotal) : "Coworking saves " + fmt(leaseTotal - cowTotal));
    set("cw-cow", fmt(cowTotal)); set("cw-lease", fmt(leaseTotal)); set("cw-upfront", fmt(upfront));
    set("cw-cowm", fmt(coworkM)); set("cw-leasem", fmt(leaseMonthly));
    set("cw-area", fmt(area) + (unit === "m2" ? " m²" : " sq ft"));
    var be = coworkM > leaseMonthly ? Math.ceil(upfront / (coworkM - leaseMonthly)) : Infinity;
    set("cw-be", isFinite(be) ? be + " months" : "No break-even (coworking stays cheaper)");
    html("cw-verdict", isFinite(be) && be <= months ? "Over " + months + " months the <b>lease wins</b>: the fit-out pays for itself after about " + be + " months. Ask brokers about fitted or sublease space to cut the upfront cost." : "Over " + months + " months <b>coworking is cheaper</b> or the difference is too small to justify the commitment. Revisit when headcount or horizon grows.");
    link("cw-cta-lease", "/get-matched.html?need=office&team=" + team + cq);
    link("cw-cta-flex", "/get-matched.html?need=flex&desks=" + team + cq);
  });

  /* ---------- Venue budget ---------- */
  bind("vb-form", function () {
    var g = Math.max(2, num("vb-guests")), lay = str("vb-layout"), cat = num("vb-catering"), hire = num("vb-hire"), av = num("vb-av"), staff = num("vb-staff"), decor = num("vb-decor"), cont = num("vb-cont") / 100;
    var per = { reception: [8, 10], banquet: [10, 12], theatre: [6, 8], classroom: [15, 20], boardroom: [20, 25] }[lay] || [8, 10];
    set("vb-room", fmt(g * per[0]) + "–" + fmt(g * per[1]) + " sq ft (" + fmt(g * per[0] / SQM) + "–" + fmt(g * per[1] / SQM) + " m²)");
    var food = g * cat, sub = food + hire + av + staff + decor, total = sub * (1 + cont);
    set("vb-main", fmt(total));
    set("vb-food", fmt(food)); set("vb-other", fmt(hire + av + staff + decor)); set("vb-contv", fmt(sub * cont)); set("vb-pp", fmt(total / g));
    html("vb-verdict", lay === "boardroom" && g > 30 ? "Boardroom layouts rarely work above ~30 people — consider classroom or theatre." : "Ask every venue whether the catering figure counts toward a <b>food-and-drink minimum</b>, and how long they will hold your date without a deposit.");
    link("vb-cta", "/get-matched.html?need=venue&guests=" + g + cq);
  });

  /* ---------- Moving cost ---------- */
  bind("mv-form", function () {
    var crew = num("mv-crew"), hours = num("mv-hours"), rate = num("mv-rate"), mat = num("mv-materials"), rent = num("mv-rent"), dep = num("mv-deposit"), overlap = num("mv-overlap"), conn = num("mv-connect"), furn = num("mv-furnish"), storM = num("mv-storage"), storN = num("mv-storagem"), travel = num("mv-travel"), fees = num("mv-fees");
    var movers = crew * hours * rate, deposit = rent * dep, overlapC = rent / 30 * overlap, storage = storM * storN;
    var total = movers + mat + deposit + rent + overlapC + conn + furn + storage + travel + fees;
    var refundable = deposit;
    set("mv-main", fmt(total));
    set("mv-movers", fmt(movers)); set("mv-dep", fmt(deposit)); set("mv-first", fmt(rent)); set("mv-ov", fmt(overlapC)); set("mv-setup", fmt(conn + furn + mat)); set("mv-stor", fmt(storage)); set("mv-tf", fmt(travel + fees));
    set("mv-net", fmt(total - refundable));
    html("mv-verdict", "Cash needed up front is <b>" + fmt(total) + "</b>, of which " + fmt(refundable) + " is a refundable deposit. Get at least three written moving quotes and confirm building move-in rules (elevator bookings, insurance certificates) early.");
    link("mv-cta", "/get-matched.html?need=home&budget=" + Math.round(rent) + cq);
  });

  /* ---------- Rent vs buy ---------- */
  bind("rb-form", function () {
    var price = num("rb-price"), downP = num("rb-down") / 100, rate = num("rb-rate") / 100, term = Math.max(1, num("rb-term")), fees = num("rb-fees"), tax = num("rb-tax") / 100, maint = num("rb-maint") / 100, app = num("rb-app") / 100, buyC = num("rb-buyc") / 100, sellC = num("rb-sellc") / 100;
    var rent = num("rb-rent"), rentUp = num("rb-rentup") / 100, inv = num("rb-inv") / 100, years = Math.max(1, Math.min(30, num("rb-years")));
    var loan = price * (1 - downP), mr = rate / 12, n = term * 12;
    var pmt = mr > 0 ? loan * mr / (1 - Math.pow(1 + mr, -n)) : loan / n;
    var bal = loan, own = price * downP + price * buyC, rentTot = 0, r = rent, value = price, series = [];
    var oppBase = price * downP + price * buyC, opp = 0;
    for (var y = 1; y <= years; y++) {
      for (var m = 0; m < 12; m++) {
        var interest = bal * mr, princ = Math.min(bal, pmt - interest);
        if (bal > 0) { bal -= princ; own += pmt; }
        own += fees + value * (tax + maint) / 12;
        rentTot += r;
      }
      value *= 1 + app; r *= 1 + rentUp;
      opp = oppBase * (Math.pow(1 + inv, y) - 1);
      var equity = value * (1 - sellC) - bal;
      series.push({ y: y, own: own - equity, rent: rentTot + opp });
    }
    var last = series[series.length - 1];
    var be = null; for (var i = 0; i < series.length; i++) if (series[i].own < series[i].rent) { be = series[i].y; break; }
    set("rb-main", last.own < last.rent ? "Buying is cheaper by " + fmt(last.rent - last.own) : "Renting is cheaper by " + fmt(last.own - last.rent));
    set("rb-pmt", fmt(pmt) + " / month"); set("rb-own", fmt(last.own)); set("rb-rentc", fmt(last.rent)); set("rb-be", be ? "Year " + be : "Not within " + years + " years");
    html("rb-verdict", be ? "On these assumptions owning pulls ahead from <b>year " + be + "</b>. The shorter you expect to stay, the more transaction costs favour renting." : "On these assumptions <b>renting stays cheaper</b> for " + years + " years. Try a longer horizon or different appreciation.");
    // chart
    var W = 520, H = 180, P = 28, mx = Math.max.apply(null, series.map(function (s) { return Math.max(s.own, s.rent); })) || 1;
    var x = function (i) { return P + (W - 2 * P) * (series.length > 1 ? i / (series.length - 1) : 0); }, yv = function (v) { return H - P - (H - 2 * P) * Math.max(0, v) / mx; };
    var line = function (k) { return series.map(function (s, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + yv(s[k]).toFixed(1); }).join(" "); };
    html("rb-chart", '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Cumulative cost of owning versus renting by year"><line x1="' + P + '" y1="' + (H - P) + '" x2="' + (W - P) + '" y2="' + (H - P) + '" stroke="#55617d"/><path d="' + line("rent") + '" fill="none" stroke="#2bb3a8" stroke-width="3"/><path d="' + line("own") + '" fill="none" stroke="#ffd166" stroke-width="3"/><text x="' + P + '" y="16" fill="#ffd166" font-size="12">Owning (net of equity)</text><text x="' + (P + 170) + '" y="16" fill="#2bb3a8" font-size="12">Renting (incl. lost returns)</text><text x="' + (W - P) + '" y="' + (H - 8) + '" fill="#b8c0d2" font-size="11" text-anchor="end">Year ' + years + "</text></svg>");
    link("rb-cta-buy", "/get-matched.html?need=buy&budget=" + Math.round(price) + cq);
    link("rb-cta-rent", "/get-matched.html?need=home&budget=" + Math.round(rent) + cq);
  });
})();
