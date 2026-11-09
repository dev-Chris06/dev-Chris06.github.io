# Portfolio — Christopher AHO GLELE

> Documentation rapide d’utilisation (client / toi, dans 6 mois) — **sans relire le code**.

---

## 1. Présentation 📌

- **Ce projet** : site vitrine / portfolio **statique** pour présenter l’identité, les compétences, les services, les projets et le contact.
- **Stack** : **HTML5**, **CSS3** (fichiers par section), **JavaScript** **vanilla** (pas de framework, pas de bundler).
- **Déploiement** (GitHub Pages) : [https://dev-Chris06.github.io](https://dev-Chris06.github.io)

---

## 2. Structure du projet

> Une ligne = un fichier (ou dossier) **important** et son rôle.

```text
portfolio/
├── src/                       # SOURCES : c’est ici qu’on modifie le contenu
│   ├── templates/             # Structure des pages (index, privacy, project, project-detail)
│   ├── i18n.js                # Tous les textes, en français et en anglais
│   └── projects.js            # Données des projets (FR/EN)
├── scripts/
│   └── build.js               # Génère toutes les pages HTML des deux langues + sitemap.xml
│
├── index.html                 # GÉNÉRÉ — accueil en français (/)
├── confidentialite.html       # GÉNÉRÉ — notice du formulaire en français
├── projets/                   # GÉNÉRÉ — une fiche par projet en français
├── en/                        # GÉNÉRÉ — version anglaise : index.html, privacy.html, projects/
├── project-detail.html        # GÉNÉRÉ — redirige les anciens liens ?id=slug vers projets/<slug>.html
├── sitemap.xml                # GÉNÉRÉ — toutes les URL des deux langues
│
├── css/                       # Un fichier par section (style, nav, hero, projects, skills, motion…)
├── js/
│   ├── utils.js               # safeQuerySelector + handleError
│   ├── main.js                # Menu mobile, thème, retour en haut, animations
│   └── contact.js             # Validation et envoi du formulaire
│
└── assets/
    ├── favicon.svg            # Icône du site
    ├── icons/                 # Logos des technologies (SVG servis par le site)
    └── img/                   # Images de partage social (og-image.png, og/<slug>.png)
```

Le CV n’est pas encore fourni. Ajouter le fichier avant de réintroduire un lien de téléchargement.

Le thème clair/sombre se règle depuis la navigation et le choix est mémorisé dans le navigateur.

---

## 3. Installation & lancement local

### Cloner

```bash
git clone https://github.com/<votre-compte>/<votre-depot>.git
cd <votre-depot>
```

> Remplace l’URL par celle de ton dépôt GitHub (copie depuis le bouton **Code** sur GitHub).

### Lancer (recommandé)

- **VS Code** : extension **Live Server** → “Go Live” sur `index.html`
- **Alternative** : n’importe quel serveur statique (évite `file://` pour certains comportements de navigation / modules)

### Générer les pages

Les pages HTML sont **générées** à partir de `src/` par un script Node.js **sans dépendance** :

```bash
node scripts/build.js
```

À relancer après **chaque** modification de `src/` (textes, projets, structure des pages). Les fichiers générés sont commités, donc GitHub Pages n’a rien à compiler. Ne modifie jamais une page générée à la main : elle serait écrasée à la génération suivante (chaque page le rappelle dans un commentaire en tête).

Le script s’arrête avec un message clair si une traduction ou un champ de projet manque dans une langue, ou si un modèle utilise une variable inconnue. Il signale aussi les clés de traduction inutilisées.

### Pourquoi une page par langue

Google recommande une URL distincte par langue plutôt qu’un changement de langue en JavaScript sur la même page : la version anglaise (`/en/`) est ainsi indexée, et chaque page s’affiche directement dans sa langue, sans attendre de script. Chaque page déclare sa version dans l’autre langue (`hreflang`, `x-default` vers le français). Le sélecteur FR/EN est un simple lien vers la page équivalente ; il n’y a pas de redirection automatique selon la langue du navigateur (déconseillée par Google).

---

## 4. Déploiement GitHub Pages

Objectif : publier le contenu de la branche (souvent `main`) sur GitHub Pages.

1. Pousse le code sur GitHub (branche `main` / `master` selon ton repo) :

```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

2. Sur GitHub : **Settings** → **Pages**
3. **Build and deployment** :
   - **Source** : *Deploy from a branch*
   - **Branch** : `main` (ou `master`) + dossier `/ (root)`
4. Sauvegarde, attends la build (1–2 minutes)
5. Ouvre l’URL affichée

**URL attendue (username GitHub + repo Pages classique)** : [https://dev-Chris06.github.io](https://dev-Chris06.github.io)

> Si l’URL diffère, c’est normal (nom de repo / organisation). L’essentiel est l’URL affichée dans *Settings → Pages*.

---

## 5. Personnalisation — ce que tu dois modifier

### Visuels des projets

Les cartes utilisent des couvertures typographiques générées en CSS, et non des photos génériques présentées comme captures des applications. Remplace-les par de vraies captures lorsque tu en auras, en mettant à jour le rendu des cartes dans `scripts/build.js`, le modèle `src/templates/project.html` et les données dans `src/projects.js`.

> `assets/img/og-image.png` sert d'image de partage social (Open Graph / Twitter) sur l'accueil et la page confidentialité. Chaque page projet utilise sa propre image, `assets/img/og/<slug>.png` : en ajoutant un projet, ajoute aussi son image (1200 × 630 px).

### Email & WhatsApp

- **Fichier** : `src/templates/index.html` (section **Contact**)
- Les libellés associés sont dans `src/i18n.js`.
- N’ajoute un nouveau profil externe que lorsque son URL personnelle est disponible.
- Même principe pour les icônes du **footer** (les liens doivent matcher)

### Textes (FR / EN)

- **Fichier** : `src/i18n.js` (objets `fr` et `en`)
- Dans les modèles (`src/templates/`), un texte traduit s’écrit `{{t:cle}}`, aussi bien dans le contenu que dans un attribut (`aria-label="{{t:cle}}"`, `placeholder="{{t:cle}}"`).
- Règle : **chaque clé** doit exister en **FR et EN** (sinon la génération s’arrête).
- Règle : les flèches décoratives (`↘`, `←`, `→`) ne vont **jamais** dans les traductions. Elles restent dans le HTML, dans un `<span aria-hidden="true">`, pour ne pas polluer le nom accessible lu par les lecteurs d'écran.

### Couleurs

- **Fichier** : `css/style.css` → variables `:root` (ex. `--bg-primary`, `--accent`, etc.)
- Le projet vise des couleurs **uniquement via variables** (évite d’éparpiller des hex dans chaque section)
- Les champs du formulaire ont leurs variables dédiées `--field-bg` et `--field-border` (contraste de bordure ≥ 3:1 garanti dans les deux thèmes)

### CV (PDF)

- **Dossier** : `assets/cv/`
- Le site n’affiche pas de lien CV tant que le fichier n’est pas présent.
- Après l’ajout du PDF, ajoute un lien de téléchargement vers son chemin réel.

### Liens réseaux sociaux (cohérence)

Mets **les mêmes URLs** ici :
- `src/templates/index.html` → section **Contact** (lignes de liens) + **footer** (icônes)
- `src/templates/privacy.html` et `src/templates/project.html` (footer), puis relance `node scripts/build.js`

### Formulaire et WhatsApp (comportements)

- **Honeypot** `_honey` : si le champ caché est rempli par un bot, le formulaire affiche un faux succès et **n’envoie rien** (anti-spam silencieux, côté `js/contact.js`).
- **WhatsApp** : les liens utilisent le format canonique `https://wa.me/<numéro>` **sans** signe `+`.
- **Messages du formulaire** : ils sont écrits dans la page par la génération (attributs `data-msg-*` du formulaire), dans la langue de la page ; `js/contact.js` les lit sans dépendre d’un fichier de traduction.

---

## 6. Ajouter un projet

### Où ?

- **Fichier** : `src/projects.js`
- Ajoute un nouvel objet dans le tableau `projects`, puis **régénère les pages** :

```bash
node scripts/build.js
```

Le script crée `projets/<slug>.html` et `en/projects/<slug>.html` (titre, description, canonical, `hreflang` et aperçu social propres au projet), ajoute la carte dans la grille des deux accueils et met à jour `sitemap.xml`.

### Critère d’entrée

Un projet n’est ajouté que s’il a une V1 ou un MVP qui fonctionne : dépôt avec README clair, fonctions décrites vérifiables, au moins une capture réelle ou une démo. Voir `plan.md` (R1).

### Exemple (copier-coller)

> Le `slug` doit être **unique** : il donne les URL `projets/<slug>.html` et `en/projects/<slug>.html`. `order` fixe la position dans la grille (croissant).

```js
{
  id: 5,
  slug: "mon-nouveau-projet",
  order: 5,
  title: { fr: "Mon Nouveau Projet", en: "My New Project" },
  kind: { fr: "Application web", en: "Web application" },
  description: { fr: "Résumé court (carte et métadonnées).", en: "Short summary (card and metadata)." },
  overview: { fr: "Présentation de la fiche.", en: "Detail page overview." },
  highlights: { fr: ["Fonction 1", "Fonction 2"], en: ["Feature 1", "Feature 2"] },
  technical: { fr: "Choix techniques.", en: "Technical choices." },
  note: { fr: "Limites ou contexte (optionnel).", en: "Limits or context (optional)." },
  tags: ["HTML", "CSS"],
  cover: "vault",           // style de couverture : vault | clinic | restaurant | company (css/projects.css)
  github: "https://github.com/dev-Chris06/mon-projet",
  demo: null                // URL de la démo, ou null pour masquer le bouton
}
```

### Règles pratiques (GitHub / démo)

- `github: "#"` désactive le bouton GitHub côté UI
- `demo: null` masque le bouton démo

---

## 7. Ajouter / modifier une traduction

1. Ouvre `src/i18n.js`
2. Ajoute la même clé dans `fr` **et** `en`
3. Utilise `{{t:ma.cle}}` à l’endroit voulu dans le modèle (`src/templates/…`)
4. Lance `node scripts/build.js`, puis vérifie la page française **et** la page anglaise

Cas particulier : `footer.copyright` contient le marqueur `{year}`, remplacé par l’année à la génération (et tenu à jour dans le navigateur par `js/main.js`).

> Les URL réelles (mailto, wa.me, GitHub) sont des données, pas des traductions : elles restent écrites directement dans les modèles.

---

## 8. Limitations connues

- **Pas de backend applicatif** : le formulaire transmet ses champs à FormSubmit, qui les envoie par email. Au premier envoi, confirmer l’adresse de réception dans le message d’activation reçu.
- **Pas de CMS** : contenu géré en fichiers (`src/i18n.js`, `src/projects.js`, `src/templates/`)
- **Génération manuelle** : `node scripts/build.js` doit être lancé avant de committer ; pas de minification (volontairement simple)

---

## 9. Améliorations possibles

- **Formulaire** : confirmer le premier envoi FormSubmit et vérifier la réception d’un message réel.
- **CMS headless** : *Contentful* / *Sanity* (si beaucoup de contenu à éditer)
- **SEO** : *JSON-LD* (Person/Website), `sitemap.xml`, `robots.txt`, métas par page
- **CI/CD** : GitHub Actions (tests HTML, déploiement, checks de liens)
- **Performance** : lazyload images modernes, compression assets, preloads ciblés

---

## 10. Journal des corrections (octobre 2026)

- **Contenu FR/EN** : harmonisation complète HTML ↔ `lang.js` — les titres réels (« Un développeur proche des besoins métier. », « Du code qui répond à un besoin. », « Du web utile, pensé pour votre activité. ») s’affichent désormais, au lieu d’être écrasés par « À propos » / « Services » au chargement.
- **Accessibilité** : skip-link de la page détail remonté en tête de page (premier élément focusable) ; clés `nav.backHome` et `detail.backAria` pour des libellés ARIA corrects en EN ; bordures de champs de formulaire à contraste ≥ 3:1 via `--field-bg` / `--field-border`.
- **Contact** : honeypot silencieux (faux succès, aucun envoi) ; liens WhatsApp au format canonique `wa.me/<numéro>` sans `+` (4 occurrences).
- **SEO / partage** : `assets/img/og-image.png` (1200×630) + `twitter:card` sur l’accueil et la page confidentialité ; canonical ajouté sur la page confidentialité. Les métadonnées *par projet* restent à traiter avec les futures captures (pages fiches volontairement non modifiées).
- **Hygiène** : suppression du code mort (`data-stop-nav`, `data-i18n-role`, `.fade-in`, `.about-facts`, `projects.noResult`, `detail.imageCaption`, clés `about.fact.*`) ; bloc year du footer géré uniquement par `lang.js` ; `projects.js` retiré de la page confidentialité ; `onclick` inline remplacés par `initLanguageSwitch()`.

## 11. Licence

Le code est publié sous licence MIT (voir [LICENSE](LICENSE)).

Les textes du site, ma présentation personnelle, mon nom et le logo « CG » ne
sont pas couverts par cette licence : ils ne peuvent pas être réutilisés.

## 12. Contact

**Mahudjro Shridara Christopher AHO GLELE**  
GitHub : [https://github.com/dev-Chris06](https://github.com/dev-Chris06)
