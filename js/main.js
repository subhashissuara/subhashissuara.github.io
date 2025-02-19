/*
	Author: Subhashis Suara
*/

// Global Variables
const sections = document.querySelectorAll(".section");
const navMenuBtn = document.querySelector(".menu-btn");
const modeBtn = document.querySelector(".mode-btn");
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

/*
  IIFEs
*/

// Detect Theme
(() => {
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

// Show Active Section
(() => {
  sections.forEach((section) => {
    if (!section.classList.contains("active-section")) {
      section.classList.add("hide-section");
    }
  });
})();

// OnLoad Events
window.addEventListener("load", () => {
  // Navigate from External Redirects
  changePage();

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

// OnPopState Events
window.addEventListener("popstate", () => {
  // Navigate Back & Forth from Website URL History
  changePage(false);
});

/*
  Named Functions
*/

// Function to Change Active Section
function changeActiveSection(hashId) {
  document
    .querySelector(".section.active-section")
    .classList.add("hide-section");
  document
    .querySelector(".section.active-section")
    .classList.remove("active-section");
  document.querySelector(hashId).classList.add("active-section");
  document.querySelector(hashId).classList.remove("hide-section");
}

// Function to Change Active Link
function changeActiveNavLink(hashId) {
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

// Function to Change Page
function changePage(resetContactForm = true) {
  hashId = window.location.hash;
  let IdValid = false;

  // Check if navigation id is valid
  for (let index = 0; index < hashIdList.length; index++) {
    if (window.location.hash === hashIdList[index]) {
      IdValid = true;
    }
  }

  // Navigate to home if id is blank or invalid
  if (!IdValid) {
    if (hashId !== "") {
      // Add home id to URL if id is invalid
      window.location.hash = "#home";
    }
    IdValid = true;
    hashId = "#home";
  }

  if (IdValid) {
    // Change Active Section
    changeActiveSection(hashId);

    // Change Active Navigation Link
    changeActiveNavLink(hashId);

    // Reset Contact Form after FormSpree Redirect
    if (hashId === "#contact" && resetContactForm) {
      document.querySelector(".contact-form form").reset();
    }
  }
}

// Mobile Navigation FadeOut Function
function menuFadeOutEffect() {
  navMenuMobile.classList.remove("nav-mobile-open");
  menuFadeOut.classList.add("effect-active");
  setTimeout(() => {
    menuFadeOut.classList.remove("effect-active");
  }, 300);
}

/*
  Website Navigation
*/

// Core Navigation
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-btn")) {
    // Ensure it is a anchor link
    if (event.target.hash !== "") {
      event.preventDefault();
      const hashId = event.target.hash;

      // Change Active Section
      changeActiveSection(hashId);

      // Change Active Navigation Link
      if (!event.target.classList.contains("nav-active")) {
        changeActiveNavLink(hashId);
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

/*
  Dark & Light Mode
*/

// Mode Button
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
