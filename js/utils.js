/**
 * Recherche un élément dans le DOM de manière sécurisée.
 * Retourne null et affiche un avertissement si l'élément n'existe pas.
 *
 * @param {string} selector - Sélecteur CSS ciblé.
 * @returns {Element|null} Élément trouvé ou null.
 */
function safeQuerySelector(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    console.warn(`[safeQuerySelector] Élément introuvable pour: "${selector}"`);
    return null;
  }

  return element;
}

/**
 * Journalise une erreur de façon uniforme avec un contexte explicite.
 *
 * @param {string} context - Contexte fonctionnel de l'erreur.
 * @param {unknown} error - Erreur capturée.
 */
function handleError(context, error) {
  const details = error instanceof Error ? error.message : String(error);
  console.warn(`[handleError] ${context} - ${details}`);
}
