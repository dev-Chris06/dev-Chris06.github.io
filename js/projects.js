/**
 * Données des projets du portfolio.
 * Utilisé par la grille des projets et la page de détail.
 */

const projects = [
  {
    id: 1,
    slug: "site-restaurant",
    order: 5,
    title: { fr: "Le Réconfort — site de restaurant", en: "Le Réconfort — Restaurant Website" },
    kind: { fr: "Site vitrine", en: "Showcase website" },
    description: {
      fr: "Site vitrine présentant un restaurant de cuisine béninoise, sa carte, ses horaires et ses réservations.",
      en: "Restaurant website presenting Beninese cuisine, the menu, opening hours, and reservations."
    },
    overview: {
      fr: "Le Réconfort est un projet personnel de démonstration autour d’un restaurant de cuisine béninoise à Paris. La page rassemble les informations qu’un visiteur cherche avant sa venue : découvrir la carte, voir le lieu, connaître les horaires et préparer une réservation.",
      en: "Le Réconfort is a personal demo project for a Beninese restaurant in Paris. The page brings together the information a visitor needs before coming in: browse the menu, see the venue, check opening hours, and prepare a reservation."
    },
    highlights: {
      fr: ["Carte affichée depuis un fichier de données séparé.", "Galerie, horaires, accès et informations de contact réunis sur une page.", "Formulaire de réservation qui prépare un email avec les informations saisies."],
      en: ["Menu rendered from a separate data file.", "Gallery, opening hours, directions, and contact details on one page.", "Reservation form that prepares an email with the visitor’s details."]
    },
    technical: {
      fr: "Le site est réalisé en HTML, CSS et JavaScript natif, sans framework ni étape de build. Les données de la carte sont maintenues à part puis injectées dans la page par JavaScript, ce qui permet de modifier le menu sans réécrire sa structure.",
      en: "The site uses HTML, CSS, and vanilla JavaScript, with no framework or build step. Menu data is kept separately and rendered into the page with JavaScript, so the menu can be updated without rewriting its structure."
    },
    note: {
      fr: "Projet personnel de démonstration : le restaurant et ses coordonnées sont des exemples créés pour ce site. Le formulaire ouvre le logiciel de messagerie du visiteur ; aucune réservation n’est enregistrée automatiquement sur un serveur.",
      en: "Personal demo project: the restaurant and its details are examples created for this site. The form opens the visitor’s email app; it does not save reservations to a server."
    },
    tags: ["HTML", "CSS", "JavaScript"],
    cover: "restaurant",
    github: "https://github.com/dev-Chris06/le-reconfort",
    demo: null
  },
  {
    id: 2,
    slug: "site-vitrine",
    order: 6,
    title: { fr: "Bénin Tech Labs — site vitrine", en: "Bénin Tech Labs — Showcase Website" },
    kind: { fr: "Site multipage", en: "Multipage website" },
    description: {
      fr: "Site multipage pour présenter des services de conseil IT et de développement logiciel.",
      en: "Multipage website presenting IT consulting and software development services."
    },
    overview: {
      fr: "BÉNIN TECH LABS est un projet personnel de site vitrine pour une entreprise de conseil IT et de développement logiciel. Il présente plusieurs parcours pour découvrir les services, les projets et les contenus.",
      en: "BÉNIN TECH LABS is a personal showcase website project for an IT consulting and software development company. It provides separate paths to explore services, projects, and content."
    },
    highlights: {
      fr: ["Sept pages : Accueil, À propos, Services, Projets, Carrières, Blog et Contact.", "Navigation adaptée au mobile et lien d’accès direct au contenu.", "Bascule de thème clair/sombre mémorisée dans le navigateur.", "Sections de services et de projets avec appels à l’action."],
      en: ["Seven pages: Home, About, Services, Projects, Careers, Blog, and Contact.", "Mobile navigation and a skip-to-content link.", "Light/dark theme preference saved in the browser.", "Service and project sections with calls to action."]
    },
    technical: {
      fr: "Le projet utilise HTML, CSS et JavaScript sans framework. Le thème choisi est conservé dans le stockage local du navigateur. La démo en ligne permet de parcourir les pages du site.",
      en: "The project uses HTML, CSS, and JavaScript without a framework. The selected theme is stored in the browser’s local storage. The live demo lets visitors browse the site pages."
    },
    note: {
      fr: "Projet personnel de démonstration : le nom de l’entreprise et les contenus servent d’exemples pour ce site.",
      en: "Personal demo project: the company name and content are examples created for this website."
    },
    tags: ["HTML", "CSS", "JavaScript"],
    cover: "company",
    github: "https://github.com/dev-Chris06/site-entreprise",
    demo: "https://dev-Chris06.github.io/site-entreprise/"
  },

  {
    id: 3,
    slug: "password-manager",
    order: 1,
    title: { fr: "Password Manager", en: "Password Manager" },
    kind: { fr: "Application web full stack", en: "Full-stack web application" },
    description: {
      fr: "Gestionnaire de mots de passe zero-knowledge en cours de refonte : le chiffrement se fait dans le navigateur, le serveur ne voit jamais les secrets.",
      en: "Zero-knowledge password manager being rebuilt: encryption happens in the browser, and the server never sees the secrets."
    },
    overview: {
      fr: "Ce gestionnaire de mots de passe est en cours de refonte vers une architecture zero-knowledge. Tout le chiffrement a lieu dans le navigateur ou dans l’extension Chrome : le serveur ne voit jamais ni le mot de passe maître ni les secrets. La première version chiffrait les données côté serveur, ce qui permettait au serveur de les lire ; elle reste consultable sous le tag git avant-refonte.",
      en: "This password manager is being rebuilt on a zero-knowledge architecture. All encryption happens in the browser or the Chrome extension: the server never sees the master password or the secrets. The first version encrypted data on the server, which let the server read it; it remains available under the avant-refonte git tag."
    },
    highlights: {
      fr: ["Chiffrement côté client : Argon2id avec une clé secrète supplémentaire, puis AES-256-GCM.", "Double authentification TOTP obligatoire et codes de secours.", "Coffre sur une seule page avec verrouillage automatique, générateur et sauvegarde chiffrée.", "Vérification des mots de passe exposés dans des fuites (Have I Been Pwned, k-anonymat).", "Extension Chrome qui déchiffre localement et ne remplit que sur le bon domaine."],
      en: ["Client-side encryption: Argon2id with an additional secret key, then AES-256-GCM.", "Mandatory TOTP two-factor authentication and recovery codes.", "Single-page vault with auto-lock, generator, and encrypted backup.", "Breached password check (Have I Been Pwned, k-anonymity).", "Chrome extension that decrypts locally and only fills on the right domain."]
    },
    technical: {
      fr: "Le serveur Symfony 7.4 (PHP 8.3+, Doctrine, MySQL) se limite à stocker, authentifier, limiter les tentatives et journaliser. Le client et l’extension sont écrits en TypeScript, avec WebCrypto et Argon2id compilé en WebAssembly. La qualité est suivie avec PHPUnit, PHPStan, Vitest, ESLint, Playwright et une intégration continue GitHub Actions. Le plan de refonte et les décisions techniques sont documentés dans le dépôt.",
      en: "The Symfony 7.4 server (PHP 8.3+, Doctrine, MySQL) only stores, authenticates, rate-limits, and logs. The client and the extension are written in TypeScript, with WebCrypto and Argon2id compiled to WebAssembly. Quality is tracked with PHPUnit, PHPStan, Vitest, ESLint, Playwright, and GitHub Actions continuous integration. The rebuild plan and technical decisions are documented in the repository."
    },
    note: {
      fr: "Refonte en cours : les fonctionnalités ci-dessus décrivent l’application visée, construite étape par étape selon le plan publié dans le dépôt. Aucune démo publique n’est liée à cette fiche.",
      en: "Rebuild in progress: the features above describe the target application, built step by step according to the plan published in the repository. No public demo is linked from this page."
    },
    tags: ["Symfony", "TypeScript", "WebCrypto", "MySQL"],
    cover: "vault",
    github: "https://github.com/dev-Chris06/password-manager",
    demo: null
  },
  {
    id: 4,
    slug: "clinic-management-system",
    order: 2,
    title: { fr: "Système de Gestion de Clinique", en: "Clinic Management System" },
    kind: { fr: "Application métier full stack", en: "Full-stack business application" },
    description: {
      fr: "Application de clinique dédiée aux patients, consultations, prescriptions, rendez-vous et dossiers médicaux.",
      en: "Clinic application for patients, consultations, prescriptions, appointments, and medical records."
    },
    overview: {
      fr: "Cette application organise plusieurs tâches d’une clinique dans une interface de gestion : suivi des patients, consultations, prescriptions, rendez-vous et historique médical.",
      en: "This application brings several clinic workflows into one management interface: patient records, consultations, prescriptions, appointments, and medical history."
    },
    highlights: {
      fr: ["Authentification avec rôles Admin, Médecin et Secrétaire.", "Gestion des utilisateurs et des dossiers patients.", "Consultations, prescriptions, rendez-vous et historique médical.", "Stockage de documents et export PDF."],
      en: ["Authentication with Admin, Doctor, and Secretary roles.", "User and patient record management.", "Consultations, prescriptions, appointments, and medical history.", "Document storage and PDF export."]
    },
    technical: {
      fr: "Le dépôt sépare l’interface et le serveur : React avec Tailwind CSS côté frontend, Node.js et Express côté backend, et SQLite pour les données. Cette structure distingue l’interface des opérations métier et du stockage.",
      en: "The repository separates the interface and server: React with Tailwind CSS on the frontend, Node.js and Express on the backend, and SQLite for data. This structure separates the interface from business operations and storage."
    },
    note: {
      fr: "Le dépôt fournit des instructions de lancement séparées pour le frontend et le backend ; aucune démo publique n’est liée à cette fiche.",
      en: "The repository provides separate startup instructions for the frontend and backend; no public demo is linked from this page."
    },
    tags: ["React", "Tailwind CSS", "Node.js", "Express", "SQLite"],
    cover: "clinic",
    github: "https://github.com/dev-Chris06/Systeme_de_Gestion_de_Clinique",
    demo: null
  },
  {
    id: 5,
    slug: "loady",
    order: 3,
    title: { fr: "Loady", en: "Loady" },
    kind: { fr: "Application Android et site de présentation", en: "Android app and landing site" },
    description: {
      fr: "Application Android qui télécharge en local les vidéos publiques de plusieurs plateformes, sans compte ni serveur, et son site de présentation.",
      en: "Android app that downloads public videos from several platforms to the device, with no account or server, and its landing site."
    },
    overview: {
      fr: "Loady est une application Android développée en équipe. Elle télécharge sur le téléphone les vidéos publiques de YouTube, TikTok, Instagram et d’autres plateformes, sans compte, sans serveur Loady et sans synchronisation cloud. Nous développons ensemble l’application et son site de présentation.",
      en: "Loady is an Android app built by a team. It downloads public videos from YouTube, TikTok, Instagram, and other platforms to the phone, with no account, no Loady server, and no cloud sync. We build the app and its landing site together."
    },
    highlights: {
      fr: ["Liens de huit plateformes reconnus, par collage ou partage Android.", "Choix du format (MP4, WebM ou MP3) parmi les qualités réellement disponibles.", "Téléchargement en arrière-plan avec notification et nouvelles tentatives en cas de coupure réseau.", "Site de présentation avec thèmes clair et sombre et téléchargement de l’APK."],
      en: ["Links from eight platforms recognized, by pasting or Android sharing.", "Format choice (MP4, WebM, or MP3) among the qualities actually available.", "Background downloads with a notification and retries if the network drops.", "Landing site with light and dark themes and an APK download."]
    },
    technical: {
      fr: "L’application est développée en Flutter, avec du Kotlin côté Android, et s’appuie sur yt-dlp pour extraire les vidéos. Le site de présentation est un site statique Astro avec Tailwind CSS, déployé sur Vercel ; son code est dans un dépôt séparé.",
      en: "The app is built with Flutter, with Kotlin on the Android side, and relies on yt-dlp to extract videos. The landing site is a static Astro site with Tailwind CSS, deployed on Vercel; its code lives in a separate repository."
    },
    note: {
      fr: "Le dépôt de l’application est hébergé sur le compte d’un membre de l’équipe ; le code du site de présentation est sur github.com/dev-Chris06/loady-site. Seules les vidéos publiques sont prises en charge : les contenus protégés (DRM) sont refusés.",
      en: "The app repository is hosted on a team member’s account; the landing site code is at github.com/dev-Chris06/loady-site. Only public videos are supported: protected (DRM) content is refused."
    },
    tags: ["Flutter", "Kotlin", "Astro", "Tailwind CSS"],
    cover: "mobile",
    github: "https://github.com/DazBot13-boopt/dazdownloader",
    demo: "https://loady-site.vercel.app"
  },
  {
    id: 6,
    slug: "digitech",
    order: 4,
    title: { fr: "DIGITECH — site d’agence", en: "DIGITECH — Agency Website" },
    kind: { fr: "Site vitrine bilingue", en: "Bilingual showcase website" },
    description: {
      fr: "Site vitrine d’une agence de digitalisation, réalisé lors d’un projet tutoré, en français et en anglais.",
      en: "Showcase website for a digital agency, built during a supervised project, in French and English."
    },
    overview: {
      fr: "DIGITECH est une agence fictive créée pour un projet tutoré : l’équipe devait fonctionner comme une vraie agence et répondre au besoin d’un client. J’y occupais le rôle de responsable technique et j’ai conçu et développé le site, de la structure des pages à la mise en ligne.",
      en: "DIGITECH is a fictional agency created for a supervised project: the team had to operate like a real agency and meet a client’s needs. I was the technical lead and designed and built the website, from page structure to deployment."
    },
    highlights: {
      fr: ["Accueil avec services, méthode de travail, réalisations et contact.", "Page équipe, page 404, mentions légales et politique de confidentialité.", "Traduction français / anglais avec sélecteur de langue.", "Formulaire de contact relié à Formspree."],
      en: ["Home page with services, work method, portfolio, and contact.", "Team page, 404 page, legal notice, and privacy policy.", "French / English translation with a language switcher.", "Contact form connected to Formspree."]
    },
    technical: {
      fr: "Le site est réalisé en HTML, CSS et JavaScript natif, sans framework. Les traductions sont regroupées dans un fichier dédié et appliquées par JavaScript au changement de langue. Il est hébergé sur Netlify, avec robots.txt, sitemap et balises Open Graph.",
      en: "The site uses HTML, CSS, and vanilla JavaScript, with no framework. Translations are grouped in a dedicated file and applied with JavaScript when the language changes. It is hosted on Netlify, with robots.txt, a sitemap, and Open Graph tags."
    },
    note: {
      fr: "Projet tutoré : l’agence, ses coordonnées et ses réseaux sociaux ont été créés pour l’exercice.",
      en: "Supervised project: the agency, its contact details, and its social accounts were created for the exercise."
    },
    tags: ["HTML", "CSS", "JavaScript"],
    cover: "agency",
    github: "https://github.com/dev-Chris06/digitech-site",
    demo: "https://digitechagence.netlify.app/"
  }
];

// Ordre d’affichage : les projets les plus solides d’abord (champ `order`, croissant).
projects.sort((a, b) => a.order - b.order);
