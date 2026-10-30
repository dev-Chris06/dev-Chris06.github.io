/**
 * Gestion i18n (navbar, hero, sections, projets, page détail).
 */

const translations = {
  fr: {
    "nav.main": "Navigation principale",
    "nav.language": "Sélecteur de langue",
    "nav.themeDark": "Activer le thème sombre",
    "nav.themeLight": "Activer le thème clair",
    "nav.backTop": "Retour en haut de page",
    "nav.backHome": "Retour à l’accueil",
    "nav.logoTop": "CG, retour en haut de page",
    "nav.logoHome": "CG, retour à l’accueil",
    "nav.skip": "Passer au contenu",
    "nav.breadcrumb": "Fil d'ariane",
    "hero.status": "Disponible pour des missions",
    "hero.role": "Développeur full stack · Bénin",
    "hero.socials": "Me retrouver en ligne",
    "hero.email": "E-mail",
    "hero.chip.web": "Applications web",
    "hero.chip.auto": "Automatisations",
    "hero.chip.mobile": "Mobile",
    "hero.description": "Je développe des applications web et des automatisations adaptées aux opérations de votre entreprise.",
    "hero.cta.projects": "Voir les projets",
    "hero.cta.contact": "Parlons de votre projet",
    "about.title": "Un développeur proche des besoins métier.",
    "about.kicker": "À propos",
    "about.description": "Je suis Christopher AHO GLELE, développeur Full Stack. Je conçois des applications web et des automatisations pour aider les équipes à mieux travailler.",
    "skills.title": "Une stack choisie selon le projet.",
    "skills.kicker": "Outils de travail",
    "services.title": "Du web utile, pensé pour votre activité.",
    "services.kicker": "Ce que je peux construire",
    "services.intro": "Deux axes principaux : développer vos outils numériques et automatiser les tâches qui ralentissent votre équipe.",
    "services.1.title": "Applications web full stack",
    "services.1.summary": "Des outils accessibles depuis le navigateur, de l’interface aux données.",
    "services.1.item1": "Sites vitrines et applications métier",
    "services.1.item2": "Interfaces, tableaux de bord et API",
    "services.1.item3": "Évolution d’applications existantes",
    "services.2.title": "Automatisation",
    "services.2.summary": "Des flux simples qui réduisent les répétitions et les transferts manuels.",
    "services.2.item1": "Bots et intégrations de messagerie",
    "services.2.item2": "Traitement et organisation des données",
    "services.2.item3": "Automatisation des tâches répétitives",
    "services.3.title": "E-commerce",
    "services.3.item1": "Boutiques en ligne sur mesure ou CMS",
    "services.3.item2": "Commandes, stocks et parcours d’achat",
    "services.3.item3": "Intégration de paiement selon le besoin",
    "services.4.title": "Données et maintenance",
    "services.4.item1": "Conception et migration de bases de données",
    "services.4.item2": "Déploiement, domaine et configuration SSL",
    "services.4.item3": "Corrections, mises à jour et optimisation",
    "projects.title": "Du code qui répond à un besoin.",
    "projects.kicker": "Sélection de projets",
    "projects.intro": "Applications web et sites vitrines, décrits selon ce qui existe réellement dans chaque dépôt.",
    "projects.notFound": "Projet introuvable",
    "projects.details": "Voir détails",
    "projects.demo": "Démo",
    "projects.github": "GitHub",
    "detail.breadcrumbHome": "Accueil",
    "detail.breadcrumbProjects": "Projets",
    "detail.overview": "Présentation",
    "detail.techTitle": "Technologies",
    "detail.highlights": "Fonctionnalités clés",
    "detail.technical": "Réalisation technique",
    "detail.noteTitle": "À savoir",
    "detail.tags": "Technologies du projet",
    "detail.notFoundMessage": "Aucun projet n’a été sélectionné. Retournez à la liste pour ouvrir une fiche.",
    "detail.back": "Voir tous les projets",
    "contact.title": "Contact",
    "contact.subtitle":
      "Parlons de votre projet : site web, automatisation ou landing page, je peux vous aider.",
    "contact.privacy": "Votre nom, votre adresse e-mail et votre message passent par FormSubmit pour m’être transmis.",
    "contact.privacyLink": "Lire la notice de confidentialité",
    "privacy.title": "Confidentialité du formulaire de contact",
    "privacy.lead": "Voici ce qui se passe avec les informations envoyées depuis le formulaire de ce portfolio.",
    "privacy.dataTitle": "Informations demandées",
    "privacy.dataText": "Le formulaire demande votre nom, votre adresse e-mail, un sujet et le contenu de votre message. Ces informations servent à comprendre votre demande et à vous répondre.",
    "privacy.providerTitle": "Transmission par FormSubmit",
    "privacy.providerText": "Le formulaire transmet ces informations à FormSubmit, qui les achemine vers la boîte mail de Christopher AHO GLELE. FormSubmit indique conserver les soumissions pendant 30 jours. Le message reçu peut ensuite rester dans la boîte mail selon les paramètres de celle-ci.",
    "privacy.providerLink": "Consulter les conditions de confidentialité de FormSubmit (PDF)",
    "privacy.contactTitle": "Question sur vos informations",
    "privacy.contactText": "Pour toute question concernant une demande envoyée depuis ce formulaire, écrivez à :",
    "privacy.back": "Retour au portfolio",
    "contact.name": "Nom complet",
    "contact.namePlaceholder": "Votre nom complet",
    "contact.email": "Email",
    "contact.emailPlaceholder": "Votre adresse email",
    "contact.subject": "Sujet",
    "contact.message": "Message",
    "contact.messagePlaceholder":
      "Décrivez votre besoin (contexte, délais, budget si possible)",
    "contact.send": "Envoyer le message →",
    "contact.success": "Message envoyé ! Je vous répondrai dès que possible.",
    "contact.error.required": "Veuillez remplir tous les champs obligatoires.",
    "contact.error.email": "L'adresse email semble invalide.",
    "contact.error.message": "Le message doit contenir au moins 10 caractères.",
    "contact.error.send": "Une erreur est survenue. Réessayez ou contactez-moi par email.",
    "contact.sending": "Envoi en cours...",
    "contact.subject.web": "Projet web",
    "contact.subject.bot": "Bot / Automatisation",
    "contact.subject.landing": "Landing page",
    "contact.subject.other": "Autre",
    "contact.info.email": "christopherahoglele9@gmail.com",
    "contact.info.whatsapp": "WhatsApp",
    "contact.info.linkedin": "LinkedIn",
    "contact.ariaEmail": "Envoyer un email",
    "contact.ariaWhatsapp": "Contacter sur WhatsApp",
    "contact.ariaLinkedin": "Profil LinkedIn",
    "footer.tagline":
      "Applications web full stack & automatisation pour les entreprises.",
    "footer.links": "Liens rapides",
    "footer.social": "Réseaux",
    "footer.copyright":
      "© {year} Mahudjro Shridara Christopher AHO GLELE. Tous droits réservés.",
    "footer.ariaGithub": "Profil GitHub",
    "footer.ariaLinkedin": "Profil LinkedIn",
    "footer.ariaWhatsapp": "Contacter sur WhatsApp",
    "nav.about": "À propos",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.services": "Services",
    "nav.contact": "Contact",
  },
  en: {
    "nav.main": "Main navigation",
    "nav.language": "Language selector",
    "nav.themeDark": "Enable dark theme",
    "nav.themeLight": "Enable light theme",
    "nav.backTop": "Back to top",
    "nav.backHome": "Back to home",
    "nav.logoTop": "CG, back to top",
    "nav.logoHome": "CG, back to home",
    "nav.skip": "Skip to content",
    "nav.breadcrumb": "Breadcrumb",
    "hero.status": "Available for freelance work",
    "hero.role": "Full-stack developer · Benin",
    "hero.socials": "Find me online",
    "hero.email": "Email",
    "hero.chip.web": "Web apps",
    "hero.chip.auto": "Automation",
    "hero.chip.mobile": "Mobile",
    "hero.description": "I build web applications and automations tailored to your business operations.",
    "hero.cta.projects": "Explore projects",
    "hero.cta.contact": "Let’s discuss your project",
    "about.title": "A developer close to business needs.",
    "about.kicker": "About",
    "about.description": "I’m Christopher AHO GLELE, a full-stack developer. I build web applications and automations that help teams work better.",
    "skills.title": "A stack chosen for the project.",
    "skills.kicker": "Tools I work with",
    "services.title": "Useful web, built around your business.",
    "services.kicker": "What I can build",
    "services.intro": "Two main areas: building digital tools and automating tasks that slow your team down.",
    "services.1.title": "Full-stack web applications",
    "services.1.summary": "Browser-based tools, from the interface to the data layer.",
    "services.1.item1": "Showcase websites and business applications",
    "services.1.item2": "Interfaces, dashboards, and APIs",
    "services.1.item3": "Improvements to existing applications",
    "services.2.title": "Automation",
    "services.2.summary": "Practical workflows that reduce repetitive work and manual handoffs.",
    "services.2.item1": "Bots and messaging integrations",
    "services.2.item2": "Data processing and organization",
    "services.2.item3": "Automation of repetitive tasks",
    "services.3.title": "E-commerce",
    "services.3.item1": "Custom online stores or CMS-based stores",
    "services.3.item2": "Orders, inventory, and checkout flows",
    "services.3.item3": "Payment integration based on project needs",
    "services.4.title": "Data and maintenance",
    "services.4.item1": "Database design and migration",
    "services.4.item2": "Deployment, domains, and SSL setup",
    "services.4.item3": "Bug fixes, updates, and optimization",
    "projects.title": "Code that answers a real need.",
    "projects.kicker": "Selected work",
    "projects.intro": "Web applications and showcase sites, described according to what is actually in each repository.",
    "projects.notFound": "Project not found",
    "projects.details": "View details",
    "projects.demo": "Demo",
    "projects.github": "GitHub",
    "detail.breadcrumbHome": "Home",
    "detail.breadcrumbProjects": "Projects",
    "detail.overview": "Overview",
    "detail.techTitle": "Technologies",
    "detail.highlights": "Key features",
    "detail.technical": "Technical implementation",
    "detail.noteTitle": "Good to know",
    "detail.tags": "Project technologies",
    "detail.notFoundMessage": "No project was selected. Return to the list to open a project page.",
    "detail.back": "View all projects",
    "contact.title": "Contact",
    "contact.subtitle":
      "Tell me about your project — web, automation, or a focused landing page.",
    "contact.privacy": "Your name, email address, and message are sent through FormSubmit so I can receive and reply to them.",
    "contact.privacyLink": "Read the privacy notice",
    "privacy.title": "Contact form privacy",
    "privacy.lead": "Here is what happens to the information submitted through this portfolio’s contact form.",
    "privacy.dataTitle": "Information requested",
    "privacy.dataText": "The form asks for your name, email address, a subject, and your message. This information is used to understand your request and reply to you.",
    "privacy.providerTitle": "Sent through FormSubmit",
    "privacy.providerText": "The form sends this information to FormSubmit, which forwards it to Christopher AHO GLELE’s inbox. FormSubmit says it retains submissions for 30 days. The delivered email may then remain in the inbox according to that mailbox’s settings.",
    "privacy.providerLink": "Read FormSubmit’s privacy terms (PDF)",
    "privacy.contactTitle": "Questions about your information",
    "privacy.contactText": "For questions about a request submitted through this form, email:",
    "privacy.back": "Back to portfolio",
    "contact.name": "Full name",
    "contact.namePlaceholder": "Your full name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "Your email address",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.messagePlaceholder":
      "Describe your need (context, timeline, and budget if possible)",
    "contact.send": "Send message →",
    "contact.success":
      "Message sent! I'll get back to you as soon as possible.",
    "contact.error.required": "Please fill in all required fields.",
    "contact.error.email": "The email address looks invalid.",
    "contact.error.message": "The message must be at least 10 characters long.",
    "contact.error.send": "An error occurred. Please try again or contact me by email.",
    "contact.sending": "Sending...",
    "contact.subject.web": "Web project",
    "contact.subject.bot": "Bot / Automation",
    "contact.subject.landing": "Landing page",
    "contact.subject.other": "Other",
    "contact.info.email": "christopherahoglele9@gmail.com",
    "contact.info.whatsapp": "WhatsApp",
    "contact.info.linkedin": "LinkedIn",
    "contact.ariaEmail": "Send an email",
    "contact.ariaWhatsapp": "Contact on WhatsApp",
    "contact.ariaLinkedin": "LinkedIn profile",
    "footer.tagline":
      "Full-stack web applications and automation for businesses.",
    "footer.links": "Quick links",
    "footer.social": "Social",
    "footer.copyright":
      "© {year} Mahudjro Shridara Christopher AHO GLELE. All rights reserved.",
    "footer.ariaGithub": "GitHub profile",
    "footer.ariaLinkedin": "LinkedIn profile",
    "footer.ariaWhatsapp": "Contact on WhatsApp",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.services": "Services",
    "nav.contact": "Contact",
  },
};

