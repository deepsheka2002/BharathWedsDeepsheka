
// =====================================
// WEDDING INVITATION - JAVASCRIPT
// BHARATH & DEEPSHEKA
// =====================================

// 0. ENVELOPE OPENING ANIMATION
const envelopeOpening = document.getElementById("envelopeOpening");
const openInvitation = document.getElementById("openInvitation");
const invitationEnvelope = document.getElementById("invitationEnvelope");
const floatingPetals = document.getElementById("floatingPetals");
let invitationOpened = false;

document.body.classList.add("envelope-active");

function createOpeningPetals() {
  if (!floatingPetals) return;

  for (let index = 0; index < 28; index += 1) {
    const petal = document.createElement("span");
    petal.className = index % 5 === 0 ? "petal petal-gold" : "petal";
    petal.style.setProperty("--petal-left", `${Math.random() * 100}%`);
    petal.style.setProperty("--petal-delay", `${Math.random() * 1.8}s`);
    petal.style.setProperty("--petal-duration", `${3.2 + Math.random() * 2.8}s`);
    petal.style.setProperty("--petal-drift", `${-90 + Math.random() * 180}px`);
    floatingPetals.appendChild(petal);
  }
}

createOpeningPetals();

function openWeddingInvitation() {
  if (invitationOpened) return;
  invitationOpened = true;

  invitationEnvelope.classList.add("opening");
  openInvitation.classList.add("hidden");

  window.setTimeout(function () {
    envelopeOpening.classList.add("opened");
  }, 2100);

  window.setTimeout(function () {
    envelopeOpening.setAttribute("aria-hidden", "true");
    document.body.classList.remove("envelope-active");
    goToSlideFromHash("#home");
    window.history.replaceState(null, "", "#home");
  }, 2900);
}

openInvitation.addEventListener("click", openWeddingInvitation);

window.setTimeout(openWeddingInvitation, 4500);

// 1. WEDDING COUNTDOWN TIMER
// Engagement: 10 March 2027
// Wedding: 11 March 2027
// Format: YYYY-MM-DDTHH:MM:SS

const weddingDate = new Date("2027-03-11T10:30:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const messageElement = document.getElementById("countdown-message");

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    messageElement.textContent = "Today is the beginning of forever! ♥";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");

  messageElement.textContent = "Every second brings us closer to forever!";
}

updateCountdown();
setInterval(updateCountdown, 1000);


// 2. WEDDING MUSIC TOGGLE
// Add your own music file at assets/music/wedding-music.mp3.
// Music will only play after the visitor clicks the button.

const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", async function () {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add("playing");
      musicToggle.setAttribute("aria-pressed", "true");
      musicToggle.setAttribute("aria-label", "Pause wedding music");
      musicToggle.title = "Pause wedding music";
      musicToggle.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } catch (error) {
      musicToggle.title = "Please add your music file";
      alert("Please add wedding-music.mp3 to the assets/music folder.");
    }
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Play wedding music");
    musicToggle.title = "Play wedding music";
    musicToggle.innerHTML = '<i class="bi bi-music-note-beamed"></i>';
  }
});


// 4. CLOSE MOBILE NAVIGATION AFTER CLICKING A LINK

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.getElementById("mainNav");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (
      window.innerWidth < 992 &&
      navbarCollapse.classList.contains("show")
    ) {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  });
});


// 5. REVEAL SECTIONS WHEN THEY ENTER THE VIEWPORT

const revealElements = document.querySelectorAll(
  ".section-padding > .container, .countdown-section > .container, .footer-section > .container, " +
  ".detail-card, .event-card, .story-image, .gallery-grid img"
);

const slideViewport = document.getElementById("slideViewport");
const slideTrack = document.getElementById("slideTrack");
const slideHintText = document.getElementById("slideHintText");
const slides = Array.from(slideTrack.children);
const slideTransitionEffects = ["push", "dissolve", "wipe", "push", "cover", "fade", "dissolve", "wipe", "cover"];
let activeSlideIndex = 0;
let slideGestureStart = null;
let slideGestureLocked = false;
let hasInitializedSlides = false;

