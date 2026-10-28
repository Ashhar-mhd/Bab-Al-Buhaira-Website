/* Bab Al Buhaira website: services list and visa guide. The visa calculator lives in calc.js. */

var WA_NUMBER = "971544221615";

var GUIDE = [
  {
    id: "family", calc: "family", name: "Family visa", short: "Spouse, children, parents",
    intro: "For UAE residents who want their spouse, children or parents to live with them. The family member's visa is linked to the sponsor's visa.",
    facts: [["Usually takes", "About 1 week"], ["Valid for", "Same as sponsor"], ["Apply from", "Inside or outside UAE"]],
    who: ["Residents with a valid visa and Emirates ID", "Sponsor meets the salary and housing rules", "Spouse, children, or parents"],
    docs: ["Sponsor's passport, visa and Emirates ID", "Attested marriage or birth certificate", "Tenancy contract and utility bill", "Salary certificate or labour contract", "Passport photos of family members"],
    tip: "Renew before the visa expires to avoid overstay fines."
  },
  {
    id: "visit", calc: "visit", name: "Visit visa", short: "30 or 60 days",
    intro: "For family and friends coming to the UAE for a short stay. Choose 30 or 60 days. We can also apply while the person is already in the UAE.",
    facts: [["Usually takes", "1 – 2 working days"], ["Valid for", "30 or 60 days"], ["Apply from", "Inside or outside UAE"]],
    who: ["Tourists and visiting relatives", "Some nationalities get a visa on arrival and do not need one", "Visitors who want to extend their stay"],
    docs: ["Passport copy with 6+ months validity", "White-background passport photo", "Return ticket for some nationalities"],
    tip: "Send the passport copy on WhatsApp and we will tell you if a visa is needed at all."
  },
  {
    id: "golden", calc: "golden", name: "Golden Visa", short: "5 or 10 years",
    intro: "A long-term residence visa that does not need an employer sponsor. Your family can be included.",
    facts: [["Usually takes", "1 – 2 weeks"], ["Valid for", "5 or 10 years"], ["Apply from", "Inside UAE"]],
    who: ["Property and business investors", "Skilled professionals who meet the salary rule", "Outstanding students and graduates", "Doctors, scientists and other specialists"],
    docs: ["Passport and current visa", "Emirates ID", "Proof for your category (salary, degree, property or investment)", "Passport photo"],
    tip: "Not sure if you qualify? Send your job title and salary and we will check if you qualify before you pay anything."
  },
  {
    id: "employment", calc: "employee", name: "Employment visa", short: "For companies & staff",
    intro: "For companies hiring staff. We handle the work permit with MOHRE, the entry permit, medical, Emirates ID and residence stamping.",
    facts: [["Usually takes", "1 – 2 weeks"], ["Valid for", "2 years"], ["Apply from", "Inside or outside UAE"]],
    who: ["Mainland companies and their new staff", "Business owners who need a PRO", "Employees changing jobs"],
    docs: ["Employee passport and photo", "Company trade licence and establishment card", "Signed offer letter", "Attested degree for some job titles"],
    tip: "We also handle labour contract renewals and visa cancellations."
  },
  {
    id: "eid", calc: "", name: "Emirates ID & medical", short: "New, renewal, replacement",
    intro: "Every resident needs an Emirates ID. We type the application, book your medical test and tell you when to go for biometrics.",
    facts: [["Usually takes", "About 5 days"], ["Valid for", "Same as visa"], ["Apply from", "Inside UAE"]],
    who: ["New residents", "Residents renewing their visa", "Lost or damaged card"],
    docs: ["Passport and residence visa", "Old Emirates ID for renewal", "Passport photo"],
    tip: "Biometrics and the medical test must be done in person. Everything else we handle."
  },
  {
    id: "saudi", calc: "", name: "Saudi visit visa", short: "Tourism & Umrah trips",
    intro: "For UAE residents and eligible nationalities visiting Saudi Arabia. We check which visa type fits you.",
    facts: [["Usually takes", "1 working day"], ["Valid for", "Depends on type"], ["Apply from", "UAE"]],
    who: ["UAE residents of eligible nationalities", "Families travelling together", "Umrah visitors"],
    docs: ["Passport with 6+ months validity", "UAE visa and Emirates ID", "Passport photo"],
    tip: "We can also book your flight and hotel at the same time."
  },
  {
    id: "qatar", calc: "", name: "Qatar Hayya A1", short: "Visit Qatar",
    intro: "The Hayya A1 is Qatar's tourist visa for visitors who need one. We prepare and submit the application for you.",
    facts: [["Usually takes", "3 – 7 days"], ["Valid for", "Depends on approval"], ["Apply from", "UAE"]],
    who: ["Tourists visiting Qatar", "Residents visiting family in Qatar"],
    docs: ["Passport with 6+ months validity", "Passport photo", "Hotel booking", "Return ticket"],
    tip: "Book the hotel only after we confirm your eligibility."
  }
];

