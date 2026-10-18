(function () {
  "use strict";

  /* 舊版單頁錨點（index.html#awards 等）導向拆分後的分頁 */
  const legacySections = {
    gallery: "projects", services: "projects", awards: "awards", benefits: "benefits",
    activities: "activities", news: "employees"
  };
  const legacyTarget = legacySections[window.location.hash.slice(1)];
  if (legacyTarget && document.querySelector(".hero")) {
    window.location.replace("./pages/" + legacyTarget + ".html");
    return;
  }

  /* 獲獎紀錄分類 */
  const awardFilters = document.querySelector('.award-filters');
  if (awardFilters) {
    const filterButtons = Array.from(awardFilters.querySelectorAll('button'));
    const awardCards = Array.from(document.querySelectorAll('[data-award-category]'));
    const awardStatus = document.querySelector('.award-filter-status');
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const category = button.getAttribute('data-award-filter');
        filterButtons.forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
        let visible = 0;
        awardCards.forEach(function (card) {
          const show = category === 'all' || card.getAttribute('data-award-category') === category;
          card.hidden = !show;
          if (show) visible++;
        });
        awardStatus.textContent = button.textContent + '：顯示' + visible + '筆獎項影像';
      });
    });
    awardFilters.hidden = false;
    awardStatus.hidden = false;
    awardStatus.textContent = '全部：顯示' + awardCards.length + '筆獎項影像';
  }

  /* 1. 手機選單控制 */
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#main-menu");

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "選單 ☰";
  }

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "關閉 ✕" : "選單 ☰";
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  /* 3. 工程紀錄：燈箱檢視 (Lightbox) */
  const lightbox = document.querySelector("#lightbox");
  const lightboxImg = document.querySelector("#lightbox-img");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxDesc = document.querySelector("#lightbox-desc");
  const lightboxClose = document.querySelector(".lightbox-close");

  function openLightbox(src, title, desc) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxTitle.textContent = title || "";
    lightboxDesc.textContent = desc || "";
    lightboxDesc.style.display = desc ? "block" : "none";
    lightbox.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".award-card-image").forEach(function (card) {
    card.addEventListener("click", function () {
      const fullSrc = this.getAttribute("data-full");
      const title = this.getAttribute("data-title");
      const desc = this.getAttribute("data-desc");
      openLightbox(fullSrc, title, desc);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-active")) {
        closeLightbox();
      }
    });
  }
})();
