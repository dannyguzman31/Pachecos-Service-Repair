/* MODERN MOTION KIT · Local Business Edition
   Vanilla JS: reveal sutil + estado visual del header. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".mk-reveal, .mk-image-reveal, .mk-stagger");

  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("mk-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("mk-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  var header = document.querySelector(".mk-header");
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("mk-scrolled", window.scrollY > 18);
    };
    addEventListener("scroll", syncHeader, { passive: true });
    syncHeader();

    var syncHeaderHeight = function () {
      document.documentElement.style.setProperty("--hdr-h", header.offsetHeight + "px");
    };
    syncHeaderHeight();
    addEventListener("resize", syncHeaderHeight);
    if ("ResizeObserver" in window) {
      new ResizeObserver(syncHeaderHeight).observe(header);
    }
  }
})();
