/* Accessible navigation and light progressive enhancement.
   All essential content and ordinary links remain available without JavaScript. */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav__toggle");
  var nav = document.getElementById("site-nav");
  var navList = nav && nav.querySelector(".nav__list");

  /* Load the refinement layer on retained pages, including Publications. */
  if (!document.querySelector('link[href="assets/css/refinement.css"], link[href="/assets/css/refinement.css"]')) {
    var style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "assets/css/refinement.css";
    document.head.appendChild(style);
  }

  /* Keep the personal identity consistent on retained repository pages. */
  var mark = document.querySelector(".brand__mark");
  var sub = document.querySelector(".brand__sub");
  if (mark) mark.textContent = "Koorosh Azizi";
  if (sub) sub.textContent = "Urban Hydrosystems & Resilience Lab";
  document.querySelectorAll('.nav__link[href$="people.html"]').forEach(function (link) {
    link.textContent = "About";
  });

  /* Add Open Science only when an equivalent section link is absent. */
  if (navList && !navList.querySelector('a[href$="#open-science"]')) {
    var item = document.createElement("li");
    item.innerHTML = '<a class="nav__link" href="research.html#open-science">Open Science</a>';
    var news = navList.querySelector('a[href$="news.html"]');
    navList.insertBefore(item, news ? news.parentElement : null);
  }

  document.querySelectorAll(".site-footer__grid > div:first-child h2").forEach(function (heading) {
    heading.textContent = "Koorosh Azizi";
  });
  document.querySelectorAll('.site-footer a[href$="people.html"]').forEach(function (link) {
    link.textContent = "About";
  });

  /* Give the retained chronological Publications page an identity-first entry point. */
  if (/publications\.html$/.test(location.pathname)) {
    var pageHead = document.querySelector(".page-head");
    var heading = pageHead && pageHead.querySelector("h1");
    var lede = pageHead && pageHead.querySelector(".page-head__lede");
    if (heading) heading.textContent = "Publications across the research program";
    if (lede) lede.textContent = "Selected contributions show a coherent program on coupled urban water systems; the complete chronological record follows below.";

    if (pageHead && !document.querySelector(".publication-program")) {
      var section = document.createElement("section");
      section.className = "section section--tint publication-program";
      section.innerHTML =
        '<div class="wrap">' +
          '<div class="section-head identity-section-head">' +
            '<p class="eyebrow">Selected contributions</p>' +
            '<h2>Selected papers that define the program</h2>' +
            '<p>Across flood risk, water services and distributed infrastructure, these studies show how hydrology and infrastructure interact with institutions, finance and human behavior to shape system trajectories and equity.</p>' +
          '</div>' +
          '<div class="publication-program-grid">' +
            '<article><span>Distributed infrastructure</span><h3>Coupled human–environmental systems in green stormwater adoption</h3><p><em>Nature Cities</em>, 2026</p><a href="research.html#theme-stormwater">Related research</a></article>' +
            '<article><span>Network governance</span><h3>Gaps and opportunities for collaborative flood governance</h3><p><em>Water Resources Research</em>, 2026</p><a href="https://doi.org/10.1029/2025WR041974" rel="noopener">DOI</a></article>' +
            '<article><span>Exposure &amp; behavior</span><h3>Flood exposure and household green stormwater infrastructure adoption</h3><p><em>Environmental Research Communications</em>, 2026</p><a href="https://doi.org/10.1088/2515-7620/ae3ff0" rel="noopener">DOI</a></article>' +
            '<article><span>Water transitions</span><h3>Equity implications of efficient water conservation programs</h3><p><em>Environmental Research Letters</em>, 2024</p><a href="https://doi.org/10.1088/1748-9326/ad691a" rel="noopener">DOI</a></article>' +
            '<article><span>Water services</span><h3>Conditions supporting high-quality and affordable urban drinking water</h3><p><em>Journal of Water Resources Planning and Management</em>, 2024</p><a href="https://doi.org/10.1061/JWRMD5.WRENG-6289" rel="noopener">DOI</a></article>' +
            '<article><span>Institutional feedbacks</span><h3>Institutional dynamics in urban socio-hydrologic systems</h3><p><em>Water Resources Research</em>, 2024</p><a href="https://doi.org/10.1029/2023WR035565" rel="noopener">DOI</a></article>' +
          '</div>' +
        '</div>';
      pageHead.insertAdjacentElement("afterend", section);
    }
  }

  /* Mark one page-level item as current. Section links do not compete with it. */
  var canonical = document.querySelector('link[rel="canonical"]');
  var currentPath = canonical ? new URL(canonical.href).pathname : location.pathname;
  var current = currentPath.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach(function (link) {
    var rawHref = link.getAttribute("href") || "";
    var href = rawHref.split("#")[0].split("/").pop();
    link.removeAttribute("aria-current");
    if (rawHref.indexOf("#") === -1 && href && href === current) {
      link.setAttribute("aria-current", "page");
    }
  });

  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (!toggle || !nav) return;
  toggle.hidden = false;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a") && window.matchMedia("(max-width: 1040px)").matches) setOpen(false);
  });

  document.addEventListener("click", function (event) {
    if (!nav.classList.contains("is-open")) return;
    if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (!window.matchMedia("(max-width: 1040px)").matches) setOpen(false);
  });
})();
