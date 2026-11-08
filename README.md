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
├── index.html                 # Page d’accueil (toutes les sections)
├── projets/                   # Une page HTML par projet, GÉNÉRÉE par scripts/generate-project-pages.js
├── project-detail.html        # Redirige les anciens liens ?id=slug vers projets/<slug>.html
├── confidentialite.html      # Notice lisible sur le formulaire de contact
├── README.md                  # La doc (ce fichier)
│
├── css/
│   ├── style.css              # Palette, styles de base et accessibilité
│   ├── nav.css                # Barre de navigation (sticky, burger, langue)
│   ├── hero.css               # Présentation initiale et appels à l’action
│   ├── about.css              # Section À propos
│   ├── projects.css           # Grille, couvertures graphiques et fiches projet
│   ├── skills.css             # Liste des technologies
│   ├── services.css           # Cartes de services
│   ├── contact.css            # Section contact + styles formulaire
│   ├── footer.css             # Pied de page
│   ├── motion.css             # Animations sobres (hero, apparition au défilement, transitions de page)
│   └── privacy.css            # Page de confidentialité
│
├── js/
│   ├── utils.js               # safeQuerySelector + handleError
│   ├── projects.js            # Données des projets (tableau `projects`)
│   ├── lang.js                # i18n FR/EN + setLanguage
│   ├── main.js                # Menu, projets, fiches et langue
│   └── contact.js             # Validation et envoi du formulaire
│
├── scripts/
│   ├── generate-project-pages.js  # Génère projets/*.html et sitemap.xml depuis js/projects.js
│   └── project-template.html      # Gabarit des pages projet (nav, footer, métadonnées)
│
└── assets/
    ├── favicon.svg            # Icône du site
    └── img/                   # og-image.png (image de partage social)
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

### Pourquoi pas de `npm` / build

Le site est **100% statique** : le navigateur charge directement `index.html` + `css/` + `js/`. Aucun transpile, aucun bundler, aucun package manager requis.

Seule exception : les pages projet sont générées par un script Node.js **sans dépendance** (`node scripts/generate-project-pages.js`). Les fichiers générés sont commités, donc GitHub Pages n’a rien à compiler.

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

Les cartes utilisent des couvertures typographiques générées en CSS, et non des photos génériques présentées comme captures des applications. Remplace-les par de vraies captures lorsque tu en auras, en mettant à jour le rendu dans `js/main.js`, le gabarit `scripts/project-template.html` et les données dans `js/projects.js`.

> `assets/img/og-image.png` sert d'image de partage social (Open Graph / Twitter) sur l'accueil et la page confidentialité. Chaque page projet utilise sa propre image, `assets/img/og/<slug>.png` : en ajoutant un projet, ajoute aussi son image (1200 × 630 px).

### Email & WhatsApp

- **Fichier** : `index.html` (section **Contact**)
- Les coordonnées affichées se trouvent dans la section Contact de `index.html` ; les libellés associés sont dans `js/lang.js`.
- N’ajoute un nouveau profil externe que lorsque son URL personnelle est disponible.
- Même principe pour les icônes du **footer** (les liens doivent matcher)

### Textes (FR / EN)

- **Fichier principal** : `js/lang.js` → objet `translations`
- Le HTML utilise `data-i18n="cle"` et parfois :
  - `data-i18n-placeholder="cle"` (placeholders)
  - `data-i18n-aria="cle"` (libellés accessibles)
- Règle : **chaque clé** doit exister en **FR et EN** (sinon fallback FR + avertissement console)
- Règle : le texte de repli du HTML doit être **identique** à la valeur `lang.js` correspondante (zéro divergence : c'est `lang.js` qui s'affiche au chargement)
- Règle : les flèches décoratives (`↘`, `←`, `→`) ne vont **jamais** dans les traductions. Elles restent dans le HTML, dans un `<span aria-hidden="true">`, pour ne pas polluer le nom accessible lu par les lecteurs d'écran

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
- `index.html` → section **Contact** (lignes de liens) + `index.html` → **footer** (icônes)
- `scripts/project-template.html` (nav/footer des pages projet), puis relance `node scripts/generate-project-pages.js`

### Formulaire et WhatsApp (comportements)

- **Honeypot** `_honey` : si le champ caché est rempli par un bot, le formulaire affiche un faux succès et **n’envoie rien** (anti-spam silencieux, côté `js/contact.js`).
- **WhatsApp** : les liens utilisent le format canonique `https://wa.me/<numéro>` **sans** signe `+`.
- **Langue** : les boutons FR/EN sont attachés en `addEventListener` (fonction `initLanguageSwitch` de `js/main.js`) — ne pas réintroduire de `onclick` inline.

---

## 6. Ajouter un projet

### Où ?

- **Fichier** : `js/projects.js`
- Ajoute un nouvel objet dans le tableau `projects`, puis **régénère les pages** :

```bash
node scripts/generate-project-pages.js
```

Le script crée `projets/<slug>.html` (contenu FR, titre, description, canonical et aperçu social propres au projet) et met à jour `sitemap.xml`. Le passage en anglais est fait par `js/main.js` dans le navigateur. Ne modifie pas les fichiers de `projets/` à la main : ils sont écrasés à chaque génération.

### Critère d’entrée

Un projet n’est ajouté que s’il a une V1 ou un MVP qui fonctionne : dépôt avec README clair, fonctions décrites vérifiables, au moins une capture réelle ou une démo. Voir `plan.md` (R1).

### Exemple (copier-coller)

> Le `slug` doit être **unique** : il donne l’URL `projets/<slug>.html`. `order` fixe la position dans la grille (croissant).

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

### Ajouter une nouvelle clé

1. Ouvre `js/lang.js`
2. Ajoute la même clé dans `translations.fr` **et** `translations.en`
3. Utilise `data-i18n="ma.cle"` sur l’élément HTML concerné
4. Recharge : `setLanguage` applique le texte sur tous les `data-i18n`

### Cas fréquents

- **Placeholder d’input** : `data-i18n-placeholder="ma.cle"`
- **ARIA** : `data-i18n-aria="ma.cle"`
- **Copyright avec année** : clé `footer.copyright` avec le token `{year}` (géré par `setLanguage`)

### Pourquoi éviter d’éditer le HTML “en dur”

Le site est conçu pour que **tout le contenu bilingue** pivote autour de `lang.js` + `setLanguage` :
- moins d’oublis (FR/EN)
- moins de divergences (navbar vs footer)
- le HTML reste un **gabarit stable**

> Exception normale : URLs réelles (mailto, wa.me) → ce sont des données, pas de la “traduction”.

---

## 8. Limitations connues

- **Pas de backend applicatif** : le formulaire transmet ses champs à FormSubmit, qui les envoie par email. Au premier envoi, confirmer l’adresse de réception dans le message d’activation reçu.
- **Pas de CMS** : contenu géré en fichiers (`lang.js`, `projects.js`, HTML)
- **Pas de build** : pas de minification / pipeline (volontairement simple)

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
