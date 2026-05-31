(() => {
  const navbar = document.querySelector(".navbar-section");
  const menuButton = document.querySelector(".navbar-menu-btn");
  const mobileLinks = document.querySelectorAll(".navbar-mobile-links a");
  if (!navbar || !menuButton) return;
  const setMenuState = (isOpen) => {
    navbar.classList.toggle("is-mobile-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  };
  menuButton.addEventListener("click", () => setMenuState(menuButton.getAttribute("aria-expanded") !== "true"));
  mobileLinks.forEach((link) => link.addEventListener("click", () => setMenuState(false)));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenuState(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 840) setMenuState(false); });
})();