/* 
	Author: Subhashis Suara
*/

const navMenuBtn = document.querySelector(".menu-btn");
const navMenuDesktop = document.querySelector(".navbar-desktop");
const navMenuMobile = document.querySelector(".navbar-mobile");
const preloader = document.querySelector(".preloader-container");
closeNavMenuBtn = document.querySelector(".close-nav-menu");
menuFadeOut = document.querySelector(".menu-fade-out");
navLinksList = navMenuDesktop.querySelectorAll("a");
hashIdList = [];
navLinksList.forEach((navLink) => {
  hashIdList.push(navLink.hash);
});

// Effects
function menuFadeOutEffect() {
  navMenuMobile.classList.remove("nav-mobile-open");
  menuFadeOut.classList.add("effect-active");
  setTimeout(() => {
    menuFadeOut.classList.remove("effect-active");
  }, 300);
}

// Function to change page based on id
function changePage(resetContactForm = true) {
  let IdValid = false;
  for (let index = 0; index < hashIdList.length; index++) {
    if (window.location.hash === hashIdList[index]) {
      IdValid = true;
    }
  }
  if (IdValid) {
    const hashId = window.location.hash;
    // Section Changes
    document
      .querySelector(".section.active-section")
      .classList.add("hide-section");
    document
      .querySelector(".section.active-section")
      .classList.remove("active-section");
    document.querySelector(hashId).classList.add("active-section");
    document.querySelector(hashId).classList.remove("hide-section");

    // Nav Link Changes
    navMenuDesktop
      .querySelector(".link-btn.nav-active")
      .classList.remove("nav-active");
    navMenuMobile
      .querySelector(".link-btn.nav-active")
      .classList.remove("nav-active");
    navMenuDesktop
      .querySelector(`a[href="${hashId}"]`)
      .classList.add("nav-active");
    navMenuMobile
      .querySelector(`a[href="${hashId}"]`)
      .classList.add("nav-active");

    // Reset Contact Form after FormSpree redirect
    if (hashId === "#contact" && resetContactForm) {
      document.querySelector(".contact-form form").reset();
    }
  }
}

// Detect & navigate from id in URL if detected on first load
document.querySelector("body").onload = () => changePage();

// Detect & navigate from id in URL if detected from history
window.onpopstate = () => changePage(false);

// Core Navigation
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-btn")) {
    // Ensure it is a anchor link
    if (event.target.hash !== "") {
      event.preventDefault();
      const hashId = event.target.hash;
      // Section Changes
      document
        .querySelector(".section.active-section")
        .classList.add("hide-section");
      document
        .querySelector(".section.active-section")
        .classList.remove("active-section");
      document.querySelector(hashId).classList.add("active-section");
      document.querySelector(hashId).classList.remove("hide-section");

      // Nav Link Changes
      if (!event.target.classList.contains("nav-active")) {
        navMenuDesktop
          .querySelector(".link-btn.nav-active")
          .classList.remove("nav-active");
        navMenuMobile
          .querySelector(".link-btn.nav-active")
          .classList.remove("nav-active");
        navMenuDesktop
          .querySelector(`a[href="${hashId}"]`)
          .classList.add("nav-active");
        navMenuMobile
          .querySelector(`a[href="${hashId}"]`)
          .classList.add("nav-active");
      }

      // Mobile Navigation UI Close
      if (navMenuMobile.classList.contains("nav-mobile-open")) {
        menuFadeOutEffect();
      }

      // Add tag id to URL
      window.location.hash = hashId;
    }
  }
});

// Mobile Navigation UI
(() => {
  navMenuBtn.addEventListener("click", () => {
    navMenuMobile.classList.add("nav-mobile-open");
  });

  closeNavMenuBtn.addEventListener("click", menuFadeOutEffect);
})();

// Hide all sections except active class section
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active-section")) {
      section.classList.add("hide-section");
    }
  });
})();

// Dark & Light Mode
modeBtn = document.querySelector(".mode-btn");

modeBtn.addEventListener("click", () => {
  modeBtn.querySelector("i").classList.toggle("fa-sun");
  modeBtn.querySelector("i").classList.toggle("fa-moon");
  document.body.classList.toggle("dark-mode");
  document.querySelector(".bg").classList.toggle("bg-effect-light");
  document.querySelector(".bg").classList.toggle("bg-effect-dark");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

(function storedThemeLoad() {
  if (localStorage.getItem("theme") !== null) {
    if (localStorage.getItem("theme") === "dark") {
      modeBtn.querySelector("i").classList.add("fa-sun");
      document.body.classList.add("dark-mode");
      document.querySelector(".bg").classList.remove("bg-effect-light");
      document.querySelector(".bg").classList.add("bg-effect-dark");
    } else {
      modeBtn.querySelector("i").classList.add("fa-moon");
      document.body.classList.remove("dark-mode");
      document.querySelector(".bg").classList.add("bg-effect-light");
      document.querySelector(".bg").classList.remove("bg-effect-dark");
    }
  }
})();

window.addEventListener("load", () => {
  // Preloader
  preloader.classList.add("preloader-fade");
  setInterval(() => preloader.classList.add("preloader-hide"), 1000);

  // Dark Mode Icon
  if (document.body.classList.contains("dark-mode")) {
    modeBtn.querySelector("i").classList.add("fa-sun");
  } else {
    modeBtn.querySelector("i").classList.add("fa-moon");
  }
});
