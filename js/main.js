/**
 * Fichier principal JavaScript.
 * Point d'entrée pour initialiser les comportements globaux du portfolio.
 */

/**
 * Remplace les caractères spéciaux pour insertion HTML sûre.
 * @param {string} value - Texte à échapper.
 * @returns {string} Texte échappé.
 */
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Génère le HTML du bouton démo s'il est disponible.
 * @param {object} project - Projet
 * @param {(k: string) => string} t - Traductions projects.*
 * @returns {string} HTML
 */
function buildDemoButtonHtml(project, t) {
  if (!project.demo) {
    return "";
  }
  return (
    `<a class="btn-demo" href="${escapeHtml(project.demo)}" target="_blank" rel="noopener">` +
    `${escapeHtml(t("demo"))}</a>`
  );
}

/**
 * Génère le HTML du bouton GitHub.
 * @param {object} project - Projet
 * @param {(k: string) => string} t - Traductions projects.*
 * @returns {string} HTML
 */
function buildGithubButtonHtml(project, t) {
  if (project.github === "#") {
    return (
      `<a class="btn-gh is-disabled" href="#" aria-disabled="true">` +
      `${escapeHtml(t("github"))}</a>`
    );
  }
  return (
    `<a class="btn-gh" href="${escapeHtml(project.github)}" target="_blank" rel="noopener">` +
    `${escapeHtml(t("github"))}</a>`
  );
}

/**
 * Génère le lien vers la fiche détaillée du projet.
 * @param {string} hrefDetail - URL de la page détail
 * @param {(k: string) => string} t - Traductions projects.*
 * @returns {string} HTML
 */
function buildDetailButtonHtml(hrefDetail, t) {
  return (
    `<a class="btn-detail" href="${escapeHtml(hrefDetail)}">` +
    `${escapeHtml(t("details"))}</a>`
  );
}

/**
 * Construit le HTML d'une carte projet.
 * @param {object} project - Projet
 * @param {string} lang - fr | en
 * @param {() => string} t - Clés projects.*
 * @returns {string} HTML
 */
