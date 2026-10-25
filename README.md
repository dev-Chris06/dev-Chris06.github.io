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
├── project-detail.html        # Page de détail d’un projet (alimentée par projects.js)
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
│   └── privacy.css            # Page de confidentialité
│
├── js/
│   ├── utils.js               # safeQuerySelector + handleError
│   ├── projects.js            # Données des projets (tableau `projects`)
│   ├── lang.js                # i18n FR/EN + setLanguage
│   ├── main.js                # Menu, projets, fiches et langue
│   └── contact.js             # Validation et envoi du formulaire
│
└── assets/
    ├── favicon.svg            # Icône du site
    └── img/                   # Médias conservés, non utilisés comme captures projet
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

Les cartes utilisent des couvertures typographiques générées en CSS, et non des photos génériques présentées comme captures des applications. Remplace-les par de vraies captures lorsque tu en auras, en mettant à jour le rendu dans `js/main.js` et les données dans `js/projects.js`.

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

### Couleurs

- **Fichier** : `css/style.css` → variables `:root` (ex. `--bg-primary`, `--accent`, etc.)
- Le projet vise des couleurs **uniquement via variables** (évite d’éparpiller des hex dans chaque section)

### CV (PDF)

- **Dossier** : `assets/cv/`
- Le site n’affiche pas de lien CV tant que le fichier n’est pas présent.
- Après l’ajout du PDF, ajoute un lien de téléchargement vers son chemin réel.

### Liens réseaux sociaux (cohérence)

Mets **les mêmes URLs** ici :
- `index.html` → section **Contact** (lignes de liens) + `index.html` → **footer** (icônes)
- (Optionnel) `project-detail.html` si tu dupliques la nav/footer

---

## 6. Ajouter un projet

### Où ?

- **Fichier** : `js/projects.js`
- Ajoute un nouvel objet dans le tableau `projects`

### Exemple (copier-coller)

> Important : l’`id` doit être **unique**. Le `slug` sert dans l’URL `project-detail.html?id=...`

```js
{
  id: 4,
  slug: "mon-nouveau-projet",
  title: { fr: "Mon Nouveau Projet", en: "My New Project" },
  description: {
    fr: "Description courte en français.",
    en: "Short description in English."
  },
  longDescription: {
    fr: "Description longue pour la page détail.",
    en: "Long description for the detail page."
  },
  tags: ["HTML", "CSS"],
  image: "assets/img/projects/mon-projet.png",
  github: "https://github.com/dev-Chris06/mon-projet",
  demo: "https://dev-Chris06.github.io/mon-projet"  // null si pas de démo
}
```

### Image du projet (carte + détail)

- **Dossier** : `assets/img/projects/`
- **Recommandation** : **1200×750** (ratio ~ 16:10) — **export compressé** (souvent ~ 200–500 KB)
- **Nom** : court, sans espaces, en minuscules
- Pense que le CSS impose une hauteur d’affichage type carte (l’image est rognée proprement via `object-fit: cover` côté CSS)

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

## 10. Contact

**Mahudjro Shridara Christopher AHO GLELE**  
GitHub : [https://github.com/dev-Chris06](https://github.com/dev-Chris06)
