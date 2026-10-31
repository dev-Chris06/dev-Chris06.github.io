/**
 * Génère une page HTML statique par projet (projets/<slug>.html) et sitemap.xml
 * à partir de js/projects.js et de scripts/project-template.html.
 *
 * Usage : node scripts/generate-project-pages.js
 * Aucune dépendance : Node.js suffit. Relancer après chaque modification de js/projects.js.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://dev-Chris06.github.io";
const OUTPUT_DIR = path.join(ROOT, "projets");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function loadProjects() {
  const source = fs.readFileSync(path.join(ROOT, "js/projects.js"), "utf8");
  // projects.js est un script navigateur qui déclare `const projects` : on l’exécute dans un contexte isolé.
  return vm.runInNewContext(`${source}\nprojects;`, {}, { filename: "js/projects.js" });
}

function buildPage(template, project) {
  const fr = (field) => project[field]?.fr ?? "";
  const url = `${SITE_URL}/projets/${project.slug}.html`;
  const values = {
    slug: project.slug,
    url,
    pageTitle: `${fr("title")} | Christopher AHO GLELE`,
    ogImage: `${SITE_URL}/assets/img/og/${project.slug}.png`,
    title: fr("title"),
    kind: fr("kind"),
    description: fr("description"),
    overview: fr("overview"),
    technical: fr("technical"),
    note: fr("note"),
    noteClass: fr("note") ? "project-note" : "project-note is-hidden",
    cover: project.cover,
    github: project.github,
    demoHref: project.demo || "#",
    demoClass: project.demo ? "btn-demo" : "btn-demo is-hidden",
  };

  const html = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (key === "tags") {
      return project.tags
        .map((tag) => `<span class="project-tag" role="listitem">${escapeHtml(tag)}</span>`)
        .join("");
    }
    if (key === "highlights") {
      return (project.highlights?.fr || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }
    if (!(key in values)) {
      throw new Error(`Variable de template inconnue : ${match}`);
    }
    return escapeHtml(values[key]);
  });

  return { html, url };
}

function buildSitemap(urls) {
  const entries = urls.map((url) => `  <url>\n    <loc>${escapeHtml(url)}</loc>\n  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function main() {
  const template = fs.readFileSync(path.join(__dirname, "project-template.html"), "utf8");
  const projects = loadProjects();

  // Supprime les pages de projets retirés de projects.js.
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR);

  const projectUrls = projects.map((project) => {
    const { html, url } = buildPage(template, project);
    fs.writeFileSync(path.join(OUTPUT_DIR, `${project.slug}.html`), html);
    console.log(`projets/${project.slug}.html`);
    return url;
  });

  const sitemap = buildSitemap([`${SITE_URL}/`, ...projectUrls, `${SITE_URL}/confidentialite.html`]);
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);
  console.log("sitemap.xml");
}

main();