function goToSlide(index) {
  const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
  if (nextIndex === activeSlideIndex && hasInitializedSlides) return;

  slides.forEach(function (slide) {
    slide.classList.remove(
      "slide-transition-fade",
      "slide-transition-dissolve",
      "slide-transition-wipe",
      "slide-transition-push",
      "slide-transition-cover"
    );
  });

  if (hasInitializedSlides) {
    slides[nextIndex].classList.add(`slide-transition-${slideTransitionEffects[nextIndex]}`);
  }

  activeSlideIndex = nextIndex;
  slideTrack.style.transform = `translate3d(-${activeSlideIndex * 100}vw, 0, 0)`;
  slideHintText.textContent = activeSlideIndex === slides.length - 1
    ? "Swipe to go back"
    : "Tap or swipe to continue";

  slides.forEach(function (slide, slideIndex) {
    const inactive = slideIndex !== activeSlideIndex;
    slide.classList.toggle("slide-active", !inactive);
    slide.setAttribute("aria-hidden", String(inactive));
    slide.inert = inactive;
  });
  hasInitializedSlides = true;
}

function goToSlideFromHash(hash) {
  const targetId = hash.replace(/^#/, "");
  const targetIndex = slides.findIndex(function (slide) {
    return slide.id === targetId;
  });

  if (targetIndex !== -1) {
    goToSlide(targetIndex);
    return true;
  }
  return false;
}

if (!goToSlideFromHash(window.location.hash)) {
  goToSlide(0);
}

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetHash = link.getAttribute("href");
    if (targetHash && goToSlideFromHash(targetHash)) {
      event.preventDefault();
      window.history.replaceState(null, "", targetHash);
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return;

  if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown") {
    event.preventDefault();
    goToSlide(activeSlideIndex + 1);
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    goToSlide(activeSlideIndex - 1);
  }
});

slideViewport.addEventListener(
  "wheel",
  function (event) {
    if (Math.abs(event.deltaY) < 24 && Math.abs(event.deltaX) < 24) return;

    const scrollableSlide = event.target.closest(".slide-scrollable");
    if (
      scrollableSlide &&
      Math.abs(event.deltaY) > Math.abs(event.deltaX) &&
      scrollableSlide.scrollHeight > scrollableSlide.clientHeight
    ) {
      const atTop = scrollableSlide.scrollTop <= 0;
      const atBottom =
        scrollableSlide.scrollTop + scrollableSlide.clientHeight >=
        scrollableSlide.scrollHeight - 1;
      if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) return;
    }

    event.preventDefault();
    if (slideGestureLocked) return;

    slideGestureLocked = true;
    const direction = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;
    goToSlide(activeSlideIndex + (direction > 0 ? 1 : -1));
    window.setTimeout(function () {
      slideGestureLocked = false;
    }, 850);
  },
  { passive: false }
);

slideViewport.addEventListener(
  "touchstart",
  function (event) {
    const touch = event.changedTouches[0];
    slideGestureStart = {
      x: touch.clientX,
      y: touch.clientY,
      target: event.target
    };
  },
  { passive: true }
);

slideViewport.addEventListener(
  "touchend",
  function (event) {
    if (!slideGestureStart) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - slideGestureStart.x;
    const deltaY = touch.clientY - slideGestureStart.y;
    const startTarget = slideGestureStart.target;
    slideGestureStart = null;

    if (Math.abs(deltaX) >= 55 && Math.abs(deltaX) > Math.abs(deltaY)) {
      goToSlide(activeSlideIndex + (deltaX < 0 ? 1 : -1));
      return;
    }

    if (Math.abs(deltaX) > 18 || Math.abs(deltaY) > 18) return;
    if (startTarget instanceof Element && startTarget.closest("a, button, input, select, textarea, iframe")) {
      return;
    }

    goToSlide(activeSlideIndex + 1);
  },
  { passive: true }
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (element) {
    element.classList.add("reveal");
    observer.observe(element);
  });
}
