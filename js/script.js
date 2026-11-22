
// =====================================
// WEDDING INVITATION - JAVASCRIPT
// BHARATH & DEEPSHEKA
// =====================================

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
  ".detail-card, .event-card, .story-image, .gallery-grid img"
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
