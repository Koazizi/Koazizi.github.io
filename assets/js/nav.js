/* Accessible navigation enhancement.
   All content and links work without JavaScript; this file only adds the
   mobile menu toggle, the scrolled-header state and current-page marking.
   It deliberately does NOT rewrite branding, navigation labels or page
   content — the HTML is the single source of truth. */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav__toggle");
  var nav = document.getElementById("site-nav");

  /* Mark the current page in the navigation. Section links don't compete. */
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