var SERVICES = [
  { t: "Visas & residency", d: "New visas, renewals and cancellations for you and your family.", tags: "ICP · GDRFA · Amer",
    items: ["Family visa", "Visit visa", "Golden Visa", "Green Visa", "Employment visa", "Newborn visa", "Visa cancellation", "Status change"] },
  { t: "Emirates ID & medical", d: "Typing, medical test booking and biometrics guidance.", tags: "ICP · EHS",
    items: ["New Emirates ID", "Emirates ID renewal", "Lost card replacement", "Medical fitness typing"] },
  { t: "Government typing, Tasheel & Amer", d: "All kinds of government application typing for people and companies.", tags: "MOHRE · Tasheel · Amer · MOI",
    items: ["Labour contracts", "Work permits", "Labour cancellation", "Establishment card", "Company PRO services"] },
  { t: "Business setup", d: "Start, renew or change your trade licence.", tags: "Mainland · Free zone",
    items: ["New trade licence", "Licence renewal", "Licence amendment", "Partner changes", "Office tenancy (Ejari)"] },
  { t: "Attestation & translation", d: "Translation in 100+ languages and attestation for documents from 100+ countries.", tags: "MOFA · Embassy · Consulate",
    items: ["Legal translation, 100+ languages", "Arabic ⇄ English", "Malayalam, Hindi, Urdu, Tamil", "Documents from 100+ countries", "Degree attestation", "Marriage & birth certificates", "MOFA attestation"] },
  { t: "PCC, lost certificates & legal", d: "Police clearance, lost certificate reports and legal case typing.", tags: "MOI · Police · Courts",
    items: ["Police clearance (PCC)", "Lost certificate services", "MOI services", "Cheque return cases", "Legal typing"] },
  { t: "Visas for 100+ countries", d: "Visa applications and embassy or consulate appointments worldwide.", tags: "Embassy · Consulate",
    items: ["Visas for 100+ countries", "Embassy & consulate appointments", "GCC countries", "Saudi visit visa", "Umrah visa", "Qatar Hayya A1", "Oman", "India", "Georgia", "Uzbekistan", "Turkey", "Kazakhstan", "Azerbaijan", "Sri Lanka", "Nepal", "Bhutan", "Indonesia"] },
  { t: "Tickets & travel", d: "Flights, hotels and holiday packages, booked for you.", tags: "Air · Hotels",
    items: ["Flight tickets", "Hotel booking", "Holiday packages", "Travel insurance"] },
  { t: "Insurance", d: "Cover that meets UAE visa and RTA rules.", tags: "Health · Vehicle",
    items: ["Health insurance", "Vehicle insurance", "Travel insurance"] },
  { t: "Tenancy & utilities", d: "Home paperwork in Sharjah, done in one visit.", tags: "SEWA · Municipality",
    items: ["Tenancy contract attestation", "SEWA connection", "Sharjah parking permit"] },
  { t: "Passport services", d: "Passport applications and appointments for you and your baby.", tags: "Indian · Pakistani · Embassy",
    items: ["Indian passport renewal", "Newborn baby passport", "Passport appointment booking", "Pakistan passport services"] },
  { t: "CV, printing & photos", d: "Everyday office jobs while you wait.", tags: "In-house",
    items: ["CV writing", "Printing & photocopy", "Scanning", "Passport photos", "Studio photos"] }
];

/* ---------- helpers ---------- */
function $(s, r) { return (r || document).querySelector(s); }
function el(tag, attrs, html) {
  var e = document.createElement(tag);
  if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
  if (html != null) e.innerHTML = html;
  return e;
}
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function aed(n) { return "AED " + n.toLocaleString("en-US"); }
function waUrl(msg) { return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg); }

/* ---------- WhatsApp links ---------- */
document.querySelectorAll(".wa-link").forEach(function (a) {
  a.href = waUrl(a.getAttribute("data-msg") || "Hello Bab Al Buhaira");
});

/* ---------- services ---------- */
var grid = $("#svc-grid");
SERVICES.forEach(function (s, i) {
  var card = el("article", { "class": "svc", "data-i": i });
  card.innerHTML =
    "<div class=\"svc-head\">" +
      "<h3><button type=\"button\" class=\"svc-toggle\" aria-expanded=\"false\" aria-controls=\"svc-b" + i + "\">" + esc(s.t) +
        "<span class=\"svc-chev\" aria-hidden=\"true\"></span></button></h3>" +
      "<p class=\"svc-desc\">" + esc(s.d) + "</p>" +
    "</div>" +
    "<div class=\"svc-body\" id=\"svc-b" + i + "\"><div class=\"svc-inner\">" +
      "<ul>" + s.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      "<p class=\"svc-tags\">" + esc(s.tags) + "</p>" +
      "<a class=\"svc-ask\" target=\"_blank\" rel=\"noopener\" href=\"" + waUrl("Hello Bab Al Buhaira, I need help with " + s.t + ".") + "\">Ask on WhatsApp →</a>" +
    "</div></div>";
  grid.appendChild(card);
});
/* Cards start closed. Tap a card's title row to open it; on phones opening one closes the others. */
function setOpen(card, open) {
  card.classList.toggle("open", open);
  card.querySelector(".svc-toggle").setAttribute("aria-expanded", open ? "true" : "false");
}
grid.addEventListener("click", function (e) {
  var head = e.target.closest(".svc-head");
  if (!head) return;
  var card = head.parentNode, open = !card.classList.contains("open");
  if (open && window.matchMedia("(max-width: 600px)").matches) {
    grid.querySelectorAll(".svc.open").forEach(function (c) { if (c !== card) setOpen(c, false); });
  }
  setOpen(card, open);
});
$("#svc-search").addEventListener("input", function (e) {
  var q = e.target.value.trim().toLowerCase();
  var shown = 0;
  grid.querySelectorAll(".svc").forEach(function (card) {
    var s = SERVICES[+card.getAttribute("data-i")];
    var hay = (s.t + " " + s.d + " " + s.tags + " " + card.textContent).toLowerCase();
    var anyItem = false;
    card.querySelectorAll("li").forEach(function (li) {
      var hit = q && li.textContent.toLowerCase().indexOf(q) > -1;
      li.classList.toggle("hit", !!hit);
      if (hit) anyItem = true;
    });
    var match = !q || anyItem || hay.indexOf(q) > -1;
    card.hidden = !match;
    setOpen(card, !!q && anyItem);
    if (match) shown++;
  });
  $("#svc-empty").hidden = shown > 0;
});

