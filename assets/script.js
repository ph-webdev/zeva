"use strict";

(function() {


// Smartphone navigation menu toggle

const spNavToggle = document.querySelector(".sp-nav-toggle");
const spNavMenu = document.querySelector(".sp-nav-menu");
spNavToggle.addEventListener("click", () => {
  spNavToggle.classList.toggle("active");
  spNavMenu.classList.toggle("active");
});

// Change homepage header styles when hero is out of view

const homepageHeader = document.querySelector(".homepage-header");
if (homepageHeader) {
  const hero = document.querySelector("#hero");
  const headerObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.9,
  }
  const headerObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      homepageHeader.classList.remove("fixed");
    } else {
      homepageHeader.classList.add("fixed");
    }
  }
  const headerObserver = new IntersectionObserver(headerObserverCallback, headerObserverOptions);
  headerObserver.observe(hero);
}

// Fade in content when coming into view

const animController = {
  elements: document.querySelectorAll(".anim-fade-in-up"),
  queue: [],
  ready: true,
  get cooldown() { return 250 / (this.queue.length+1); },
  handle() {
    if (!this.ready || this.queue.length === 0) { return; }
    const element = this.queue.shift();
    element.classList.add("ready");
    this.ready = false;
    setTimeout(() => {
      this.ready = true;
      this.handle();
    }, this.cooldown);
  },
};

const animObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};
const animObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("ready")) {
      animController.queue.push(entry.target);
    }
    animController.handle();
  });
}
const animObserver = new IntersectionObserver(animObserverCallback, animObserverOptions);
animController.elements.forEach((el) => animObserver.observe(el));


})();