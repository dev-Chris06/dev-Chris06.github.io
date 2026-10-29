/**
 * Données des projets du portfolio.
 * Utilisé par la grille des projets et la page de détail.
 */

const projects = [
  {
    id: 1,
    slug: "site-restaurant",
    order: 3,
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
    order: 4,
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
      fr: "Gestionnaire web multi-utilisateur avec coffre chiffré et extension Chrome pour le remplissage à la demande.",
      en: "Multi-user web password manager with an encrypted vault and a Chrome extension for on-demand autofill."
    },
    overview: {
      fr: "Password Manager est un gestionnaire web multi-utilisateur qui organise les identifiants dans un coffre associé à chaque compte. Le dépôt comprend aussi une extension Chrome pour déclencher le remplissage automatique à la demande.",
      en: "Password Manager is a multi-user web password manager that organizes credentials in a vault for each account. The repository also includes a Chrome extension for on-demand autofill."
    },
    highlights: {
      fr: ["Création de compte, connexion et coffre d’identifiants par utilisateur.", "Ajout, modification, suppression et filtrage des entrées.", "Copie dans le presse-papiers avec effacement automatique après 15 secondes.", "Export et réimport d’une sauvegarde chiffrée.", "Extension Chrome Manifest V3 pour le remplissage à la demande."],
      en: ["Account creation, login, and a per-user credential vault.", "Add, edit, delete, and filter entries.", "Clipboard copy with automatic clearing after 15 seconds.", "Export and restore an encrypted backup.", "Manifest V3 Chrome extension for on-demand autofill."]
    },
    technical: {
      fr: "Application PHP procédurale avec MySQL ou MariaDB et interface JavaScript. Le README décrit AES-256-GCM pour le chiffrement, PBKDF2-SHA-256 (600 000 itérations) pour la dérivation de clé, bcrypt pour le mot de passe maître, ainsi que des sessions HttpOnly, des jetons CSRF et des requêtes PDO préparées.",
      en: "Procedural PHP application with MySQL or MariaDB and a JavaScript interface. The README documents AES-256-GCM encryption, PBKDF2-SHA-256 (600,000 iterations) for key derivation, bcrypt for the master password, along with HttpOnly sessions, CSRF tokens, and prepared PDO queries."
    },
    note: {
      fr: "La documentation du dépôt décrit l’architecture et les prérequis de déploiement ; aucune démo publique n’est liée à cette fiche.",
      en: "The repository documentation describes the architecture and deployment requirements; no public demo is linked from this page."
    },
    tags: ["PHP", "JavaScript", "MySQL"],
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
  }
];

// Ordre d’affichage : les projets les plus solides d’abord (champ `order`, croissant).
projects.sort((a, b) => a.order - b.order);
