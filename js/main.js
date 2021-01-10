// Mobile Navigation
(() => {
  const menuButton = document.querySelector(".menu-btn");
  const navMenuMobile = document.querySelector(".navbar-mobile");
  closeNavMenuBtn = document.querySelector(".close-nav-menu");
  menuFadeOut = document.querySelector(".menu-fade-out");

  menuButton.addEventListener("click", () => {
    navMenuMobile.classList.add("nav-mobile-open");
  });

  closeNavMenuBtn.addEventListener("click", () => {
    navMenuMobile.classList.remove("nav-mobile-open");
    menuFadeOut.classList.add("effect-active");
    setTimeout(() => {
      menuFadeOut.classList.remove("effect-active");
    }, 300);
  });
})();

// Hide all sections except active class section
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active-section")) {
      section.classList.add("hide-section");
    }
    console.log(section.classList);
  });
})();
