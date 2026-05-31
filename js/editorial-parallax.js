(() => {
  const section = document.querySelector("[data-summit-story]");
  if (!section) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let ticking = false;
  let pointerX = 0;
  let pointerY = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const updateStory = () => {
    ticking = false;

    if (reducedMotion.matches) {
      section.style.setProperty("--summit-progress", "0");
      section.style.setProperty("--summit-pointer-x", "0");
      section.style.setProperty("--summit-pointer-y", "0");
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.bottom <= 0 || rect.top >= viewportHeight) return;

    const progress = clamp(
      (viewportHeight - rect.top) / (viewportHeight + rect.height),
      0,
      1
    );

    section.style.setProperty("--summit-progress", progress.toFixed(4));
    section.style.setProperty("--summit-pointer-x", pointerX.toFixed(4));
    section.style.setProperty("--summit-pointer-y", pointerY.toFixed(4));
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateStory);
  };

  section.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches) return;

    const rect = section.getBoundingClientRect();
    pointerX = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
    pointerY = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
    requestUpdate();
  });

  section.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
    requestUpdate();
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  reducedMotion.addEventListener?.("change", requestUpdate);

  updateStory();
})();