/* ---------- global visas ----------
   price = base cost in AED (BAB's prices, October 2026); the site shows base + GV_CHARGE, rounded up to 5.
   null = not confirmed yet, shown as "Price on WhatsApp". */
var GV_CHARGE = 50;
var GV_CHECKED = "October 2026";
var D = {
  pass: "Passport, valid 6+ months", res: "UAE residence visa and Emirates ID", photo: "Passport photo, white background",
  bank: "Bank statement, last 3 months", hotel: "Hotel booking", ticket: "Return flight ticket", ins: "Travel insurance",
  sal: "Salary certificate or trade licence", tour: "Tour booking with a licensed Bhutan operator"
};
var GLOBAL_VISAS = [
  { c: "Saudi Arabia", code: "SA", type: "Tourist e-visa", time: "1 working day", price: 445, docs: [D.pass, D.res, D.photo] },
  { c: "Qatar", code: "QA", type: "Hayya A1 visa", time: "3–7 days", price: 45, docs: [D.pass, D.res, D.photo, D.hotel, D.ticket] },
  { c: "Oman", code: "OM", type: "GCC resident visa", time: "1–3 working days", price: 45, docs: [D.pass, D.res, D.photo, D.hotel] },
  { c: "Bahrain", code: "BH", type: "Tourist e-visa", time: "3–5 working days", price: 195, docs: [D.pass, D.res, D.photo, D.hotel, D.ticket] },
  { c: "Kuwait", code: "KW", type: "Tourist e-visa", time: "3–5 working days", price: 245, docs: [D.pass, D.res, D.photo, D.sal] },
  { c: "India", code: "IN", type: "Tourist e-visa", time: "3–5 working days", price: 395, docs: [D.pass, D.photo] },
  { c: "Georgia", code: "GE", type: "Tourist e-visa", time: "5+ working days", price: 135, docs: [D.pass, D.res, D.photo, D.bank, D.hotel, D.ticket, D.ins] },
  { c: "Uzbekistan", code: "UZ", type: "Tourist e-visa", time: "3–5 working days", price: null, docs: [D.pass, D.res, D.photo] },
  { c: "Turkey", code: "TR", type: "e-visa or embassy visa", time: "1 day to 3 weeks", price: null, docs: [D.pass, D.res, D.photo, D.bank, D.sal, D.hotel, D.ticket, D.ins] },
  { c: "Kazakhstan", code: "KZ", type: "Tourist e-visa", time: "5 working days", price: null, docs: [D.pass, D.res, D.photo, D.hotel] },
  { c: "Azerbaijan", code: "AZ", type: "ASAN e-visa", time: "3 working days", price: 145, docs: [D.pass, D.res, D.photo] },
  { c: "Sri Lanka", code: "LK", type: "ETA (online visa)", time: "1–3 working days", price: 45, docs: [D.pass, D.res, D.photo, D.ticket] },
  { c: "Nepal", code: "NP", type: "Online form, visa on arrival", time: "Same day", price: null, docs: [D.pass, D.photo, D.hotel] },
  { c: "Bhutan", code: "BT", type: "Tourist visa", time: "5 working days", price: null, docs: [D.pass, D.photo, D.tour, D.ins] },
  { c: "Indonesia", code: "ID", type: "Visitor e-visa (30 days)", time: "Apply 2+ days before travel", price: 125, docs: [D.pass, D.photo, D.ticket] },
  /* more countries, A–Z: requirements depend on the passport, so we confirm on WhatsApp */
  { c: "Afghanistan", code: "AF" },
  { c: "Algeria", code: "DZ" },
  { c: "Andorra", code: "AD" },
  { c: "Angola", code: "AO" },
  { c: "Antigua and Barbuda", code: "AG" },
  { c: "Argentina", code: "AR" },
  { c: "Australia", code: "AU" },
  { c: "Austria", code: "AT" },
  { c: "Bahamas", code: "BS" },
  { c: "Bangladesh", code: "BD" },
  { c: "Barbados", code: "BB" },
  { c: "Belarus", code: "BY" },
  { c: "Belgium", code: "BE" },
  { c: "Benin", code: "BJ" },
  { c: "Bosnia and Herzegovina", code: "BA" },
  { c: "Botswana", code: "BW" },
  { c: "Brazil", code: "BR" },
  { c: "Brunei Darussalam", code: "BN" },
  { c: "Bulgaria", code: "BG" },
  { c: "Burkina Faso", code: "BF" },
  { c: "Burundi", code: "BI" },
  { c: "Cambodia", code: "KH" },
  { c: "Cameroon", code: "CM" },
  { c: "Canada", code: "CA" },
  { c: "Chad", code: "TD" },
  { c: "Chile", code: "CL" },
  { c: "China", code: "CN" },
  { c: "Colombia", code: "CO" },
  { c: "Congo", code: "CG" },
  { c: "Cote d'Ivoire", code: "CI" },
  { c: "Croatia", code: "HR" },
  { c: "Cuba", code: "CU" },
  { c: "Cyprus", code: "CY" },
  { c: "Czech Republic", code: "CZ" },
  { c: "Dominican Republic", code: "DO" },
  { c: "Ecuador", code: "EC" },
  { c: "Egypt", code: "EG" },
  { c: "El Salvador", code: "SV" },
  { c: "Estonia", code: "EE" },
  { c: "Ethiopia", code: "ET" },
  { c: "Fiji", code: "FJ" },
  { c: "Finland", code: "FI" },
  { c: "France", code: "FR" },
  { c: "Gabon", code: "GA" },
  { c: "Germany", code: "DE" },
  { c: "Ghana", code: "GH" },
  { c: "Greece", code: "GR" },
  { c: "Grenada", code: "GD" },
  { c: "Guatemala", code: "GT" },
  { c: "Haiti", code: "HT" },
  { c: "Hong Kong", code: "HK" },
  { c: "Hungary", code: "HU" },
  { c: "Iceland", code: "IS" },
  { c: "Ireland", code: "IE" },
  { c: "Israel", code: "IL" },
  { c: "Italy", code: "IT" },
  { c: "Japan", code: "JP" },
  { c: "Jordan", code: "JO" },
  { c: "Kenya", code: "KE" },
  { c: "Laos", code: "LA" },
  { c: "Latvia", code: "LV" },
  { c: "Lebanon", code: "LB" },
  { c: "Liechtenstein", code: "LI" },
  { c: "Lithuania", code: "LT" },
  { c: "Luxembourg", code: "LU" },
  { c: "Macao", code: "MO" },
  { c: "Madagascar", code: "MG" },
  { c: "Maldives", code: "MV" },
  { c: "Malta", code: "MT" },
  { c: "Mauritius", code: "MU" },
  { c: "Mexico", code: "MX" },
  { c: "Monaco", code: "MC" },
  { c: "Mongolia", code: "MN" },
  { c: "Montenegro", code: "ME" },
  { c: "Morocco", code: "MA" },
  { c: "Mozambique", code: "MZ" },
  { c: "Namibia", code: "NA" },
  { c: "Netherlands", code: "NL" },
  { c: "New Zealand", code: "NZ" },
  { c: "Nigeria", code: "NG" },
  { c: "North Macedonia", code: "MK" },
  { c: "Norway", code: "NO" },
  { c: "Pakistan", code: "PK" },
  { c: "Panama", code: "PA" },
  { c: "Papua New Guinea", code: "PG" },
  { c: "Paraguay", code: "PY" },
  { c: "Peru", code: "PE" },
  { c: "Philippines", code: "PH" },
  { c: "Poland", code: "PL" },
  { c: "Portugal", code: "PT" },
  { c: "Romania", code: "RO" },
  { c: "Russia", code: "RU" },
  { c: "Rwanda", code: "RW" },
  { c: "Saint Kitts and Nevis", code: "KN" },
  { c: "Saint Lucia", code: "LC" },
  { c: "Saint Vincent and the Grenadines", code: "VC" },
  { c: "San Marino", code: "SM" },
  { c: "Sao Tome and Principe", code: "ST" },
  { c: "Senegal", code: "SN" },
  { c: "Seychelles", code: "SC" },
  { c: "Sierra Leone", code: "SL" },
  { c: "Singapore", code: "SG" },
  { c: "Slovakia", code: "SK" },
  { c: "Slovenia", code: "SI" },
  { c: "South Africa", code: "ZA" },
  { c: "South Korea", code: "KR" },
  { c: "South Sudan", code: "SS" },
  { c: "Spain", code: "ES" },
  { c: "Sweden", code: "SE" },
  { c: "Switzerland", code: "CH" },
  { c: "Taiwan", code: "TW" },
  { c: "Tajikistan", code: "TJ" },
  { c: "Tanzania", code: "TZ" },
  { c: "Togo", code: "TG" },
  { c: "Tunisia", code: "TN" },
  { c: "United Kingdom", code: "GB" },
  { c: "United States", code: "US" },
  { c: "Uruguay", code: "UY" },
  { c: "Venezuela", code: "VE" },
  { c: "Vietnam", code: "VN" },
  { c: "Zambia", code: "ZM" }
];
(function () {
  var g = $("#gv-grid");
  if (!g) return;
  function fmt(n) { return n.toLocaleString("en-US"); }
  // Arabic country names come from the browser's built-in list, so new countries need no manual translation.
  try {
    var arNames = new Intl.DisplayNames(["ar"], { type: "region" });
    GLOBAL_VISAS.forEach(function (v) { if (v.code && window.BAB_LANG_AR && !window.BAB_LANG_AR[v.c]) window.BAB_LANG_AR[v.c] = arNames.of(v.code); });
  } catch (e) {}
  GLOBAL_VISAS.forEach(function (v, i) {
    var price = v.price != null ? "From AED " + fmt(Math.ceil((v.price + GV_CHARGE) / 5) * 5) : "Price on WhatsApp";
    var card = el("article", { "class": "svc gv", "data-i": i });
    card.innerHTML =
      "<div class=\"svc-head\">" +
        "<h3><button type=\"button\" class=\"svc-toggle\" aria-expanded=\"false\" aria-controls=\"gv-b" + i + "\">" +
          "<span class=\"gv-name\"><span>" + esc(v.c) + "</span><small>" + esc(v.type || "Visa assistance") + "</small></span>" +
          "<span class=\"svc-chev\" aria-hidden=\"true\"></span></button></h3>" +
      "</div>" +
      "<div class=\"svc-body\" id=\"gv-b" + i + "\"><div class=\"svc-inner\">" +
        (v.docs ?
          "<dl class=\"gv-facts\">" +
            "<div><dt>Usually takes</dt><dd>" + esc(v.time) + "</dd></div>" +
            "<div><dt>Price</dt><dd class=\"gv-price\">" + esc(price) + "</dd></div>" +
          "</dl>" +
          "<p class=\"gv-docs-h\">Documents</p>" +
          "<ul class=\"gv-docs\">" + v.docs.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"
        : "<p class=\"svc-desc\">Visa type, documents and price depend on your passport. Send us your passport copy on WhatsApp and we reply with the exact list and price.</p>") +
        "<a class=\"svc-ask\" target=\"_blank\" rel=\"noopener\" href=\"" + waUrl("Hello Bab Al Buhaira, I want a " + v.c + " visa" + (v.type ? " (" + v.type + ")" : "") + ". Please tell me the price and documents.") + "\">Apply on WhatsApp →</a>" +
      "</div></div>";
    g.appendChild(card);
  });
  function setOpen(card, open) {
    card.classList.toggle("open", open);
    card.querySelector(".svc-toggle").setAttribute("aria-expanded", open ? "true" : "false");
  }
  g.addEventListener("click", function (e) {
    var head = e.target.closest(".svc-head");
    if (!head) return;
    var card = head.parentNode, open = !card.classList.contains("open");
    if (open && window.matchMedia("(max-width: 600px)").matches) {
      g.querySelectorAll(".svc.open").forEach(function (c) { if (c !== card) setOpen(c, false); });
    }
    setOpen(card, open);
  });
  // Popular countries come first in the list; the rest stay behind "Show all" until searched.
  var GV_FIRST = 12, showAll = false, more = $("#gv-more");
  function filter() {
    var q = $("#gv-search").value.trim().toLowerCase(), shown = 0;
    g.querySelectorAll(".gv").forEach(function (card) {
      var i = +card.getAttribute("data-i"), v = GLOBAL_VISAS[i];
      var name = (v.c + " " + card.querySelector(".gv-name").textContent).toLowerCase();
      var match = q ? name.indexOf(q) > -1 : (showAll || i < GV_FIRST);
      card.hidden = !match;
      if (match) shown++;
    });
    $("#gv-empty").hidden = shown > 0;
    more.hidden = !!q || GLOBAL_VISAS.length <= GV_FIRST;
    more.textContent = showAll ? "Show fewer countries" : "Show all countries";
    more.setAttribute("aria-expanded", showAll ? "true" : "false");
  }
  more.addEventListener("click", function () {
    showAll = !showAll;
    if (!showAll) g.querySelectorAll(".svc.open").forEach(function (c) { setOpen(c, false); });
    filter();
    // Jump straight back to the top of the country list (the page just got much shorter, so no smooth scroll).
    if (!showAll) {
      var head = document.querySelector(".topbar"), off = (head ? head.getBoundingClientRect().height : 0) + 12;
      var top = $("#gv-search").getBoundingClientRect().top + window.pageYOffset - off;
      window.scrollTo({ top: top, behavior: "instant" });
    }
  });
  $("#gv-search").addEventListener("input", filter);
  filter();
})();

