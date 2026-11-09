/**
 * Génère toutes les pages HTML du site, en français et en anglais, à partir de :
 *   - src/templates/*.html : structure des pages ({{t:clé}} texte traduit, {{nom}} valeur échappée,
 *     {{html:nom}} bloc HTML produit par ce script) ;
 *   - src/i18n.js : textes des deux langues ;
 *   - src/projects.js : données des projets ;
 *   - src/css/*.css : feuilles de style, réunies dans css/site.css.
 *
 * Une URL par langue (recommandation de Google pour les sites multilingues) :
 *   FR : /, /confidentialite.html, /projets/<slug>.html
 *   EN : /en/, /en/privacy.html, /en/projects/<slug>.html
 * Chaque page déclare sa version dans l'autre langue (hreflang).
 *
 * Usage : node scripts/build.js  (aucune dépendance, Node.js suffit).
 * Relancer après chaque modification de src/ ; ne jamais modifier les pages générées à la main.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://dev-Chris06.github.io";
const translations = require("../src/i18n.js");
const projects = require("../src/projects.js");

const LANGS = {
  fr: { prefix: "", locale: "fr_FR", name: "Français", privacy: "confidentialite.html", projectsDir: "projets" },
  en: { prefix: "en/", locale: "en_US", name: "English", privacy: "privacy.html", projectsDir: "projects" },
};
const DEFAULT_LANG = "fr";
const GENERATED_DIRS = ["projets", "en"];

// Feuilles de src/css/ réunies dans css/site.css, dans cet ordre (l'ordre compte pour la cascade).
// Un seul fichier : mesuré 438 ms plus rapide au premier affichage que 10 fichiers séparés
// (Lighthouse mobile, réseau réellement ralenti, médiane de 5).
const CSS_FILES = [
  "style.css", "nav.css", "hero.css", "about.css", "projects.css", "skills.css",
  "services.css", "contact.css", "footer.css", "privacy.css", "motion.css",
];

const usedKeys = new Set();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** JSON sûr à placer dans une balise <script> (empêche toute fermeture prématurée). */
function scriptJson(value) {
  return JSON.stringify(value, null, 2).replace(/</g, "\\u003c");
}

function t(lang, key) {
  const value = translations[lang][key];
  if (typeof value !== "string") {
    throw new Error(`Traduction manquante : "${key}" en ${lang} (src/i18n.js)`);
  }
  usedKeys.add(key);
  return value;
}

function localized(project, field, lang, { optional = false } = {}) {
  const value = project[field]?.[lang];
  if (value === undefined || value === null || value === "") {
    if (optional) return "";
    throw new Error(`Champ "${field}" manquant en ${lang} pour le projet "${project.slug}" (src/projects.js)`);
  }
  return value;
}

/** Lien relatif d'une page générée vers un autre fichier du site. */
function relativeLink(fromPath, toPath) {
  const link = path.posix.relative(path.posix.dirname(fromPath), toPath);
  return link.startsWith("../") ? link : `./${link}`;
}

function rootPrefix(outputPath) {
  const depth = outputPath.split("/").length - 1;
  return depth === 0 ? "./" : "../".repeat(depth);
}

/** URL publique : les index.html sont servis comme dossiers (/, /en/). */
function publicUrl(outputPath) {
  return `${SITE_URL}/${outputPath.replace(/(^|\/)index\.html$/, "$1")}`;
}

function render(template, lang, vars, templateName) {
  return template.replace(/\{\{(t:|html:)?([\w.-]+)\}\}/g, (match, kind, name) => {
    if (kind === "t:") return escapeHtml(t(lang, name));
    if (!(name in vars)) {
      throw new Error(`Variable inconnue ${match} dans src/templates/${templateName}`);
    }
    return kind === "html:" ? vars[name] : escapeHtml(vars[name]);
  });
}

function buildAlternateLinks(page) {
  const lines = [
    `<link rel="canonical" href="${escapeHtml(publicUrl(page.path))}" />`,
    ...Object.keys(LANGS).map(
      (code) => `<link rel="alternate" hreflang="${code}" href="${escapeHtml(publicUrl(page.alternates[code]))}" />`
    ),
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(publicUrl(page.alternates[DEFAULT_LANG]))}" />`,
    `<meta property="og:locale" content="${LANGS[page.lang].locale}" />`,
    ...Object.keys(LANGS)
      .filter((code) => code !== page.lang)
      .map((code) => `<meta property="og:locale:alternate" content="${LANGS[code].locale}" />`),
  ];
  return lines.map((line) => `    ${line}`).join("\n");
}

