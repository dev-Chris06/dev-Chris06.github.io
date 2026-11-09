/**
 * Formulaire de contact: validation, accessibilité et retours utilisateur.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Message du formulaire dans la langue de la page (attributs data-msg-* écrits par scripts/build.js).
 * @param {string} name - required, email, message, error, success ou sending
 * @returns {string} Texte
 */
function contactMessage(name) {
  const form = document.querySelector("#contact-form");
  return form?.dataset[`msg${name[0].toUpperCase()}${name.slice(1)}`] || "";
}

/**
 * @param {Element | null} el - Champ
 * @param {string} message - Message
 */
function markInvalid(el, message) {
  if (!el) {
    return;
  }
  el.classList.add("error");
  el.setAttribute("aria-invalid", "true");
  el.setAttribute("aria-describedby", "form-error-message");
  const errHost = safeQuerySelector("#form-error-message");
  if (errHost) {
    errHost.textContent = message;
  }
}

/**
 * @param {Element | null} el - champ
 */
function markValid(el) {
  if (!el) {
    return;
  }
  el.classList.remove("error");
  el.removeAttribute("aria-invalid");
  el.removeAttribute("aria-describedby");
}

/**
 * @param {Element[]} fields - champs
 */
function clearAllErrors(fields) {
  fields.forEach((field) => {
    markValid(field);
  });
  const errHost = safeQuerySelector("#form-error-message");
  if (errHost) {
    errHost.textContent = "";
  }
}

/**
 * @param {string} message - texte
 * @param {"error"|"success"} kind - type
 */
function setFeedback(message, kind) {
  const feedback = safeQuerySelector("#form-feedback");
  if (!feedback) {
    return;
  }
  feedback.textContent = message;
  if (!message) {
    feedback.classList.remove("is-error", "is-success");
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    return;
  }
  feedback.classList.toggle("is-error", kind === "error");
  feedback.classList.toggle("is-success", kind === "success");
  feedback.setAttribute("role", kind === "error" ? "alert" : "status");
  feedback.setAttribute("aria-live", kind === "error" ? "assertive" : "polite");
}

/**
 * Vérifie le formulaire et retourne le premier blocage.
 * @param {object} p - champs
 * @returns {{ message: string, first: (Element | null) }} Erreur
 */
function getFirstFormIssue(p) {
  const name = p.name.value.trim();
  const email = p.email.value.trim();
  const subject = p.subject.value;
  const message = p.message.value.trim();
  if (!name || !email || !subject || !message) {
    let first = p.name;
    if (!p.name.value.trim()) {
      first = p.name;
    } else if (!p.email.value.trim()) {
      first = p.email;
    } else if (!p.subject.value) {
      first = p.subject;
    } else {
      first = p.message;
    }
    return { message: contactMessage("required"), first };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { message: contactMessage("email"), first: p.email };
  }
  if (message.length < 10) {
    return { message: contactMessage("message"), first: p.message };
  }
  return { message: "", first: null };
}

/**
 * @param {Element[]} fields - champs
 */
function bindContactFieldReset(fields) {
  fields.forEach((field) => {
    field.addEventListener("input", () => {
      markValid(field);
    });
  });
}

/**
 * @param {HTMLFormElement} form - formulaire
 * @param {object} f - champs
 * @param {Element[]} fieldList - liste champs
 */
function handleContactSubmit(form, f, fieldList) {
  clearAllErrors(fieldList);
  setFeedback("", "success");
  const issue = getFirstFormIssue({
    name: f.name,
    email: f.email,
    subject: f.subject,
    message: f.message
  });
  if (issue.message) {
    setFeedback(issue.message, "error");
    markInvalid(issue.first, issue.message);
    if (issue.first) {
      issue.first.focus();
    }
    return;
  }

  // Honeypot rempli = bot détecté : faux succès affiché, aucun envoi effectué.
  const honeyField = form.elements.namedItem("_honey");
  if (honeyField && honeyField.value.trim() !== "") {
    setFeedback(contactMessage("success"), "success");
    form.reset();
    return;
  }

  const submitBtn = form.querySelector(".contact-submit");
  const submitLabel = submitBtn?.querySelector("[data-submit-label]");
  const defaultLabel = submitLabel?.textContent || "";
  if (submitBtn) {
    submitBtn.disabled = true;
    if (submitLabel) submitLabel.textContent = contactMessage("sending");
  }

  const subjectLabel = f.subject.options[f.subject.selectedIndex]?.text || f.subject.value;
  const payload = {
    name: f.name.value.trim(),
    email: f.email.value.trim(),
    _replyto: f.email.value.trim(),
    subject: subjectLabel,
    _subject: `Portfolio — ${subjectLabel}`,
    message: f.message.value.trim(),
    _honey: form.elements.namedItem("_honey")?.value || ""
  };

  fetch("https://formsubmit.co/ajax/christopherahoglele9@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(async (response) => {
      const result = await response.json();
      if (!response.ok || result.success === "false" || result.success === false) {
        throw new Error("FormSubmit rejected the submission");
      }
      setFeedback(contactMessage("success"), "success");
      form.reset();
      clearAllErrors(fieldList);
    })
    .catch(() => {
      setFeedback(contactMessage("error"), "error");
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        if (submitLabel) submitLabel.textContent = defaultLabel;
      }
    });
}

/**
 * Branche le formulaire #contact-form.
 */
function initContactForm() {
  const form = safeQuerySelector("#contact-form");
  if (!form) {
    return;
  }
  const nameField = safeQuerySelector("#contact-name");
  const emailField = safeQuerySelector("#contact-email");
  const subjectField = safeQuerySelector("#contact-subject");
  const messageField = safeQuerySelector("#contact-message");
  const fieldList = [nameField, emailField, subjectField, messageField].filter(Boolean);
  bindContactFieldReset(fieldList);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      handleContactSubmit(
        form,
        {
          name: nameField,
          email: emailField,
          subject: subjectField,
          message: messageField
        },
        fieldList
      );
    } catch (error) {
      handleError("initContactForm", error);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    initContactForm();
  } catch (error) {
    handleError("initContactForm-bootstrap", error);
  }
});