function preset(id) { if (window.BABCalc) window.BABCalc.open(id); }

/* ---------- visa guide ---------- */
var tabs = $("#g-tabs"), panel = $("#g-panel");
function showGuide(i) {
  var g = GUIDE[i];
  tabs.querySelectorAll("button").forEach(function (b, j) {
    b.setAttribute("aria-selected", j === i ? "true" : "false");
    b.tabIndex = j === i ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", "gt-" + g.id);
  panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap");
  panel.innerHTML =
    "<div><h3>" + esc(g.name) + "</h3></div>" +
    "<p class=\"gp-intro\">" + esc(g.intro) + "</p>" +
    "<div class=\"gp-facts\">" + g.facts.map(function (f) { return "<div><span>" + esc(f[0]) + "</span><strong>" + esc(f[1]) + "</strong></div>"; }).join("") + "</div>" +
    "<div class=\"gp-cols\">" +
      "<div><h4>Who it is for</h4><ul>" + g.who.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
      "<div><h4>What to bring</h4><ul>" + g.docs.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
    "</div>" +
    "<p class=\"res-note\"><strong>Good to know:</strong> " + esc(g.tip) + "</p>" +
    "<div class=\"gp-actions\">" +
      (g.calc ? "<a class=\"btn btn-navy\" href=\"#calculator\" data-go=\"" + g.calc + "\">Check the cost</a>" : "") +
      "<a class=\"btn btn-outline\" target=\"_blank\" rel=\"noopener\" href=\"" + waUrl("Hello Bab Al Buhaira, I want to apply for a " + g.name + ".") + "\">Ask on WhatsApp</a>" +
    "</div>" +
    "<p class=\"fine\">Rules and times change. We confirm the latest requirements before we apply.</p>";
  var go = panel.querySelector("[data-go]");
  if (go) go.addEventListener("click", function () { preset(go.getAttribute("data-go")); });
}
GUIDE.forEach(function (g, i) {
  var b = el("button", { type: "button", role: "tab", id: "gt-" + g.id, "aria-controls": "g-panel" },
    esc(g.name) + "<small>" + esc(g.short) + "</small>");
  b.addEventListener("click", function () { showGuide(i); });
  b.addEventListener("keydown", function (e) {
    var n = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    var k = (i + n + GUIDE.length) % GUIDE.length;
    showGuide(k);
    tabs.children[k].focus();
  });
  tabs.appendChild(b);
});
showGuide(0);

/* ---------- copy buttons ---------- */
document.querySelectorAll(".copy").forEach(function (b) {
  b.addEventListener("click", function () {
    var text = b.getAttribute("data-copy");
    var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1600); };
    var fallback = function () {
      var span = b.previousElementSibling;
      var r = document.createRange(); r.selectNodeContents(span);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      b.textContent = "Selected";
    };
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
  });
});