/**
 * Remplit le copyright avec un span #footer-year (année courante insérée ici).
 * @param {HTMLElement} parent - paragraphe
 * @param {string} template - texte contenant {year}
 */
function applyFooterCopyright(parent, template) {
  if (!template.includes("{year}")) {
    parent.textContent = template;
    return;
  }
  const parts = template.split("{year}");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  if (parts[0]) {
    parent.appendChild(document.createTextNode(parts[0]));
  }
  const yearEl = document.createElement("span");
  yearEl.id = "footer-year";
  yearEl.textContent = String(new Date().getFullYear());
  parent.appendChild(yearEl);
  if (parts[1]) {
    parent.appendChild(document.createTextNode(parts[1]));
  }
}

function setLanguage(lang) {
  const normalizedLang = lang === "en" ? "en" : "fr";
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const fallback = translations.fr[key] || "";
    const value = translations[normalizedLang][key] || fallback;

    if (!translations[normalizedLang][key]) {
      console.warn(
        `[i18n] Clé manquante "${key}" pour "${normalizedLang}", fallback FR appliqué.`,
      );
    }

    if (key === "footer.copyright" && value.includes("{year}")) {
      applyFooterCopyright(element, value);
    } else {
      element.textContent = value;
    }
  });

  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  placeholders.forEach((element) => {
    const pKey = element.getAttribute("data-i18n-placeholder");
    if (!pKey) {
      return;
    }
    const fallback = translations.fr[pKey] || "";
    const pValue = translations[normalizedLang][pKey] || fallback;
    if (!translations[normalizedLang][pKey]) {
      console.warn(
        `[i18n] Clé manquante "${pKey}" pour "${normalizedLang}", fallback FR appliqué.`,
      );
    }
    element.setAttribute("placeholder", pValue);
  });

  const ariaLabels = document.querySelectorAll("[data-i18n-aria]");
  ariaLabels.forEach((element) => {
    const aKey = element.getAttribute("data-i18n-aria");
    if (!aKey) {
      return;
    }
    const fallback = translations.fr[aKey] || "";
    const aValue = translations[normalizedLang][aKey] || fallback;
    if (!translations[normalizedLang][aKey]) {
      console.warn(
        `[i18n] Clé manquante "${aKey}" pour "${normalizedLang}", fallback FR appliqué.`,
      );
    }
    element.setAttribute("aria-label", aValue);
  });

  localStorage.setItem("lang", normalizedLang);
  document.documentElement.lang = normalizedLang;

  const buttons = document.querySelectorAll("[data-lang]");
  buttons.forEach((button) => {
    const isActive = button.getAttribute("data-lang") === normalizedLang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (typeof window.renderProjects === "function") {
    try {
      window.renderProjects();
    } catch (error) {
      handleError("setLanguage-renderProjects", error);
    }
  }
}

window.setLanguage = setLanguage;
