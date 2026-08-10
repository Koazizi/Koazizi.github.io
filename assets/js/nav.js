/* Mobile navigation toggle.
   The site is fully readable and navigable without JavaScript: every nav item is
   a real link, and the `no-js` class (removed below) keeps the menu expanded when
   scripting is unavailable. */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var toggle = document.querySelector(".nav__toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.hidden = false;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Collapse the menu when focus leaves it on small screens.
  nav.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
})();