$("#year").textContent = new Date().getFullYear();

/* hero quick links open a visa guide tab */
document.querySelectorAll("[data-guide]").forEach(function (a) {
  a.addEventListener("click", function () {
    var id = a.getAttribute("data-guide");
    GUIDE.forEach(function (g, i) { if (g.id === id) showGuide(i); });
  });
});

/* social links (bottom of contact section) */
var SOCIAL = [
  ["Instagram", "https://www.instagram.com/bab_al_buhaira/"],
  ["Facebook", "https://www.facebook.com/share/1FuNn8TzgF/"],
  ["TikTok", "https://www.tiktok.com/@bab_al_buhaira"],
  ["YouTube", "https://www.youtube.com/@bab_al_buhaira"]
];
var SOCIAL_ICONS = {
  Instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>',
  Facebook: '<path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3Z"/>',
  TikTok: '<path fill="currentColor" d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6c-1.4.1-2.6-.3-3.9-1.1v5.3c0 6.7-7.3 8.8-10.2 4-1.9-3.1-.7-8.5 5.4-8.7v2.8c-.5.1-1 .2-1.4.4-1.4.5-2.2 1.4-1.9 2.9.4 2.9 5.8 3.8 5.4-1.9V3h2.7Z"/>',
  YouTube: '<path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"/>'
};
var socialBox = document.getElementById("socials");
if (socialBox) SOCIAL.forEach(function (s) {
  var a = el("a", { href: s[1], target: "_blank", rel: "noopener", "class": "social", "aria-label": s[0] },
    "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\">" + SOCIAL_ICONS[s[0]] + "</svg><span>" + s[0] + "</span>");
  socialBox.appendChild(a);
});

