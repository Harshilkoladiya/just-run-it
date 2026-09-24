// Formspree endpoint for the CapitalScale contact form.
// Set the form ID from your Formspree dashboard
// (Formspree shows an endpoint like https://formspree.io/f/abcdwxyz).
export const FORMSPREE_FORM_ID = "xzebgono";

export const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${FORMSPREE_FORM_ID}`
  : "";
