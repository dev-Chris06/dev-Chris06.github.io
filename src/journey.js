/**
 * Données de la section Parcours (formation et certifications), en français et en anglais.
 * Utilisées par scripts/build.js. Chaque texte doit exister dans les deux langues.
 *
 * Formation : du plus récent au plus ancien. `end` est l'année de fin, prévue si `inProgress`.
 * Certifications : du plus récent au plus ancien ; une certification en cours n'a ni date,
 * ni lien, ni image. `issued` est la date de délivrance (AAAA-MM-JJ, celle de la page Credly).
 * `image` : badge enregistré dans assets/img/badges/ (192 × 192 px, WebP), affiché en 72 px.
 */

const education = [
  {
    start: 2024,
    end: 2027,
    inProgress: true,
    title: {
      fr: "Licence Réseaux et Génie Logiciel",
      en: "Bachelor’s degree in Networks and Software Engineering",
    },
    school: "PIGIER Bénin",
  },
  {
    start: 2023,
    end: 2024,
    title: {
      fr: "Baccalauréat série D (scientifique)",
      en: "Baccalauréat, Series D (science track)",
    },
    school: "Saint François-Xavier",
  },
];

// Intitulés officiels des cours Cisco, en anglais dans les deux langues.
const certifications = [
  {
    title: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
    inProgress: true,
  },
  {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    issued: "2026-02-19",
    url: "https://www.credly.com/badges/6f99de03-e378-4d80-9f4c-f8ba3d4e1d96/public_url",
    image: "ccna-switching-routing-wireless.webp",
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    issued: "2025-06-19",
    url: "https://www.credly.com/badges/bad1cc05-98b6-4a2a-bf35-5f38e4f22016/public_url",
    image: "ccna-introduction-to-networks.webp",
  },
];

module.exports = { education, certifications };