function buildLangSwitch(page) {
  const links = Object.entries(LANGS).map(([code, { name }]) => {
    const current = code === page.lang ? ' aria-current="page"' : "";
    const href = escapeHtml(relativeLink(page.path, page.alternates[code]));
    return (
      `              <a href="${href}" hreflang="${code}" lang="${code}"${current}>` +
      `${code.toUpperCase()}<span class="visually-hidden"> – ${name}</span></a>`
    );
  });
  return [
    `            <div class="lang-switch" role="group" aria-label="${escapeHtml(t(page.lang, "nav.language"))}">`,
    ...links,
    "            </div>",
  ].join("\n");
}

function buildThemeToggle(lang) {
  const dark = escapeHtml(t(lang, "nav.themeDark"));
  const light = escapeHtml(t(lang, "nav.themeLight"));
  return [
    `            <button class="theme-toggle" type="button" data-theme-toggle data-label-dark="${dark}" data-label-light="${light}">`,
    '              <span class="theme-toggle-icon" aria-hidden="true">☾</span>',
    `              <span class="visually-hidden" data-theme-label>${dark}</span>`,
    "            </button>",
  ].join("\n");
}

function buildCopyright(lang) {
  const [before, after = ""] = t(lang, "footer.copyright").split("{year}");
  const year = new Date().getFullYear();
  return `${escapeHtml(before)}<span id="footer-year">${year}</span>${escapeHtml(after)}`;
}

function projectPath(project, lang) {
  return `${LANGS[lang].prefix}${LANGS[lang].projectsDir}/${project.slug}.html`;
}

function githubLink(project, lang, attributes = "") {
  const label = escapeHtml(t(lang, "projects.github"));
  if (project.github === "#") {
    return `<a class="btn-gh is-disabled" href="#" aria-disabled="true">${label}</a>`;
  }
  return `<a class="btn-gh" href="${escapeHtml(project.github)}"${attributes}>${label}</a>`;
}

function demoLink(project, lang, attributes = "") {
  if (!project.demo) return "";
  return `<a class="btn-demo" href="${escapeHtml(project.demo)}"${attributes}>${escapeHtml(t(lang, "projects.demo"))}</a>`;
}

function buildProjectCards(page) {
  const { lang } = page;
  const external = ' target="_blank" rel="noopener"';
  return projects
    .map((project) => {
      const title = escapeHtml(localized(project, "title", lang));
      const kind = escapeHtml(localized(project, "kind", lang));
      const detailHref = escapeHtml(relativeLink(page.path, projectPath(project, lang)));
      const tags = project.tags.map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join("");
      const slug = escapeHtml(project.slug);
      return `            <article class="project-card">
              <div class="project-cover project-cover--${escapeHtml(project.cover)}" style="view-transition-name: cover-${slug}" aria-hidden="true">
                <span class="cover-label">${kind}</span>
                <span class="cover-title">${title}</span>
              </div>
              <div class="project-body">
                <h3 class="project-title">${title}</h3>
                <p class="project-description">${escapeHtml(localized(project, "description", lang))}</p>
                <div class="project-tags">${tags}</div>
                <div class="project-actions"><a class="btn-detail" href="${detailHref}">${escapeHtml(t(lang, "projects.details"))}</a>${demoLink(project, lang, external)}${githubLink(project, lang, external)}</div>
              </div>
            </article>`;
    })
    .join("\n");
}

function commonVars(page, templateName) {
  const { lang } = page;
  return {
    lang,
    siteUrl: SITE_URL,
    url: publicUrl(page.path),
    root: rootPrefix(page.path),
    home: relativeLink(page.path, `${LANGS[lang].prefix}index.html`),
    privacyHref: relativeLink(page.path, `${LANGS[lang].prefix}${LANGS[lang].privacy}`),
    generatedNotice: `<!-- Page générée par scripts/build.js depuis src/templates/${templateName} — ne pas modifier à la main -->`,
    alternateLinks: buildAlternateLinks(page),
    langSwitch: buildLangSwitch(page),
    themeToggle: buildThemeToggle(lang),
    copyright: buildCopyright(lang),
  };
}

function homeVars(page) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mahudjro Shridara Christopher AHO GLELE",
    url: publicUrl(page.path),
    jobTitle: t(page.lang, "meta.jobTitle"),
    sameAs: ["https://github.com/dev-Chris06", "https://linkedin.com/in/christopher-aho-glele"],
  };
  return {
    projectCards: buildProjectCards(page),
    jsonLd: `<script type="application/ld+json">\n${scriptJson(jsonLd)}\n    </script>`,
  };
}

