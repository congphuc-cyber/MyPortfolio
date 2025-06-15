'use strict';

/** element toggle function */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

/** header sticky & go to top*/

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

/** navbar toggle*/

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});

/** skills toggle*/

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}

/** dark & light theme toggle*/

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/** check & apply last time selected theme from localStorage*/

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

const tabButtons = document.querySelectorAll('.about-tab-btn');
const tabContents = document.querySelectorAll('.about-tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');

    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    tabContents.forEach(c => {
      c.style.display = (c.id === tab) ? 'block' : 'none';
    });
  });
});

/**after input form*/

  const form = document.querySelector(".contact-form");
  const popup = document.getElementById("form-popup");
  const closeBtn = document.getElementById("popup-close");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    popup.classList.remove("hidden");

    if (document.body.classList.contains("dark_theme")) {
      popup.classList.add("dark_theme");
    } else {
      popup.classList.remove("dark_theme");
    }

    form.reset();
    setTimeout(() => {
      popup.classList.add("hidden");
    }, 4000);
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });


/**update information */

const editBtn = document.getElementById("edit-toggle");
let isEditing = false;

editBtn.addEventListener("click", () => {
  isEditing = !isEditing;

  const editableElements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, a, p, span, li, label, .tag, .project-date, .project-title, .project-desc"
  );

  editableElements.forEach(el => {
    if (el.querySelector("ion-icon")) return; 
    el.setAttribute("contenteditable", isEditing);
    el.style.outline = isEditing ? "1px dashed var(--accent)" : "none";
    el.style.cursor = isEditing ? "text" : "";
  });

  editBtn.innerHTML = isEditing
    ? '<ion-icon name="checkmark-done-outline"></ion-icon>'
    : '<ion-icon name="create-outline"></ion-icon>';

  if (isEditing) {
    showPopup("Bắt đầu chỉnh sửa");
  } else {
    saveData();
    showPopup("Đã lưu thông tin!");
  }
});

/**import data localStorage */

function saveData() {
  const data = {};
  const editableElements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, a, p, span, li, label, .tag, .project-date, .project-title, .project-desc"
  );

  editableElements.forEach((el, index) => {
    if (el.querySelector("ion-icon")) return;
    data[`element-${index}`] = el.innerHTML;
  });

  localStorage.setItem("portfolioContent", JSON.stringify(data));
}

function loadData() {
  const savedData = JSON.parse(localStorage.getItem("portfolioContent"));

  if (savedData) {
    const editableElements = document.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, a, p, span, li, label, .tag, .project-date, .project-title, .project-desc"
    );

    editableElements.forEach((el, index) => {
      if (el.querySelector("ion-icon")) return;
      const content = savedData[`element-${index}`];
      if (content !== undefined) {
        el.innerHTML = content;
      }
    });
  }
}

/**display pop-up */

function showPopup(message = "Đã lưu!") {
  const toast = document.getElementById("popup-toast");
  const textSpan = toast.querySelector("span");
  textSpan.textContent = message;
  textSpan.style.paddingLeft = "3px"; 
  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 4000);
}

/**access loadData */

window.addEventListener("DOMContentLoaded", () => {
  loadData();
});

/** effect */

const canvas = document.getElementById("sky-effect");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let stars = [], bubbles = [];

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  init();
});

// DARK MODE: 
function createStars() {
  stars = [];
  for (let i = 0; i < 500; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.5 + 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.03
    });
  }
}

// LIGHT MODE: 
function createBubbles() {
  bubbles = [];
  for (let i = 0; i < 50; i++) {
    bubbles.push({
      x: Math.random() * w,
      y: h + Math.random() * 200,
      r: 8 + Math.random() * 12,
      speed: 0.5 + Math.random(),
      alpha: 0.2 + Math.random() * 0.3
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  const isDark = document.body.classList.contains("dark_theme");

  if (isDark) {
    // Dark mode 
    stars.forEach(s => {
      s.phase += s.speed;
      const opacity = s.baseAlpha + Math.sin(s.phase) * 0.5;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    });
  } else {
    // Light mode 
    bubbles.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
      ctx.fill();

      b.y -= b.speed;
      if (b.y < -50) {
        b.y = h + Math.random() * 100;
        b.x = Math.random() * w;
      }
    });
  }
  requestAnimationFrame(draw);
}
function init() {
  createStars();
  createBubbles();
}
init();
draw();
