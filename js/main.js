/**
 * Comportements communs à toutes les pages : menu mobile, thème, retour en haut,
 * animations. Les textes et les projets sont déjà dans le HTML généré par scripts/build.js.
 */

function initBurgerMenu() {
  const burgerButton = safeQuerySelector("#burger-button");
  const navMenu = safeQuerySelector("#nav-menu");
  if (!burgerButton || !navMenu) {
    return;
  }

  const mainContent = document.querySelector("main");
  const footerContent = document.querySelector("footer");
  const setMenuState = (isOpen, restoreFocus = false) => {
    navMenu.classList.toggle("open", isOpen);
    burgerButton.classList.toggle("open", isOpen);
    burgerButton.setAttribute("aria-expanded", String(isOpen));
    burgerButton.setAttribute("aria-label", isOpen ? burgerButton.dataset.labelClose : burgerButton.dataset.labelOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (mainContent) mainContent.inert = isOpen;
    if (footerContent) footerContent.inert = isOpen;
    if (isOpen) {
      navMenu.querySelector("a[href], button:not([disabled])")?.focus({ preventScroll: true });
    } else if (restoreFocus) {
      burgerButton.focus({ preventScroll: true });
    }
  };

  burgerButton.addEventListener("click", () => {
    setMenuState(!navMenu.classList.contains("open"));
  });

  navMenu.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("click", () => {
      setMenuState(false, true);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("open")) {
      setMenuState(false, true);
      return;
    }
    if (event.key === "Tab" && navMenu.classList.contains("open")) {
      const focusableItems = Array.from(navMenu.querySelectorAll("a[href], button:not([disabled])"));
      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && navMenu.classList.contains("open")) {
      setMenuState(false);
    }
  });
}

function updateThemeToggleLabel() {
  const button = document.querySelector("[data-theme-toggle]");
  const label = button?.querySelector("[data-theme-label]");
  if (!button || !label) return;
  const isDark = document.documentElement.dataset.theme === "dark";
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = isDark ? "#111923" : "#f7f6f2";
  // Le libellé décrit l'action proposée ; il change avec le thème, donc pas d'aria-pressed en plus.
  label.textContent = isDark ? button.dataset.labelLight : button.dataset.labelDark;
  const icon = button.querySelector(".theme-toggle-icon");
  if (icon) icon.textContent = isDark ? "☀" : "☾";
}

function initThemeToggle() {
  const button = document.querySelector("[data-theme-toggle]");
  if (!button) return;
  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try { localStorage.setItem("theme", nextTheme); } catch (_) {}
    updateThemeToggleLabel();
  });
  updateThemeToggleLabel();
}

function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;
  const syncVisibility = () => {
    button.hidden = window.scrollY < 480;
  };
  window.addEventListener("scroll", syncVisibility, { passive: true });
  // Lecture de scrollY reportée à la prochaine frame pour ne pas forcer un calcul de mise en page au chargement.
  requestAnimationFrame(syncVisibility);
  button.addEventListener("click", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}

/**
 * Ajoute les faisceaux qui parcourent la grille du fond (styles dans css/motion.css).
 * Rien n'est créé si l'utilisateur demande de réduire les animations : la grille reste fixe.
 */
function initBeams() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // k : numéro de la ligne de grille suivie, d : durée de la traversée, delay : départ décalé.
  const beams = [
    ["h", 3, 10, 0], ["h", 10, 13, -6],
    ["v", 5, 11, -3], ["v", 16, 14, -9],
  ];
  const layer = document.createElement("div");
  layer.className = "site-beams";
  layer.setAttribute("aria-hidden", "true");
  beams.forEach(([axis, k, duration, delay]) => {
    const beam = document.createElement("span");
    beam.className = `beam-${axis}`;
    beam.style.setProperty("--k", k);
    beam.style.setProperty("--d", `${duration}s`);
    beam.style.setProperty("--delay", `${delay}s`);
    layer.append(beam);
  });
  document.body.prepend(layer);
}

/** Met en pause les animations en boucle du hero tant qu'il est hors de l'écran (css/motion.css). */
function initHeroPause() {
  const hero = document.querySelector(".hero-section");
  if (!hero || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(([entry]) => {
    hero.classList.toggle("is-paused", !entry.isIntersecting);
  }).observe(hero);
}

/**
 * Fait apparaître les blocs au défilement, une seule fois chacun.
 * Seuls les blocs encore sous l’écran sont masqués : rien ne clignote au chargement,
 * et sans JavaScript, IntersectionObserver ou avec réduction des animations, tout reste visible.
 */
function initReveal() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const targets = document.querySelectorAll(
    ".section-heading-row, .about-grid, .skills-layout, .service-card, .project-card, .contact-grid, " +
    ".project-overview-layout, .project-detail-card, .project-note"
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      // Retire les classes après l’apparition pour rendre la main aux effets de survol existants.
      element.addEventListener("transitionend", function cleanup(event) {
        if (event.target !== element || event.propertyName !== "transform") return;
        element.removeEventListener("transitionend", cleanup);
        element.classList.remove("reveal", "is-revealed");
        element.style.removeProperty("--reveal-delay");
      });
      element.classList.add("is-revealed");
      observer.unobserve(element);
    });
  }, { rootMargin: "0px 0px -8% 0px" });

  // Toutes les lectures de position d’abord, puis les écritures : un seul calcul de mise en page.
  const viewportHeight = window.innerHeight;
  const belowFold = Array.from(targets).filter((element) => element.getBoundingClientRect().top >= viewportHeight);
  belowFold.forEach((element) => {
    // Léger décalage entre cartes voisines d’une même grille.
    const siblings = Array.from(element.parentElement.children);
    element.style.setProperty("--reveal-delay", `${(siblings.indexOf(element) % 3) * 110}ms`);
    element.classList.add("reveal");
    observer.observe(element);
  });
}

/** L'année du pied de page est écrite à la génération ; on la tient à jour si le site n'a pas été regénéré depuis. */
function updateFooterYear() {
  const year = document.querySelector("#footer-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initBeams();
  initHeroPause();

  try {
    initBurgerMenu();
  } catch (error) {
    handleError("initBurgerMenu", error);
  }

  initThemeToggle();
  initBackToTop();
  updateFooterYear();
  requestAnimationFrame(initReveal);
});
