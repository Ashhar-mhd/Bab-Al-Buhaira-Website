/* Bab Al Buhaira website: English / Arabic.
   English text in the page is the key. Translations live in window.BAB_LANG_AR (lang-ar.js).
   Every text node and placeholder/aria-label is translated on load, on language change, and whenever scripts add new content. */
(function () {
  var KEY = "bab-lang";
  var DICTS = { ar: window.BAB_LANG_AR || {} };
  var PATTERNS = {
    ar: [
      [/^AED ([\d,.]+) each$/, "‏$1 درهم للوحدة"],
      [/^From AED ([\d,.]+)$/, "ابتداءً من $1 درهم"],
      [/^AED ([\d,.]+)$/, "$1 درهم"]
    ]
  };
  var FONTS = {
    ar: "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
  };

  var lang = "en";
  try { var saved = localStorage.getItem(KEY); if (saved === "ar") lang = saved; } catch (e) {}

  var ATTRS = ["placeholder", "aria-label", "title"];
  var busy = false;

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }
  function t(en) {
    if (lang === "en") return en;
    var k = norm(en);
    if (!k) return en;
    var d = DICTS[lang];
    if (Object.prototype.hasOwnProperty.call(d, k)) return d[k];
    var ps = PATTERNS[lang] || [];
    for (var i = 0; i < ps.length; i++) if (ps[i][0].test(k)) return k.replace(ps[i][0], ps[i][1]);
    return en;
  }
  function skip(node) {
    var p = node.parentNode;
    while (p && p.nodeType === 1) {
      if (p.hasAttribute("data-no-i18n") || p.tagName === "SCRIPT" || p.tagName === "STYLE") return true;
      p = p.parentNode;
    }
    return false;
  }
  function doText(n) {
    if (skip(n)) return;
    var en;
    if (n.__babOut === undefined || n.nodeValue !== n.__babOut) { en = n.nodeValue; n.__babEn = en; }
    else en = n.__babEn;
    if (!norm(en)) return;
    var out = t(en);
    if (out !== en) out = en.match(/^\s*/)[0] + norm(out) + en.match(/\s*$/)[0];
    n.__babOut = out;
    if (n.nodeValue !== out) n.nodeValue = out;
  }
  function doEl(el) {
    if (el.hasAttribute("data-no-i18n")) return;
    el.__babAttrEn = el.__babAttrEn || {}; el.__babAttrOut = el.__babAttrOut || {};
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var cur = el.getAttribute(a);
      if (el.__babAttrOut[a] === undefined || cur !== el.__babAttrOut[a]) el.__babAttrEn[a] = cur;
      var out = t(el.__babAttrEn[a]);
      el.__babAttrOut[a] = out;
      if (cur !== out) el.setAttribute(a, out);
    }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doEl(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) { if (n.nodeType === 3) doText(n); else doEl(n); }
  }

  function loadFont() {
    if (!FONTS[lang] || document.getElementById("font-" + lang)) return;
    var l = document.createElement("link");
    l.rel = "stylesheet"; l.href = FONTS[lang]; l.id = "font-" + lang;
    document.head.appendChild(l);
  }
  function setDocLang() {
    var h = document.documentElement;
    h.setAttribute("lang", lang);
    h.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      var toAr = lang !== "ar";
      var l = b.querySelector(".lt-label") || b;
      l.textContent = toAr ? "عربي" : "EN";
      l.setAttribute("lang", toAr ? "ar" : "en");
      b.setAttribute("aria-label", toAr ? "عرض الموقع بالعربية" : "View site in English");
    });
  }
  function apply() {
    busy = true;
    setDocLang(); loadFont();
    walk(document.body);
    document.title = lang === "en" ? "Bab Al Buhaira Typing Services | Visa & Typing Centre, Sharjah" : t("Bab Al Buhaira Typing Services") + " | خدمات الطباعة والتأشيرات، الشارقة";
    busy = false;
  }
  function setLang(l) {
    lang = l === "ar" ? l : "en";
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply();
    document.dispatchEvent(new CustomEvent("bab:lang", { detail: lang }));
  }

  var mo = new MutationObserver(function (list) {
    if (busy || lang === "en") return;
    busy = true;
    list.forEach(function (m) {
      if (m.type === "characterData") doText(m.target);
      else if (m.type === "attributes") doEl(m.target);
      else m.addedNodes.forEach(walk);
    });
    busy = false;
  });

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-lang-toggle]");
    if (b) setLang(lang === "ar" ? "en" : "ar");
  });

  window.I18N = { t: t, get lang() { return lang; }, set: setLang };

  function start() {
    apply();
    mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