function projectVars(page, project) {
  const { lang } = page;
  const title = localized(project, "title", lang);
  const note = localized(project, "note", lang, { optional: true });
  return {
    slug: project.slug,
    pageTitle: `${title} | Christopher AHO GLELE`,
    ogImage: `${SITE_URL}/assets/img/og/${project.slug}.png`,
    title,
    kind: localized(project, "kind", lang),
    description: localized(project, "description", lang),
    overview: localized(project, "overview", lang),
    technical: localized(project, "technical", lang),
    note,
    noteClass: note ? "project-note" : "project-note is-hidden",
    cover: project.cover,
    tags: project.tags.map((tag) => `<span class="project-tag" role="listitem">${escapeHtml(tag)}</span>`).join(""),
    highlights: localized(project, "highlights", lang).map((item) => `<li>${escapeHtml(item)}</li>`).join(""),
    demoLink: demoLink(project, lang),
    githubLink: githubLink(project, lang),
  };
}

/** Une entrée par page et par langue ; `alternates` relie les versions d'une même page. */
function listPages() {
  const pages = [];
  const addPage = (templateName, pathsByLang, extraVars = () => ({})) => {
    for (const lang of Object.keys(LANGS)) {
      pages.push({ templateName, lang, path: pathsByLang[lang], alternates: pathsByLang, extraVars });
    }
  };
  addPage("index.html", { fr: "index.html", en: "en/index.html" }, homeVars);
  addPage("privacy.html", { fr: LANGS.fr.privacy, en: `en/${LANGS.en.privacy}` });
  for (const project of projects) {
    addPage(
      "project.html",
      { fr: projectPath(project, "fr"), en: projectPath(project, "en") },
      (page) => projectVars(page, project)
    );
  }
  return pages;
}

function buildSitemap(pages) {
  const entries = pages
    .map((page) => `  <url>\n    <loc>${escapeHtml(publicUrl(page.path))}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function buildStylesheet() {
  const sourceDir = path.join(ROOT, "src/css");
  const unlisted = fs.readdirSync(sourceDir).filter((file) => file.endsWith(".css") && !CSS_FILES.includes(file));
  if (unlisted.length) {
    throw new Error(`Feuilles absentes de CSS_FILES dans scripts/build.js : ${unlisted.join(", ")}`);
  }
  const parts = CSS_FILES.map((file) => `/* --- src/css/${file} --- */\n${fs.readFileSync(path.join(sourceDir, file), "utf8").trim()}\n`);
  return `/* Fichier généré par scripts/build.js depuis src/css/ — ne pas modifier à la main */\n\n${parts.join("\n")}`;
}

function write(outputPath, content) {
  const target = path.join(ROOT, outputPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  console.log(outputPath);
}

function main() {
  const templates = {};
  const readTemplate = (name) => {
    templates[name] ??= fs.readFileSync(path.join(ROOT, "src/templates", name), "utf8");
    return templates[name];
  };

  const pages = listPages();
  // Rendu complet avant toute écriture : une erreur ne laisse jamais le site à moitié généré.
  const outputs = pages.map((page) => {
    const vars = { ...commonVars(page, page.templateName), ...page.extraVars(page) };
    return [page.path, render(readTemplate(page.templateName), page.lang, vars, page.templateName)];
  });
  const redirectVars = {
    generatedNotice: "<!-- Page générée par scripts/build.js depuis src/templates/project-detail.html — ne pas modifier à la main -->",
    slugsJson: JSON.stringify(projects.map((project) => project.slug)),
  };
  outputs.push(["project-detail.html", render(readTemplate("project-detail.html"), "fr", redirectVars, "project-detail.html")]);
  outputs.push(["sitemap.xml", buildSitemap(pages)]);
  outputs.push(["css/site.css", buildStylesheet()]);

  // Les dossiers générés sont recréés pour supprimer les pages de projets retirés.
  for (const dir of GENERATED_DIRS) {
    fs.rmSync(path.join(ROOT, dir), { recursive: true, force: true });
  }
  for (const [outputPath, content] of outputs) {
    write(outputPath, content);
  }

  const unused = Object.keys(translations[DEFAULT_LANG]).filter((key) => !usedKeys.has(key));
  if (unused.length) {
    console.warn(`\nClés de src/i18n.js utilisées nulle part : ${unused.join(", ")}`);
  }
}

main();