/* menu: tap animation, short vibration (Android) and highlight of the current section */
var navLinks = document.querySelectorAll(".nav a");
function markActive(id) {
  navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + id); });
}
// While a menu jump is scrolling, the tapped tab stays highlighted; afterwards the
// highlight follows the section under the header (none for sections without a tab).
var navLock = 0, spyTimer = 0;
navLinks.forEach(function (a) {
  a.addEventListener("click", function () {
    try { if (navigator.vibrate) navigator.vibrate(15); } catch (e) {}
    a.classList.remove("tapped"); void a.offsetWidth; a.classList.add("tapped");
    markActive(a.getAttribute("href").slice(1));
    navLock = Date.now() + 2000;
  });
});
var NAV_IDS = ["services", "calculator", "visa-guide", "contact"];
function spyNow() {
  var head = document.querySelector(".topbar"), line = (head ? head.getBoundingClientRect().bottom : 0) + window.innerHeight * 0.25;
  var current = "";
  document.querySelectorAll("section[id]").forEach(function (sec) {
    var r = sec.getBoundingClientRect();
    if (r.top <= line && r.bottom > line) current = sec.id;
  });
  if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) current = "contact";
  markActive(NAV_IDS.indexOf(current) > -1 ? current : "");
}
window.addEventListener("scroll", function () {
  clearTimeout(spyTimer);
  // after a tab tap, wait for the scroll to settle before re-reading the position
  spyTimer = setTimeout(function () { navLock = 0; spyNow();

/* phones: hide the header while scrolling down, show it again on scroll up, near the top or during a menu jump */
(function () {
  var bar = document.querySelector(".topbar"), lastY = window.pageYOffset, phone = window.matchMedia("(max-width: 860px)");
  if (!bar) return;
  window.addEventListener("scroll", function () {
    var y = window.pageYOffset, dy = y - lastY;
    if (!phone.matches || y < 80 || Date.now() < navLock) bar.classList.remove("tb-hide");
    else if (dy > 6) bar.classList.add("tb-hide");
    else if (dy < -6) bar.classList.remove("tb-hide");
    if (Math.abs(dy) > 6) lastY = y;
  }, { passive: true });
})();
 }, Date.now() < navLock ? 150 : 60);
}, { passive: true });
spyNow();

