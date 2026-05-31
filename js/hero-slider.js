(() => {
  const heroSection = document.querySelector(".hero-section");
  const mainWrapper = document.querySelector("[data-hero-main-wrapper]");
  const thumbWrapper = document.querySelector("[data-hero-thumb-wrapper]");
  const snowLayer = document.querySelector("[data-hero-snow]");
  if (!heroSection || !mainWrapper || !thumbWrapper) return;

  const products = [
    {title:"ARTICO1",category:"PUFFER",series:"SERIES 01",season:"FROST CORE",description:"Cold-weather puffer with bold insulation lines and a crisp icy-blue finish.",colour:"FROST BLUE",colourCss:"linear-gradient(135deg,#9bc3d7,#365b72)",price:"899.99",sizes:["S","M","L","XL"],activeSize:"M",temperature:"-20°C",shell:"PREMIUM WINTER DOWN",modelCode:"A1 / FRONT / 86.2°",image:"./assets/hero/slides/product-01-puffer-blue.png",thumb:"./assets/hero/slides/product-01-puffer-blue.png",accent:"#bed7e3"},
    {title:"GLACIER",category:"PUFFER",series:"SERIES 02",season:"SILVER LINE",description:"Reflective silver-grey puffer tailored for elevated winter comfort and city layering.",colour:"SILVER GREY",colourCss:"linear-gradient(135deg,#f1f3f3,#9ca6a9)",price:"879.99",sizes:["S","M","L","XL"],activeSize:"L",temperature:"-18°C",shell:"THERMAL STREET PUFFER",modelCode:"GL / FRONT / 89.3°",image:"./assets/hero/slides/product-02-puffer-silver.png",thumb:"./assets/hero/slides/product-02-puffer-silver.png",accent:"#e1eaec"},
    {title:"RUBY",category:"PUFFER",series:"SERIES 03",season:"DUSK CORE",description:"A rich wine-maroon puffer with clean volume and a confident premium winter silhouette.",colour:"WINE MAROON",colourCss:"linear-gradient(135deg,#8f5361,#3f242d)",price:"859.99",sizes:["S","M","L","XL"],activeSize:"M",temperature:"-16°C",shell:"CITY INSULATION",modelCode:"RB / FRONT / 87.1°",image:"./assets/hero/slides/product-03-puffer-maroon.png",thumb:"./assets/hero/slides/product-03-puffer-maroon.png",accent:"#d8b7c1"},
    {title:"AURORA",category:"PARKA",series:"SERIES 04",season:"LUXE PARKA",description:"Longline winter parka with soft fur-trim hood and an elegant rosewood cold-season tone.",colour:"ROSEWOOD",colourCss:"linear-gradient(135deg,#ca6a8b,#71364d)",price:"1,099.99",sizes:["S","M","L","XL"],activeSize:"M",temperature:"-24°C",shell:"SNOW PARKA",modelCode:"AU / FRONT / 84.4°",image:"./assets/hero/slides/product-04-parka-maroon-female.png",thumb:"./assets/hero/slides/product-04-parka-maroon-female.png",accent:"#e0b5c5"},
    {title:"SUMMIT",category:"PARKA",series:"SERIES 05",season:"EVEREST LINE",description:"Expedition-style navy parka with fur hood and longline construction for alpine cold.",colour:"ARCTIC NAVY",colourCss:"linear-gradient(135deg,#385f98,#142d56)",price:"1,149.99",sizes:["S","M","L","XL"],activeSize:"L",temperature:"-26°C",shell:"ALPINE SHELL PARKA",modelCode:"SM / FRONT / 85.0°",image:"./assets/hero/slides/product-05-parka-navy-male.png",thumb:"./assets/hero/slides/product-05-parka-navy-male.png",accent:"#b9cdea"},
    {title:"STEALTH",category:"PARKA",series:"SERIES 06",season:"NIGHT LUXE",description:"Deep midnight-blue long parka designed for refined winter layering with insulated comfort.",colour:"MIDNIGHT BLUE",colourCss:"linear-gradient(135deg,#2d5870,#16384a)",price:"1,129.99",sizes:["S","M","L","XL"],activeSize:"M",temperature:"-22°C",shell:"PREMIUM COLD PARKA",modelCode:"ST / FRONT / 86.4°",image:"./assets/hero/slides/product-06-parka-deepblue-female.png",thumb:"./assets/hero/slides/product-06-parka-deepblue-female.png",accent:"#a7c3d1"}
  ];

  const pad = (n) => String(n).padStart(2, "0");
  const createSizeButtons = (product) => product.sizes.map((size) => `<button type="button" class="${size === product.activeSize ? "is-active" : ""}" aria-label="Select size ${size}">${size}</button>`).join("");

  const createMainSlide = (product, index) => `
    <article class="swiper-slide hero-slide" data-accent="${product.accent}">
      <div class="hero-slide-inner">
        <div class="hero-copy">
          <div class="hero-copy-top">
            <p class="tech-label hero-kicker"><span>${product.series}</span><span>${product.season}</span></p>
            <h1 class="hero-title"><span>COLLECTION</span><strong>${product.title}<sup>™</sup></strong></h1>
            <p class="hero-intro">${product.description}</p>
          </div>
          <div class="hero-product-panel">
            <div class="hero-product-grid">
              <div class="hero-option-block">
                <p class="tech-label">SELECT SIZE</p>
                <div class="hero-size-list" aria-label="${product.title} available sizes">${createSizeButtons(product)}</div>
              </div>
              <div class="hero-option-block">
                <p class="tech-label">COLOURWAY</p>
                <div class="hero-colour-row"><span class="hero-colour-dot" style="--dot-bg:${product.colourCss}" aria-hidden="true"></span><span>${product.colour}</span></div>
              </div>
            </div>
            <div class="hero-buy-row">
              <div><p class="tech-label">ADD TO CART / USD</p><p class="hero-price">$ ${product.price}</p></div>
              <button class="octagon-btn hero-cart-btn" type="button" aria-label="Add ${product.title} to cart">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13" /><path d="m13 7 5 5-5 5" /></svg>
              </button>
            </div>
          </div>
          <div class="hero-copy-footer"><p>${product.shell}</p><p>${product.temperature}</p><p>FRZN / ${pad(index + 1)}</p></div>
        </div>
        <div class="hero-visual">
          <p class="hero-visual-label tech-label">${product.category} / FRONT PROFILE</p>
          <p class="hero-model-code">${product.modelCode}</p>
          <div class="hero-model-ground" aria-hidden="true"></div>
          <img class="hero-main-image" src="${product.image}" alt="${product.title} ${product.category.toLowerCase()} front profile" />
        </div>
      </div>
    </article>`;

  const createThumbSlide = (product, index) => `
    <div class="swiper-slide">
      <button class="hero-thumb-card" type="button" aria-label="Show ${product.title}">
        <span class="hero-thumb-index">${pad(index + 1)}</span>
        <span class="hero-thumb-category">${product.category}</span>
        <img src="${product.thumb}" alt="" aria-hidden="true" />
        <span class="hero-thumb-name">${product.title}</span>
      </button>
    </div>`;

  mainWrapper.innerHTML = products.map(createMainSlide).join("");
  thumbWrapper.innerHTML = products.map(createThumbSlide).join("");

  if (snowLayer) {
    const particles = Array.from({ length: 28 }, (_, index) => {
      const left = (index * 37 + 11) % 100;
      const top = (index * 53 + 7) % 92;
      const size = (index % 4) + 1;
      const opacity = (0.16 + (index % 5) * 0.045).toFixed(2);
      const duration = 3.6 + (index % 6) * 0.62;
      const delay = -((index % 7) * 0.74);
      return `<span class="hero-snow-particle" style="left:${left}%;top:${top}%;--snow-size:${size}px;--snow-opacity:${opacity};--snow-duration:${duration}s;--snow-delay:${delay}s"></span>`;
    });
    snowLayer.innerHTML = particles.join("");
  }

  const formatPagination = (current, total) => `<span class="hero-pagination-current">${pad(current)}</span><span class="hero-pagination-total">${pad(total)}</span>`;
  const updateAccent = (swiper) => {
    const currentSlide = swiper.slides[swiper.activeIndex];
    heroSection.style.setProperty("--hero-accent", currentSlide?.dataset?.accent || "#d8e5ec");
  };

  if (typeof Swiper !== "undefined") {
    const thumbSwiper = new Swiper("[data-hero-thumb-swiper]", {
      slidesPerView: 2.15, spaceBetween: 11, watchSlidesProgress: true, slideToClickedSlide: true,
      breakpoints: {0:{slidesPerView:2.15,spaceBetween:9},520:{slidesPerView:3.05,spaceBetween:10},980:{slidesPerView:1.62,spaceBetween:12}}
    });

    const mainSwiper = new Swiper("[data-hero-main-swiper]", {
      effect: "fade", fadeEffect: { crossFade: true }, speed: 850, loop: true, grabCursor: true,
      keyboard: { enabled: true },
      autoplay: { delay: 6200, disableOnInteraction: false, pauseOnMouseEnter: true },
      navigation: { prevEl: ".hero-nav-prev", nextEl: ".hero-nav-next" },
      pagination: { el: ".hero-pagination", type: "custom", renderCustom: (_, current, total) => formatPagination(current, total) },
      thumbs: { swiper: thumbSwiper },
      on: { init(swiper){ updateAccent(swiper); }, slideChangeTransitionStart(swiper){ updateAccent(swiper); } }
    });

    heroSection.addEventListener("mouseenter", () => mainSwiper.autoplay?.stop());
    heroSection.addEventListener("mouseleave", () => mainSwiper.autoplay?.start());
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let ticking = false;
  const updateParallax = () => {
    ticking = false;
    if (reducedMotion.matches) {
      heroSection.style.setProperty("--bg-shift","0px");
      heroSection.style.setProperty("--back-shift","0px");
      heroSection.style.setProperty("--front-shift","0px");
      heroSection.style.setProperty("--mark-shift","0px");
      heroSection.style.setProperty("--fog-shift","0px");
      heroSection.style.setProperty("--snow-shift","0px");
      return;
    }
    const rect = heroSection.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.bottom < 0 || rect.top > vh) return;
    const distance = Math.max(-180, Math.min(540, -rect.top));
    heroSection.style.setProperty("--bg-shift", `${distance * 0.08}px`);
    heroSection.style.setProperty("--back-shift", `${distance * 0.15}px`);
    heroSection.style.setProperty("--front-shift", `${distance * 0.22}px`);
    heroSection.style.setProperty("--mark-shift", `${distance * 0.28}px`);
    heroSection.style.setProperty("--fog-shift", `${distance * 0.20}px`);
    heroSection.style.setProperty("--snow-shift", `${distance * 0.38}px`);
  };
  const requestUpdate = () => { if (ticking) return; ticking = true; window.requestAnimationFrame(updateParallax); };
  updateParallax();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  heroSection.addEventListener("click", (event) => {
    const btn = event.target.closest(".hero-size-list button");
    if (!btn) return;
    const list = btn.closest(".hero-size-list");
    list.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
  });
})();