function buildProjectCardHtml(project, lang, t) {
  const title = project.title[lang] || project.title.fr;
  const description = project.description[lang] || project.description.fr;
  const hrefDetail = `projets/${encodeURIComponent(project.slug)}.html`;
  const tags = project.tags
    .map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`)
    .join("");

  const demoBlock = buildDemoButtonHtml(project, t);
  const githubBlock = buildGithubButtonHtml(project, t);
  const detailBlock = buildDetailButtonHtml(hrefDetail, t);

  return `
    <article class="project-card" data-slug="${escapeHtml(project.slug)}">
      <div class="project-cover project-cover--${escapeHtml(project.cover)}" style="view-transition-name: cover-${escapeHtml(project.slug)}" aria-hidden="true">
        <span class="cover-label">${escapeHtml(project.kind[lang] || project.kind.fr)}</span>
        <span class="cover-title">${escapeHtml(title)}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(title)}</h3>
        <p class="project-description">${escapeHtml(description)}</p>
        <div class="project-tags">${tags}</div>
        <div class="project-actions">${detailBlock}${demoBlock}${githubBlock}</div>
      </div>
    </article>
  `;
}

/**
 * Lit une traduction projects.* clé simple (suffixe).
 * @param {string} keySuffix - e.g. notFound, demo
 * @returns {string} Texte
 */
function projectLabel(keySuffix) {
  if (typeof translations === "undefined" || !translations) {
    return keySuffix;
  }
  const lang = localStorage.getItem("lang") === "en" ? "en" : "fr";
  const k = `projects.${keySuffix}`;
  return translations[lang][k] || translations.fr[k] || "";
}

/**
 * Affiche toutes les cartes projet.
 */
function renderProjects() {
  try {
    const grid = document.querySelector("#projects-grid");
    if (!grid) {
      return;
    }
    const lang = localStorage.getItem("lang") === "en" ? "en" : "fr";
    const t = (s) => projectLabel(s);
    grid.innerHTML = projects.map((p) => buildProjectCardHtml(p, lang, t)).join("");
  } catch (error) {
    handleError("renderProjects", error);
  }
}

/**
 * Rempli la zone "projet introuvable".
 * @param {Element} mainEl - Contenu principal
 * @param {Element | null} notFound - Bloc d'erreur
 */
function showProjectNotFoundState(mainEl, notFound) {
  if (notFound) {
    notFound.classList.remove("is-hidden");
  }
  mainEl.classList.add("is-hidden");
  const n = safeQuerySelector("#not-found-text");
  if (n) {
    n.textContent = projectLabel("notFound");
  }
}

/**
 * Rempli les champs d'en-tête (breadcrumb + hero).
 * @param {string} title - Titre localisé
 */
function fillProjectHeader(title) {
  const nameEl = safeQuerySelector("#project-name");
  const bcEl = safeQuerySelector("#breadcrumb-name");
  if (nameEl) {
    nameEl.textContent = title;
  }
  if (bcEl) {
    bcEl.textContent = title;
  }

}

/**
 * Renseigne le résumé, l’illustration et les sections de la fiche projet.
 * @param {object} found - Projet
 * @param {string} title - Titre localisé
 * @param {string} lang - Langue active
 */
function fillProjectContent(found, title, lang) {
  const kind = safeQuerySelector("#project-kind");
  if (kind) {
    kind.textContent = found.kind[lang] || found.kind.fr;
  }

  const summary = safeQuerySelector("#project-summary");
  if (summary) {
    summary.textContent = found.description[lang] || found.description.fr;
  }

  const cover = safeQuerySelector("#project-detail-cover");
  if (cover) {
    cover.className = `project-cover project-detail-cover project-cover--${found.cover}`;
    cover.innerHTML = `<span class="cover-label">${escapeHtml(found.kind[lang] || found.kind.fr)}</span><span class="cover-title">${escapeHtml(title)}</span>`;
  }

  const longEl = safeQuerySelector("#project-long-desc");
  if (longEl) {
    longEl.textContent = found.overview[lang] || found.overview.fr;
  }

  const highlights = safeQuerySelector("#project-highlights");
  if (highlights) {
    const items = found.highlights[lang] || found.highlights.fr;
    highlights.replaceChildren(...items.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }));
  }

  const technical = safeQuerySelector("#project-technical");
  if (technical) {
    technical.textContent = found.technical[lang] || found.technical.fr;
  }

  const noteWrap = safeQuerySelector("#project-note-wrap");
  const note = safeQuerySelector("#project-note");
  const noteText = found.note?.[lang] || found.note?.fr || "";
  if (noteWrap && note) {
    note.textContent = noteText;
    noteWrap.classList.toggle("is-hidden", !noteText);
  }

  const tech = safeQuerySelector("#project-tech-grid");
  if (tech) {
    tech.innerHTML = found.tags
      .map((tag) => `<span class="project-tag" role="listitem">${escapeHtml(tag)}</span>`)
      .join("");
  }
}

/**
 * Configure les CTA démo / GitHub.
 * @param {object} found - Projet
 * @param {(k: string) => string} t - Traductions
 */
function fillProjectCtas(found, t) {
  const demo = safeQuerySelector("#project-demo");
  if (demo) {
    if (found.demo) {
      demo.classList.remove("is-hidden");
      demo.setAttribute("href", found.demo);
      demo.textContent = t("demo");
    } else {
      demo.classList.add("is-hidden");
    }
  }

  const gh = safeQuerySelector("#project-github");
  if (gh) {
    if (found.github === "#") {
      gh.setAttribute("href", "#");
      gh.classList.add("is-disabled");
      gh.setAttribute("aria-disabled", "true");
    } else {
      gh.classList.remove("is-disabled");
      gh.setAttribute("aria-disabled", "false");
      gh.setAttribute("href", found.github);
    }
    gh.textContent = t("github");
  }
}

/**
 * Rempli la fiche projet (projets/<slug>.html) dans la langue active.
 * Le slug vient de l’attribut data-project du body ; le HTML généré contient déjà la version FR.
 */
function initProjectDetail() {
  try {
    const mainEl = document.querySelector("#project-detail-content");
    const notFound = document.querySelector("#project-not-found");
    if (!mainEl) {
      return;
    }
    if (notFound) {
      notFound.classList.add("is-hidden");
    }
    mainEl.classList.remove("is-hidden");

    const slug = document.body.dataset.project;
    const found = projects.find((p) => p.slug === slug);
    const lang = localStorage.getItem("lang") === "en" ? "en" : "fr";
    const t = (s) => projectLabel(s);

    if (!found) {
      showProjectNotFoundState(mainEl, notFound);
      return;
    }

    const title = found.title[lang] || found.title.fr;
    const description = found.overview[lang] || found.overview.fr;
    fillProjectHeader(title);
    fillProjectContent(found, title, lang);
    fillProjectCtas(found, t);
    document.title = `${title} | Christopher AHO GLELE`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", description.slice(0, 155));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", `${title} | Christopher AHO GLELE`);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", description.slice(0, 200));
  } catch (error) {
    handleError("initProjectDetail", error);
  }
}

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
    const lang = localStorage.getItem("lang") === "en" ? "en" : "fr";
    const stateKey = isOpen ? "close" : "open";
    burgerButton.setAttribute("aria-label", burgerButton.getAttribute(`data-menu-${stateKey}-${lang}`) || (isOpen ? "Close menu" : "Open menu"));
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

/**
 * Applique la langue et rafraîchit le contenu dynamique de la fiche projet.
 * @param {string} lang - fr | en
 */
function applyLanguage(lang) {
  if (typeof setLanguage === "function") {
    setLanguage(lang);
  }
  try {
    initProjectDetail();
  } catch (error) {
    handleError("applyLanguage-initProjectDetail", error);
  }
  updateThemeToggleLabel();
}

/**
 * Attache les boutons du sélecteur de langue (FR/EN).
 * Remplace les attributs onclick inline pour un attachement homogène
 * et une compatibilité avec une éventuelle Content-Security-Policy.
 */
function initLanguageSwitch() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.getAttribute("data-lang"));
    });
  });
}

function updateThemeToggleLabel() {
  const button = document.querySelector("[data-theme-toggle]");
  const label = button?.querySelector("[data-theme-label]");
  if (!button || !label || typeof translations === "undefined") return;
  const isDark = document.documentElement.dataset.theme === "dark";
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = isDark ? "#111923" : "#f7f6f2";
  const lang = localStorage.getItem("lang") === "en" ? "en" : "fr";
  label.textContent = translations[lang][isDark ? "nav.themeLight" : "nav.themeDark"];
  button.setAttribute("aria-pressed", String(isDark));
  button.setAttribute("aria-label", label.textContent);
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
 * Découpe le titre du hero en mots pour les faire apparaître l’un après l’autre.
 * Les retours à la ligne de la traduction sont conservés (white-space: pre-line).
 * Un changement de langue remplace le texte : le titre s’affiche alors sans animation.
 */
function initHeroTitle() {
  const title = document.querySelector(".hero-title");
  if (!title) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    const fragment = document.createDocumentFragment();
    let index = 0;
    title.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        fragment.append(part);
        return;
      }
      const word = document.createElement("span");
      word.className = "hero-word";
      word.style.setProperty("--word-index", index++);
      word.textContent = part;
      fragment.append(word);
    });
    title.replaceChildren(fragment);
  }
  title.classList.add("is-split");
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

window.renderProjects = renderProjects;
window.applyLanguage = applyLanguage;

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("lang") === "en" ? "en" : "fr";
  applyLanguage(savedLanguage);
  initHeroTitle();

  try {
    initBurgerMenu();
  } catch (error) {
    handleError("initBurgerMenu", error);
  }

  initLanguageSwitch();
  initThemeToggle();
  initBackToTop();
  requestAnimationFrame(initReveal);
});
