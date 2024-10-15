"use strict";

gsap.registerPlugin(MotionPathPlugin);

class Integrations {
  constructor() {
    this.container = document.querySelector(".integrations");
    this.svg = this.container.querySelector(".integrations__svg");
    this.lines = this.svg.querySelectorAll(".g-lines path");
    this.placeholders = this.svg.querySelectorAll(".g-placeholders rect");
    this.linearGradients = this.svg.querySelectorAll(".g-linear rect");
    this.windowWidth = window.innerWidth;
    this.tlLeft = null;
    this.tlMiddleLeft = null;
    this.tlMiddleRight = null;
    this.tlRight = null;

    this.init(); // Only for debug
  }

  setImagePosition() {
    this.placeholders.forEach((p) => {
      const img = this.container.querySelector(
        `.integrations__img[data-img='${p.getAttribute("data-img")}']`
      );
      const top =
        Math.abs(this.getRect(p).top - this.getRect(this.container).top) + "px";
      const left =
        Math.abs(this.getRect(p).left - this.getRect(this.container).left) +
        "px";
      const w = this.getRect(p).width + "px";
      const h = this.getRect(p).height + "px";

      if (p.getAttribute("data-img") === "dark-tear") {
        const darkTears = document.querySelectorAll(
          "[data-moving-block='dark-tear']"
        );

        darkTears.forEach((t) => {
          t.style.width = w;
          t.style.height = h;
        });
      } else {
        img.style.top = top;
        img.style.left = left;
        img.style.width = w;
        img.style.height = h;
      }
    });
  }

  animateDarkTearMiddleRight() {
    if (this.tlMiddleRight) this.tlMiddleRight.kill();

    this.tlMiddleRight = gsap.timeline({
      repeat: -1,
    });

    this.tlMiddleRight
    .to(
      ".tear-middle-right",
      {
        duration: 2.5,
        ease: "linear",
        motionPath: {
          path: ".line-middle-right",
          align: ".line-middle-right",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
      },
    )
      .fromTo(
        ".tear-middle-right",
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, ease: "sine.out" }, 0
      )
      .fromTo(
        ".tear-middle-right",
        { scaleY: 1 },
        { scaleY: 0, ease: "sine.in" },
        "-=0.5"
      );
  }

  animateDarkTearMiddleLeft() {
    if (this.tlMiddleLeft) this.tlMiddleLeft.kill();

    this.tlMiddleLeft = gsap.timeline({
      repeat: -1,
    });

    this.tlMiddleLeft
    .to(
      ".tear-middle-left",
      {
        duration: 3.7,
        ease: "linear",
        motionPath: {
          path: ".line-middle-left",
          align: ".line-middle-left",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
      },
    )
      .fromTo(
        ".tear-middle-left",
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, ease: "sine.out" }, 0
      )
      .fromTo(
        ".tear-middle-left",
        { scaleY: 1 },
        { scaleY: 0, ease: "sine.in" },
        "-=0.4"
      );
  }

  animateDarkTearLeft() {
    if (this.tlLeft) this.tlLeft.kill();

    this.tlLeft = gsap.timeline({
      repeat: -1,
    });

    this.tlLeft
    .to(
      ".tear-left",
      {
        duration: 1.8,
        ease: "linear",
        motionPath: {
          path: ".line-left",
          align: ".line-left",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
      },
    )
      .fromTo(
        ".tear-left",
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, ease: "sine.out" }, 0
      )
      .fromTo(
        ".tear-left",
        { scaleY: 1 },
        { scaleY: 0, ease: "sine.in" },
        "-=0.4"
      );
  }

  animateDarkTearRight() {
    if (this.tlRight) this.tlRight.kill();

    this.tlRight = gsap.timeline({
      repeat: -1,
      delay: 0.4,
    });

    this.tlRight
      .to(".tear-right", {
        duration: 4,
        ease: "linear",
        motionPath: {
          path: ".line-right",
          align: ".line-right",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
      })
      .fromTo(
        ".tear-right",
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, ease: "sine.out" },
        0
      )
      .fromTo(
        ".tear-right",
        { scaleY: 1 },
        { scaleY: 0, ease: "sine.in" },
        "-=0.5"
      );
  }

  animateDarkTears() {
    this.animateDarkTearLeft();
    this.animateDarkTearMiddleLeft();
    this.animateDarkTearMiddleRight();
    this.animateDarkTearRight();
  }

  getRect(el) {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      bottom: rect.bottom + window.scrollY,
      right: rect.right + window.scrollX,
      width: rect.width,
      height: rect.height,
    };
  }

  onResize() {
    window.addEventListener("resize", () => {
      if (this.windowWidth !== window.innerWidth) {
        this.windowWidth = window.innerWidth;
        this.setImagePosition();
        this.setLinearGradient();
        this.animateDarkTears();
      }
    });
  }

  setLinearGradient() {
    this.linearGradients.forEach((l) => {
      const gradient = this.container.querySelector(
        `.integrations__linear [data-linear='${l.getAttribute("data-linear")}']`
      );
      let top = null;

      if (l.getAttribute("data-linear") === "top") {
        top =
          Math.abs(this.getRect(l).top - this.getRect(this.container).top) -
          5 +
          "px";
      } else {
        top =
          Math.abs(this.getRect(l).top - this.getRect(this.container).top) +
          "px";
      }

      const left =
        Math.abs(this.getRect(l).left - this.getRect(this.container).left) +
        "px";
      const w = this.getRect(l).width + "px";
      const h = this.getRect(l).height + "px";

      gradient.style.top = top;
      gradient.style.left = left;
      gradient.style.width = w;
      gradient.style.height = h;
    });
  }

  onReady() {
    this.container.classList.add("ready");
  }

  init() {
    this.setImagePosition();
    this.setLinearGradient();
    this.animateDarkTears();
    this.onResize();
    this.onReady();
  }
}

new Integrations();
