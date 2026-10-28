/* Bab Al Buhaira visa calculator.
   All prices are all-in AED (government fee + service charge), per unit.
   A line with price null means "price on request": the total is hidden and the visitor is asked to WhatsApp.
   Prices set by Bab Al Buhaira, October 2026. Edit FEES to change any price. */

(function () {
  var WA = "971544221615";
  var PRICE_DATE = "Prices checked October 2026.";

  var FEES = {
    family: {
      fileOpening:      { dubai: 295,  other: 395 },
      entryIn:          { dubai: 1095, other: 395 },
      entryOut:         { dubai: 395,  other: 395 },
      entryInPak:       { dubai: 1195, other: 395 },
      entryOutPak:      { dubai: 445,  other: 395 },
      changeStatus:     { dubai: 695,  other: 695 },
      emiratesId2y:     { dubai: 380,  other: 350 },
      medical:          300,
      stamping:         495,
      insurance:        { basic: 350, clinic: 430, premium: 850, own: 0, abuDhabi: 1180 },
      attestMofa:       245,
      attestEmbassy:    450
    },
    employee: {
      offerLetter:      { basic: 195, degree: 1145 },
      labourInsurance:  190,
      labourPayment:    { cat1: 345, cat2: 1300, cat3: 3555 },
      entryIn:          { dubai: 1145, other: 395 },
      entryOut:         { dubai: 495,  other: 395 },
      changeStatus:     695,
      medical:          { normal: 300, vip: 750 },
      emiratesId:       { dubai: 380, other: 350 },
      tawjeeh:          145,
      iloe:             { low: 135, high: 280 },
      stamping:         495,
      renewTyping:      95,
      familyPermit:     745,
      partTimePermit:   505,
      cancellation:     345
    },
    newborn:            { dubai: 880, other: 850, golden: 2780 },
    visit:              { d30: 355, d60: 495, tourist: 300, transit: 145, extension: 995, a2a: 1145 }
  };

  var EMIRATES = [
    ["dubai", "Dubai"], ["sharjah", "Sharjah"], ["abudhabi", "Abu Dhabi"], ["ajman", "Ajman"],
    ["uaq", "Umm Al Quwain"], ["rak", "Ras Al Khaimah"], ["fujairah", "Fujairah"]
  ];
  function zone(s) { return s.emirate === "dubai" ? "dubai" : "other"; }
  function emirateName(v) { for (var i = 0; i < EMIRATES.length; i++) if (EMIRATES[i][0] === v) return EMIRATES[i][1]; return v; }

  /* ---------- categories ---------- */
  var CATS = [
    {
      id: "family", name: "Family visa", hint: "Spouse & children",
      fields: [
        { id: "emirate", label: "Which emirate is the sponsor's visa from?", type: "select", options: EMIRATES, def: "dubai" },
        { id: "mode", label: "New visa or renewal?", type: "seg", options: [["new", "New visa"], ["renew", "Renewal"]], def: "new" },
        { id: "pak", label: "Is the sponsor a Pakistani national?", type: "seg", options: [["no", "No"], ["yes", "Yes"]], def: "no",
          show: function (s) { return s.emirate === "dubai" && s.mode === "new"; } },
        { id: "tenancy", label: "Does the sponsor have a tenancy contract in their name?", type: "seg", options: [["yes", "Yes"], ["no", "No"]], def: "yes",
          show: function (s) { return s.emirate !== "dubai"; } },
        { id: "where", label: "Where are the family members now?", type: "seg", options: [["out", "Outside UAE"], ["in", "Inside UAE"]], def: "out",
          show: function (s) { return s.mode === "new"; } },
        { id: "adults", label: "Adults (18 and over)", type: "count", def: 1, help: "Spouse or adult children. Parents are quoted separately." },
        { id: "children", label: "Children (under 18)", type: "count", def: 2 },
        { id: "file", label: "Is the sponsor's family file already open?", type: "seg", options: [["no", "No"], ["yes", "Yes"]], def: "no",
          show: function (s) { return s.mode === "new"; } },
        { id: "insurance", label: "Health insurance", type: "select", def: "basic",
          options: [["basic", "Basic plan"], ["clinic", "Clinic plan"], ["premium", "Premium plan"], ["own", "I have my own policy"]],
          show: function (s) { return s.emirate !== "dubai" && s.emirate !== "abudhabi"; } },
        { id: "adIns", label: "Health insurance (Abu Dhabi)", type: "seg", options: [["yes", "Add insurance"], ["own", "I have my own"]], def: "yes",
          show: function (s) { return s.emirate === "abudhabi"; } },
        { id: "attest", label: "Indian certificate attestation", type: "select", def: "none",
          options: [["none", "Not needed"], ["mofa", "MOFA only"], ["embassy", "Embassy + MOFA"]],
          help: "Marriage or birth certificates issued in India." },
        { id: "certs", label: "Number of certificates", type: "count", def: 1, min: 1,
          show: function (s) { return s.attest !== "none"; } }
      ],
      compute: function (s) {
        var F = FEES.family, z = zone(s), L = [], notes = [], quote = false;
        var people = s.adults + s.children;
        if (s.mode === "new") {
          if (s.file !== "yes") L.push(["Family file opening", 1, F.fileOpening[z]]);
          var entry = s.where === "in"
            ? (z === "dubai" && s.pak === "yes" ? F.entryInPak : F.entryIn)
            : (z === "dubai" && s.pak === "yes" ? F.entryOutPak : F.entryOut);
          L.push(["Entry permit" + (s.where === "in" ? " (inside UAE)" : " (outside UAE)"), people, entry[z]]);
          if (s.where === "in") L.push(["Change of status", people, F.changeStatus[z]]);
        } else {
          notes.push("Renewal does not need a new entry permit or change of status.");
        }
        L.push(["Medical fitness test (18+)", s.adults, F.medical]);
        L.push(["Emirates ID, 2 years", people, F.emiratesId2y[z]]);
        L.push(["Residence visa stamping", people, F.stamping]);
        if (s.emirate === "abudhabi") {
          if (s.adIns === "yes") L.push(["Health insurance", people, F.insurance.abuDhabi]);
        } else if (z === "other" && s.insurance !== "own") {
          var names = { basic: "Basic", clinic: "Clinic", premium: "Premium" };
          L.push(["Health insurance, " + names[s.insurance] + " plan", people, F.insurance[s.insurance]]);
        }
        if (s.attest !== "none") L.push([s.attest === "mofa" ? "Certificate attestation, MOFA" : "Certificate attestation, Embassy + MOFA", s.certs, s.attest === "mofa" ? F.attestMofa : F.attestEmbassy]);
        if (s.children > 0) notes.push("Children under 18 do not need a medical test.");
        if (s.emirate !== "dubai" && s.tenancy === "no") { quote = true; notes.push("Without a tenancy contract in the sponsor's name we need to check the case first."); }
        return { lines: L, notes: notes, quote: quote };
      },
      docs: ["Sponsor's passport, visa and Emirates ID", "Family member's passport and white-background photo", "Attested marriage certificate (spouse)", "Attested birth certificate (children)", "Tenancy contract and utility bill", "Salary certificate or labour contract"]
    },
    {
      id: "employee", name: "Employee visa", hint: "Work permits",
      fields: [
        { id: "service", label: "What do you need?", type: "select", def: "new",
          options: [["new", "New employee visa"], ["renew", "Employee visa renewal"], ["familyPermit", "Work permit for family or Golden Visa holder"], ["partTime", "Part-time work permit"], ["cancel", "Visa cancellation"]] },
        { id: "emirate", label: "Company location", type: "select", options: EMIRATES, def: "dubai",
          show: function (s) { return s.service === "new" || s.service === "renew"; } },
        { id: "category", label: "Company category (MOHRE)", type: "select", def: "cat1",
          options: [["cat1", "Category 1"], ["cat2", "Category 2"], ["cat3", "Category 3"]],
          show: function (s) { return s.service === "new" || s.service === "renew"; },
          help: "Shown on the company's MOHRE establishment record. Ask us if you are not sure." },
        { id: "qual", label: "Employee's qualification", type: "seg", options: [["basic", "No degree"], ["degree", "University degree"]], def: "basic",
          show: function (s) { return s.service === "new"; } },
        { id: "where", label: "Where is the employee now?", type: "seg", options: [["out", "Outside UAE"], ["in", "Inside UAE"]], def: "out",
          show: function (s) { return s.service === "new"; } },
        { id: "medical", label: "Medical test", type: "seg", options: [["normal", "Normal"], ["vip", "VIP (faster)"]], def: "normal",
          show: function (s) { return s.service === "new" || s.service === "renew"; } },
        { id: "salary", label: "Basic salary", type: "seg", options: [["low", "Up to AED 16,000"], ["high", "Above AED 16,000"]], def: "low",
          show: function (s) { return s.service === "new" || s.service === "renew"; }, help: "Used for job loss insurance (ILOE)." }
      ],
      compute: function (s) {
        var F = FEES.employee, z = zone(s), L = [], notes = ["Price is for one employee."];
        if (s.service === "new") {
          L.push(["Offer letter & work permit typing", 1, F.offerLetter[s.qual]]);
          L.push(["Labour insurance", 1, F.labourInsurance]);
          L.push(["Labour payment", 1, F.labourPayment[s.category]]);
          L.push(["Entry permit" + (s.where === "in" ? " (inside UAE)" : " (outside UAE)"), 1, (s.where === "in" ? F.entryIn : F.entryOut)[z]]);
          if (s.where === "in") L.push(["Change of status", 1, F.changeStatus]);
          L.push(["Medical fitness test, " + (s.medical === "vip" ? "VIP" : "normal"), 1, F.medical[s.medical]]);
          L.push(["Emirates ID", 1, F.emiratesId[z]]);
          L.push(["Tawjeeh orientation", 1, F.tawjeeh]);
          L.push(["Job loss insurance (ILOE)", 1, F.iloe[s.salary]]);
          L.push(["Residence visa stamping", 1, F.stamping]);
        } else if (s.service === "renew") {
          L.push(["Renewal typing", 1, F.renewTyping]);
          L.push(["Labour payment", 1, F.labourPayment[s.category]]);
          L.push(["Labour insurance", 1, F.labourInsurance]);
          L.push(["Medical fitness test, " + (s.medical === "vip" ? "VIP" : "normal"), 1, F.medical[s.medical]]);
          L.push(["Emirates ID", 1, F.emiratesId[z]]);
          L.push(["Job loss insurance (ILOE)", 1, F.iloe[s.salary]]);
          L.push(["Residence visa stamping", 1, F.stamping]);
        } else if (s.service === "familyPermit") {
          L.push(["Work permit (family or Golden Visa sponsored)", 1, F.familyPermit]);
        } else if (s.service === "partTime") {
          L.push(["Part-time work permit", 1, F.partTimePermit]);
        } else {
          L.push(["Visa cancellation", 1, F.cancellation]);
        }
        return { lines: L, notes: notes, quote: false };
      },
      docs: ["Employee passport and white-background photo", "Company trade licence and establishment card", "Signed offer letter", "Attested degree (for skilled job titles)", "Current visa and Emirates ID (for renewal)"]
    },
    {
      id: "newborn", name: "Newborn visa", hint: "Baby born in UAE",
      fields: [
        { id: "emirate", label: "Which emirate is the sponsor's visa from?", type: "select", options: EMIRATES, def: "dubai" },
        { id: "golden", label: "Is the sponsor a Golden Visa holder?", type: "seg", options: [["no", "No"], ["yes", "Yes"]], def: "no" },
        { id: "cert", label: "Is the birth certificate ready?", type: "seg", options: [["yes", "Yes"], ["no", "Not yet"]], def: "yes" },
        { id: "babies", label: "Number of babies", type: "count", def: 1, min: 1 }
      ],
      compute: function (s) {
        var F = FEES.newborn, notes = [];
        var price = s.golden === "yes" ? F.golden : F[zone(s)];
        var quote = s.cert === "no";
        if (quote) notes.push("We need the birth certificate first. Message us and we guide you through it.");
        notes.push("Apply within 120 days of birth to avoid fines.");
        return { lines: [["Newborn residence visa" + (s.golden === "yes" ? " (Golden Visa sponsor)" : ""), s.babies, price]], notes: notes, quote: quote };
      },
      docs: ["Baby's birth certificate (Arabic, attested)", "Baby's passport", "Parents' passports, visas and Emirates IDs", "Baby's white-background photo"]
    },
    {
      id: "visit", name: "UAE visit visa", hint: "Family & friends",
      fields: [
        { id: "type", label: "Visa type", type: "select", def: "d30",
          options: [["d30", "30-day visit visa"], ["d60", "60-day visit visa"], ["tourist", "Tourist visa"], ["transit", "Transit visa"], ["extension", "Visit visa extension"], ["a2a", "Airport-to-airport visa change"]] },
        { id: "people", label: "Travellers", type: "count", def: 1, min: 1 }
      ],
      compute: function (s) {
        var names = { d30: "30-day visit visa", d60: "60-day visit visa", tourist: "Tourist visa", transit: "Transit visa", extension: "Visit visa extension", a2a: "Airport-to-airport visa change" };
        return {
          lines: [[names[s.type] + " (from)", s.people, FEES.visit[s.type]]],
          notes: ["Starting price. The final price depends on nationality and travel dates."],
          quote: false, from: true
        };
      },
      docs: ["Passport copy with 6+ months validity", "White-background passport photo", "Return ticket (some nationalities)"]
    },
    {
      id: "golden", name: "Golden Visa", hint: "5 or 10 years",
      fields: [
        { id: "route", label: "Which route?", type: "select", def: "professional",
          options: [["professional", "Skilled professional"], ["property", "Property investor"], ["investor", "Business investor"], ["student", "Outstanding student"], ["retiree", "Retiree"]] },
        { id: "emirate", label: "Emirate", type: "select", options: EMIRATES, def: "dubai" },
        { id: "dependants", label: "Family members to add", type: "count", def: 0 }
      ],
      compute: function () {
        return { lines: [], notes: ["Golden Visa fees depend on your route and documents. We check eligibility first, then send an exact quote."], quote: true };
      },
      docs: ["Passport and current visa", "Emirates ID", "Proof for your route: salary certificate, degree, title deed or investment papers", "White-background passport photo"]
    },
    {
      id: "property", name: "Property visa", hint: "Own a home",
      fields: [
        { id: "emirate", label: "Where is the property?", type: "select", options: EMIRATES, def: "dubai" },
        { id: "value", label: "Property value", type: "select", def: "750",
          options: [["750", "AED 750,000 to 2 million"], ["2m", "AED 2 million or more"]] },
        { id: "dependants", label: "Family members to add", type: "count", def: 0 }
      ],
      compute: function () {
        return { lines: [], notes: ["Property visa fees depend on the title deed and mortgage status. We send an exact quote after checking."], quote: true };
      },
      docs: ["Title deed", "Passport and photo", "Mortgage statement (if any)", "Emirates ID (if resident)"]
    },
    {
      id: "maid", name: "Maid & nanny visa", hint: "Domestic workers",
      fields: [
        { id: "emirate", label: "Sponsor's emirate", type: "select", options: EMIRATES, def: "dubai" },
        { id: "where", label: "Where is the worker now?", type: "seg", options: [["out", "Outside UAE"], ["in", "Inside UAE"]], def: "out" }
      ],
      compute: function () {
        return { lines: [], notes: ["Domestic worker visa fees depend on the sponsor's file and the worker's nationality. We reply with an exact quote."], quote: true };
      },
      docs: ["Sponsor's passport, visa and Emirates ID", "Worker's passport and photo", "Tenancy contract", "Salary certificate"]
    }
  ];

  /* ---------- state ---------- */
  var catBox = document.getElementById("c-cats");
  var fieldsBox = document.getElementById("c-fields");
  if (!catBox || !fieldsBox) return;

  var cat = CATS[0], state = {};
  function byId(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function money(n) { return n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
  function round2(n) { return Math.round(n * 100) / 100; }

  function defaults(c) {
    var s = {};
    c.fields.forEach(function (f) { s[f.id] = f.def; });
    return s;
  }
  function visible(f) { return !f.show || f.show(state); }

  /* ---------- category picker ---------- */
  CATS.forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "cat"; b.setAttribute("role", "radio"); b.dataset.cat = c.id;
    b.innerHTML = "<strong>" + esc(c.name) + "</strong><span>" + esc(c.hint) + "</span>";
    b.addEventListener("click", function () { open(c.id); });
    catBox.appendChild(b);
  });

  function open(id) {
    var c = CATS.filter(function (x) { return x.id === id; })[0];
    if (!c) return;
    cat = c; state = defaults(c);
    catBox.querySelectorAll(".cat").forEach(function (b) { b.setAttribute("aria-checked", b.dataset.cat === id ? "true" : "false"); });
    renderFields(); compute();
    var res = document.querySelector(".calc-result");
    if (res) { res.classList.remove("swap"); void res.offsetWidth; res.classList.add("swap"); }
  }

  /* ---------- fields ---------- */
  function renderFields() {
    fieldsBox.innerHTML = "";
    cat.fields.forEach(function (f) {
      if (!visible(f)) return;
      var wrap = document.createElement("div");
      wrap.className = "field";
      var fid = "f-" + cat.id + "-" + f.id;
      var help = f.help ? "<small class=\"help\">" + esc(f.help) + "</small>" : "";
      if (f.type === "select") {
        wrap.innerHTML = "<label for=\"" + fid + "\">" + esc(f.label) + "</label><select id=\"" + fid + "\">" +
          f.options.map(function (o) { return "<option value=\"" + o[0] + "\"" + (state[f.id] === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>"; }).join("") +
          "</select>" + help;
        wrap.querySelector("select").addEventListener("change", function (e) { set(f.id, e.target.value); });
      } else if (f.type === "seg") {
        wrap.setAttribute("role", "group");
        wrap.setAttribute("aria-labelledby", fid + "-l");
        wrap.innerHTML = "<span class=\"flabel\" id=\"" + fid + "-l\">" + esc(f.label) + "</span><div class=\"seg\">" +
          f.options.map(function (o, i) {
            var oid = fid + "-" + i;
            return "<input type=\"radio\" name=\"" + fid + "\" id=\"" + oid + "\" value=\"" + o[0] + "\"" + (state[f.id] === o[0] ? " checked" : "") + "><label for=\"" + oid + "\">" + esc(o[1]) + "</label>";
          }).join("") + "</div>" + help;
        wrap.querySelectorAll("input").forEach(function (r) { r.addEventListener("change", function () { set(f.id, r.value); }); });
      } else if (f.type === "count") {
        var min = f.min || 0;
        wrap.innerHTML = "<label for=\"" + fid + "\">" + esc(f.label) + "</label><div class=\"stepper\">" +
          "<button type=\"button\" data-d=\"-1\" aria-label=\"One less\">−</button>" +
          "<input id=\"" + fid + "\" type=\"number\" inputmode=\"numeric\" min=\"" + min + "\" max=\"20\" value=\"" + state[f.id] + "\">" +
          "<button type=\"button\" data-d=\"1\" aria-label=\"One more\">+</button></div>" + help;
        var inp = wrap.querySelector("input");
        var clamp = function (v) { v = parseInt(v, 10); if (isNaN(v)) v = min; return Math.max(min, Math.min(20, v)); };
        inp.addEventListener("input", function () { state[f.id] = clamp(inp.value); compute(); });
        inp.addEventListener("blur", function () { inp.value = state[f.id]; });
        wrap.querySelectorAll("button").forEach(function (b) {
          b.addEventListener("click", function () { state[f.id] = clamp(state[f.id] + parseInt(b.dataset.d, 10)); inp.value = state[f.id]; compute(); });
        });
      }
      fieldsBox.appendChild(wrap);
    });
  }

  function set(key, val) {
    var before = cat.fields.map(visible).join();
    state[key] = val;
    if (cat.fields.map(visible).join() !== before) {
      var focusId = document.activeElement && document.activeElement.id;
      renderFields();
      if (focusId && byId(focusId)) byId(focusId).focus();
    }
    compute();
  }

  /* ---------- result ---------- */
  var lastText = "";
  function compute() {
    var r = cat.compute(state);
    var lines = r.lines.filter(function (l) { return l[1] > 0; });
    var quote = r.quote || lines.some(function (l) { return l[2] == null; }) || lines.length === 0;
    var total = 0, rows = "";
    lines.forEach(function (l) {
      var sub = l[2] == null ? null : round2(l[2] * l[1]);
      if (sub != null) total = round2(total + sub);
      rows += "<tr><td>" + esc(l[0]) + "<small>" + (l[2] == null ? "Price on request" : "AED " + money(l[2]) + " each") + "</small></td>" +
        "<td class=\"q\">" + l[1] + "</td><td>" + (sub == null ? "—" : money(sub)) + "</td></tr>";
    });
    if (!rows) rows = "<tr><td colspan=\"3\" class=\"empty\">We prepare an itemised quote for this visa after a quick check.</td></tr>";

    byId("r-title").textContent = cat.name;
    byId("r-lines").innerHTML = rows;
    var badge = byId("r-badge");
    badge.textContent = quote ? "Quote needed" : (r.from ? "Starting price" : "Estimate");
    badge.className = "badge " + (quote ? "badge-est" : "badge-ok");
    var totalEl = byId("r-total");
    var newTotal = quote ? "On request" : (r.from ? "From " : "") + "AED " + money(total);
    if (totalEl.textContent !== newTotal && totalEl.textContent !== "AED 0") { totalEl.classList.remove("bump"); void totalEl.offsetWidth; totalEl.classList.add("bump"); document.dispatchEvent(new CustomEvent("bab:total")); }
    totalEl.textContent = newTotal;
    byId("r-quote").hidden = !quote;
    byId("r-notes").innerHTML = (r.notes || []).map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("");
    byId("r-docs").innerHTML = cat.docs.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("");
    byId("r-date").textContent = PRICE_DATE;

    var answers = cat.fields.filter(visible).map(function (f) {
      var v = state[f.id];
      if (f.options) for (var i = 0; i < f.options.length; i++) if (f.options[i][0] === v) v = f.options[i][1];
      return "- " + f.label.replace(/\?$/, "") + ": " + v;
    });
    lastText = "Visa estimate from babalbuhaira.com\n" + cat.name + "\n" + answers.join("\n") + "\n\n" +
      (lines.length ? lines.map(function (l) { return l[0] + " x" + l[1] + (l[2] == null ? ": on request" : ": AED " + money(round2(l[2] * l[1]))); }).join("\n") + "\n" : "") +
      (quote ? "Total: please send me a quote." : "Total: " + (r.from ? "from " : "") + "AED " + money(total));
    byId("r-wa").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent("Hello Bab Al Buhaira, please confirm this:\n\n" + lastText);
  }

  byId("r-copy").addEventListener("click", function () {
    var b = this;
    var ok = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy estimate"; }, 1600); };
    try { navigator.clipboard.writeText(lastText).then(ok, function () { b.textContent = "Copy not allowed here"; }); }
    catch (e) { b.textContent = "Copy not allowed here"; }
  });
  byId("c-reset").addEventListener("click", function () { open(cat.id); });
  byId("calc-form").addEventListener("submit", function (e) { e.preventDefault(); });

  window.BABCalc = { open: open, fees: FEES };
  open("family");
})();
