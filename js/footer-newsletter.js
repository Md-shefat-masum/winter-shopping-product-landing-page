/*
  FRZN Alpine Fashion UI
  Footer newsletter demo interaction.
*/

(() => {
  const form = document.querySelector("[data-footer-newsletter]");
  const status = document.querySelector("[data-footer-newsletter-status]");

  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = form.querySelector('input[type="email"]');
    const email = input?.value.trim() ?? "";

    status.classList.remove("is-error", "is-success");

    if (!email || !input.checkValidity()) {
      status.textContent = "ENTER A VALID EMAIL ADDRESS.";
      status.classList.add("is-error");
      input?.focus();
      return;
    }

    status.textContent = "TRANSMISSION RECEIVED / ACCESS GRANTED.";
    status.classList.add("is-success");
    form.reset();
  });
})();
