/* ===================================================================
   Interactions — Jean-Victor
   =================================================================== */
(function () {
  "use strict";

  // --- Année dans le footer ---
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Header : fond au défilement ---
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Menu mobile ---
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Apparition au défilement ---
  var revealTargets = document.querySelectorAll(
    ".section-head, .pillar, .tl-item, .step, .eco-card, .quote, .stat, .profil-portrait, .profil-text, .contact-form"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  }

  // --- Formulaire de contact (ouvre l'email pré-rempli) ---
  var form = document.getElementById("contactForm");
  var hint = document.getElementById("formHint");
  // ⚠️ À remplacer par l'adresse réelle de Jean-Victor :
  var CONTACT_EMAIL = "contact@example.com";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var company = form.company.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        setHint("Merci de renseigner votre nom, votre email et votre message.", "error");
        return;
      }

      var subject = "Demande de coaching — " + name + (company ? " (" + company + ")" : "");
      var body =
        "Nom : " + name + "\n" +
        "Email : " + email + "\n" +
        (company ? "Entreprise : " + company + "\n" : "") +
        "\n" + message + "\n";

      window.location.href =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      setHint("Votre messagerie va s'ouvrir pour finaliser l'envoi. Merci !", "success");
      form.reset();
    });
  }

  function setHint(text, type) {
    if (!hint) return;
    hint.textContent = text;
    hint.classList.remove("success", "error");
    if (type) hint.classList.add(type);
  }
})();