/* short vibration on taps (Android phones; iPhones ignore it) */
var HAPTIC = ".btn, .cat, .stepper button, .seg label, .guide-tabs button, .copy, .wa-float, .pc-links a, .svc-ask, .svc-head, .gv-more, .faq summary, .link-btn, .lang-toggle";
document.addEventListener("click", function (e) {
  if (!e.target.closest || !e.target.closest(HAPTIC) || e.target.closest(".nav")) return;
  try { if (navigator.vibrate) navigator.vibrate(10); } catch (err) {}
});

/* soft click sound on taps (Web Audio, no files) */
var SOUND_KEY = "bab-sound";
var soundOn = true;
try { soundOn = localStorage.getItem(SOUND_KEY) !== "off"; } catch (err) {}
var audioCtx = null;
function ctx() {
  if (!audioCtx) { var A = window.AudioContext || window.webkitAudioContext; if (!A) return null; audioCtx = new A(); }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function tone(freq, start, dur, vol, type) {
  var c = ctx(); if (!c) return;
  var o = c.createOscillator(), g = c.createGain(), t = c.currentTime + start;
  o.type = type || "sine"; o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
}
function playClick() { if (soundOn) try { tone(1800, 0, 0.04, 0.04, "triangle"); } catch (err) {} }
var lastChime = 0;
function playChime() {
  if (!soundOn || Date.now() - lastChime < 700) return;
  lastChime = Date.now();
  try { tone(880, 0.03, 0.35, 0.05); tone(1320, 0.11, 0.45, 0.04); } catch (err) {}
}
document.addEventListener("click", function (e) {
  if (e.target.closest && e.target.closest(HAPTIC + ", .nav a") && !e.target.closest("#sound-toggle")) playClick();
});

var soundBtn = document.getElementById("sound-toggle");
function paintSound() {
  if (!soundBtn) return;
  soundBtn.setAttribute("aria-pressed", soundOn ? "true" : "false");
  soundBtn.setAttribute("aria-label", soundOn ? "Sound on. Tap to mute" : "Sound off. Tap to turn on");
  soundBtn.classList.toggle("muted", !soundOn);
}
if (soundBtn) soundBtn.addEventListener("click", function () {
  soundOn = !soundOn;
  try { localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off"); } catch (err) {}
  paintSound();
  if (soundOn) { tone(1800, 0, 0.04, 0.04, "triangle"); }
});
paintSound();

/* visa / Emirates ID expiry check */
(function () {
  var dateIn = document.getElementById("exp-date");
  if (!dateIn) return;
  var box = document.getElementById("exp-result"), days = document.getElementById("exp-days"), text = document.getElementById("exp-text"), wa = document.getElementById("exp-wa");
  function docName() { var r = document.querySelector("input[name='exp-doc']:checked"); return r ? r.value : "Residence visa"; }
  function update() {
    var doc = docName(), v = dateIn.value, state = "empty", msg = "Pick a date to see how many days are left.", num = "–";
    if (v) {
      var p = v.split("-"), exp = new Date(+p[0], +p[1] - 1, +p[2]);
      var t = new Date(); t.setHours(0, 0, 0, 0);
      var d = Math.round((exp - t) / 86400000);
      num = String(Math.abs(d));
      if (d > 30) { state = "ok"; msg = "days left on your " + doc + ". No rush yet."; }
      else if (d > 0) { state = "soon"; msg = (d === 1 ? "day" : "days") + " left. Time to renew your " + doc + "."; }
      else if (d === 0) { state = "soon"; num = "0"; msg = "Your " + doc + " expires today. Renew now."; }
      else { state = "late"; msg = (d === -1 ? "day" : "days") + " since your " + doc + " expired. Fines may apply, contact us today."; }
      var nice = exp.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
      wa.href = waUrl("Hello Bab Al Buhaira, I want to renew my " + doc + ". It " + (d < 0 ? "expired on " : "expires on ") + nice + ".");
    } else {
      wa.href = waUrl("Hello Bab Al Buhaira, I want to renew my " + doc + ".");
    }
    var changed = days.textContent !== num;
    box.setAttribute("data-state", state);
    days.textContent = num;
    text.textContent = msg;
    // Arabic counts 2 and 3-10 take a different noun form than the dictionary's default.
    if (v && window.I18N && I18N.lang === "ar") {
      var a = Math.abs(d), ar = I18N.t(msg);
      if (a === 2) ar = ar.replace(/^يومًا متبقيًا/, "يومان متبقيان").replace(/^يومًا/, "يومان");
      else if (a >= 3 && a <= 10) ar = ar.replace(/^يومًا متبقيًا/, "أيام متبقية").replace(/^يومًا/, "أيام");
      text.textContent = ar;
    }
    if (changed && v) { box.classList.remove("bump"); void box.offsetWidth; box.classList.add("bump"); }
  }
  document.addEventListener("bab:lang", update);
  dateIn.addEventListener("input", update);
  dateIn.addEventListener("change", update);
  document.querySelectorAll("input[name='exp-doc']").forEach(function (r) { r.addEventListener("change", update); });
  document.getElementById("exp-form").addEventListener("submit", function (e) { e.preventDefault(); });
  update();
})();

/* Google reviews.
   Add real reviews only, with the customer's permission: { name: "...", stars: 5, text: "...", when: "October 2026" }.
   Paste the Google "Ask for reviews" link into GOOGLE_REVIEW_URL. Until reviews are added, only the button shows. */
var GOOGLE_REVIEW_URL = "https://g.page/r/Cbblj9Rdv_gIEBM/review";
var REVIEWS = [
  {
    "name": "Kavya",
    "stars": 5,
    "text": "Excellent Service and Outstanding Customer Support!\n\nI have had a wonderful experience with the Bab Al Buhaira Typing service team, especially Mr. Ashar, who has been my most trusted point of contact for all my visa-related documentation needs over the past year. Whether it’s family visa processing, document attestation, police clearance, or any other documentation requirements, he has always been my first choice.\n\nI am extremely satisfied and genuinely happy with the service he provides. His professionalism, dedication, helpful attitude, and commitment to ensuring a smooth process make the entire experience stress-free and convenient. It is truly reassuring to have someone reliable whom you can trust with all your documentation needs.\n\nA special thanks to Mr. Ashar for his consistent support and excellent service! 👏\n\nI would highly recommend their services to everyone. My advice is simple: give them a try at least once, and I’m sure you’ll understand why I keep coming back to them. Once you experience their service, you won’t feel the need to look for another typing centre!\n\nKeep up the excellent work, team! Wishing you continued success! 🌟"
  },
  {
    "name": "Ahamed Al Faris",
    "stars": 5,
    "text": "I had a very good experience with Bab Al Buhaira Typing Center. I did my family visa process, medical test, Emirates ID, and residency stamping through them. Everything was completed very quickly and smoothly. The staff were friendly, professional, and always ready to help. They guided me properly and kept me updated throughout the process.\n\nI also did my certificate attestation through them, and it was completed faster than I expected. Their service is reliable, trustworthy, and hassle-free. It is difficult to find such dedicated and knowledgeable staff nowadays.\n\nI am really satisfied with their service and highly recommend Bab Al Buhaira Typing Center for visa, attestation, and all typing-related services. Thank you for the excellent support and quick service."
  },
  {
    "name": "Musbira Ashar",
    "stars": 5,
    "text": "I had an excellent experience with their visa services . The staff were very friendly, helpful, and professional. The entire visa process was smooth and hassle-free, and the service was outstanding. I am very satisfied with their service. Definitely a 5-star experience! Highly recommended to anyone looking for reliable and efficient visa services."
  }
];
(function () {
  var btn = document.getElementById("rv-btn"), grid = document.getElementById("rv-grid");
  if (!btn || !grid) return;
  if (GOOGLE_REVIEW_URL) btn.href = GOOGLE_REVIEW_URL;
  if (!REVIEWS.length) return;
  REVIEWS.slice(0, 6).forEach(function (r) {
    var stars = Math.max(1, Math.min(5, r.stars || 5));
    var card = el("article", { "class": "rv" });
    card.innerHTML =
      "<div class=\"rv-stars\" aria-label=\"" + stars + " out of 5 stars\">" + "★★★★★".slice(0, stars) + "</div>" +
      "<div class=\"rv-text\" lang=\"en\" dir=\"ltr\">" + r.text.split(/\n\s*\n/).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>" +
      "<button type=\"button\" class=\"link-btn rv-more\" hidden>Read more</button>" +
      "<footer><span class=\"rv-avatar\" aria-hidden=\"true\">" + esc(r.name.charAt(0).toUpperCase()) + "</span>" +
      "<span>" + esc(r.name) + "<small>Google review</small>" + "</span></footer>";
    grid.appendChild(card);
  });
  grid.hidden = false;
  grid.querySelectorAll(".rv").forEach(function (card) {
    var txt = card.querySelector(".rv-text"), more = card.querySelector(".rv-more");
    if (txt.scrollHeight <= txt.clientHeight + 4) txt.classList.add("short");
    else {
      more.hidden = false;
      more.addEventListener("click", function () {
        var open = card.classList.toggle("open");
        more.textContent = open ? "Show less" : "Read more";
      });
    }
  });
})();
