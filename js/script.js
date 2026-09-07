/* =========================================================
   CONFIG
   ========================================================= */
const PASSWORD = "0822";
const REVEAL_WORDS = ["HAPPY", "BIRTHDAY", "LOVEYYY NAKOOO"];

// The full letter, split into cards. Text is kept exactly as
// written — do not "fix" spelling/grammar here.
//
// To add a photo to a section: put the image file in
// assets/images/ and give it a src below (e.g. "assets/images/01.jpg").
// Leave image as null to keep the placeholder block.
//
// "note" is optional — a short caption that shows up next to the
// photo with a little arrow pointing at it (works on the card AND
// on the expanded/lightbox view of the same photo). Leave it null
// if you don't want a note on that card.
const letterContent = [
  {
    image: null, // assets/images/01.jpg
    note: null,
    paragraphs: [
      "I know wakoy mahatag nga something expensive sa imoha this year and to be honest ba, I wished I could give you more jud hayss. But I wanted to make something nga gikan jud nako like something I could build with my own hands ba and fill with the things na di nako masulti tarung in person.",
      "So I made this little website for you lovelove."
    ]
  },
  {
    image: null, // assets/images/02.jpg
    note: null,
    paragraphs: [
      "It may not be perfect and it definitely isn't worth as much sa uban gifts na maihatag sa uban nimo, but every part of it was made with you in mind. Every word here is something I genuinely wanted you to have and remember."
    ]
  },
  {
    image: null, // assets/images/03.jpg
    note: null,
    paragraphs: [
      "You've become such a big part of my life, Love. We've been through happy moments(nga sge ka mangaway), stupid moments, misunderstandings, difficult days, and moments where we weren't sure how things would go. Pero tanawa for some reason, abut gihapun ta ani."
    ]
  },
  {
    image: null, // assets/images/04.jpg
    note: null,
    paragraphs: [
      "I don't want to pretend nga atoang relationship has always been perfect. Kay dijud siya perfect. We've both made mistakes, nay time gipang kapoy ta, and there were times when we struggled to understand each other. Pero despite tanan ana, daghan jud kayong moments na grateful kaayo kos imoha ."
    ]
  },
  {
    image: null, // assets/images/05.jpg
    note: null,
    paragraphs: [
      "I'm grateful for the laughs, the random conversations, the times I get to visit you, the moments with your family, the little things you do for me, and even the ordinary days that don't seem special until I realize that you're the person I got to spend them with."
    ]
  },
  {
    image: null, // assets/images/06.jpg
    note: null,
    paragraphs: [
      "And on your birthday, I don't just want to tell you that I love you.",
      "I want you to know that I see you as someone who is still growing, still figuring things out, still chasing things you want, and still becoming the person you're meant to be. I hope you never forget nga you deserve to be proud of yourself pud."
    ]
  },
  {
    image: null, // assets/images/07.jpg
    note: null,
    paragraphs: [
      `I hope nga kaning tuiga will brings you more peace, more happiness, more opportunities, and more moments where you can look at yourself and say, "I'm doing okay and nana koy Deym" hahaha`
    ]
  },
  {
    image: null, // assets/images/08.jpg
    note: null,
    paragraphs: [
      "And whatever happens in the future, I hope you remember that there was someone who genuinely wanted to see you happy, who was proud of you, who believed in you, and who loved all the little things that made you you."
    ]
  },
  {
    image: null, // assets/images/09.jpg
    note: null,
    paragraphs: [
      "Happy motmot and birthday, lovelove nako.",
      "I may not have much na mahatag nako nimo karun, but I gave you something nga kaya nako buhaton",
      "my time, my effort, my creativity, and my heart hehe just like this song, I like Me Better when I'm With you."
    ]
  },
  {
    image: null, // assets/images/10.jpg
    note: null,
    paragraphs: [
      "I hope you like it.",
      "I love you always mwa mwa mwa 😘"
    ]
  }
];

/* =========================================================
   SCREEN HELPERS
   ========================================================= */
const screens = {
  lock: document.getElementById("lock-screen"),
  reveal: document.getElementById("reveal-screen"),
  intro: document.getElementById("intro-screen"),
  letter: document.getElementById("letter-screen"),
  closing: document.getElementById("closing-screen"),
};

function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.remove("active"));
  screens[name].classList.add("active");
}

/* =========================================================
   SCREEN 1 — PASSWORD NUMPAD
   ========================================================= */
const pinDots = [...document.querySelectorAll("#pinDots .dot")];
const lockCard = document.querySelector(".lock-card");
const lockError = document.getElementById("lockError");
let entered = "";

function renderPin() {
  pinDots.forEach((dot, i) => dot.classList.toggle("filled", i < entered.length));
}

function wrongPassword() {
  lockError.classList.add("visible");
  lockCard.classList.add("shake");
  setTimeout(() => lockCard.classList.remove("shake"), 450);
  setTimeout(() => {
    entered = "";
    renderPin();
  }, 350);
}

function checkPassword() {
  if (entered === PASSWORD) {
    unlock();
  } else {
    wrongPassword();
  }
}

document.getElementById("numpad").addEventListener("click", (e) => {
  const btn = e.target.closest(".num-btn");
  if (!btn) return;

  if (btn.id === "clearBtn") {
    entered = "";
    lockError.classList.remove("visible");
    renderPin();
    return;
  }
  if (btn.id === "backBtn") {
    entered = entered.slice(0, -1);
    renderPin();
    return;
  }
  if (entered.length >= 4) return;

  lockError.classList.remove("visible");
  entered += btn.dataset.num;
  renderPin();

  if (entered.length === 4) {
    setTimeout(checkPassword, 150);
  }
});

/* =========================================================
   SCREEN 2 — UNLOCK -> MUSIC + WORD REVEAL -> BLUE CURTAIN
   ========================================================= */
const bgMusic = document.getElementById("bgMusic");
const revealWordEl = document.getElementById("revealWord");
const blueCurtain = document.getElementById("blueCurtain");

function unlock() {
  showScreen("reveal");

  // user gesture (the 4th numpad tap) makes this autoplay-safe
  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => {
    /* if the browser still blocks it, she can tap anywhere to retry */
    document.body.addEventListener("click", () => bgMusic.play(), { once: true });
  });

  playWordSequence();
}

function playWordSequence(i = 0) {
  if (i >= REVEAL_WORDS.length) {
    riseCurtain();
    return;
  }
  revealWordEl.textContent = REVEAL_WORDS[i];
  requestAnimationFrame(() => revealWordEl.classList.add("show"));

  setTimeout(() => {
    revealWordEl.classList.remove("show");
    setTimeout(() => playWordSequence(i + 1), 500);
  }, 1300);
}

function riseCurtain() {
  setTimeout(() => {
    blueCurtain.classList.add("rise");
    // once the curtain fully covers the screen, swap what's underneath
    setTimeout(() => {
      showScreen("intro");
      // let the intro screen settle in, then let the curtain fall away
      setTimeout(() => {
        blueCurtain.classList.remove("rise");
      }, 250);
    }, 1150);
  }, 400);
}

/* =========================================================
   SCREEN 3 — INTRO -> LETTER
   ========================================================= */
document.getElementById("introCta").addEventListener("click", () => {
  showScreen("letter");
  renderCard();
});

/* =========================================================
   NOTE CALLOUT — caption + arrow pointing at whatever photo
   is currently visible (card photo or the expanded lightbox one)
   ========================================================= */
const noteCallout = document.getElementById("noteCallout");
const noteTextEl = document.getElementById("noteText");

function positionNoteCallout(targetEl, text) {
  if (!text || !targetEl) {
    hideNoteCallout();
    return;
  }

  noteTextEl.textContent = text;

  // measure the callout's real rendered size first (off-screen)
  noteCallout.style.transition = "none";
  noteCallout.classList.add("visible");
  const calloutRect = noteCallout.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  // the dashed arrow's tip sits ~93px in from the svg's right edge
  // and ~22px up from its bottom edge (see the note-arrow path) —
  // since the svg is flush right/bottom of the callout, that gives
  // us the tip's offset from the callout's own top-left corner.
  const tipOffsetX = calloutRect.width - 93;
  const tipOffsetY = calloutRect.height - 22;

  let left = targetRect.left + 16 - tipOffsetX;
  let top = targetRect.top + 12 - tipOffsetY;

  left = Math.max(10, Math.min(left, window.innerWidth - calloutRect.width - 10));
  top = Math.max(10, top);

  noteCallout.style.left = `${left}px`;
  noteCallout.style.top = `${top}px`;

  // re-enable the fade transition on the next frame
  requestAnimationFrame(() => {
    noteCallout.style.transition = "";
  });
}

function hideNoteCallout() {
  noteCallout.classList.remove("visible");
}

function refreshNoteForCurrentCard() {
  const data = letterContent[currentCard];
  const cardImageEl = cardEls[currentCard]?.querySelector(".card-image");
  if (data && data.note) {
    positionNoteCallout(cardImageEl, data.note);
  } else {
    hideNoteCallout();
  }
}

/* =========================================================
   LIGHTBOX — tap a photo to expand it
   ========================================================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(src, note) {
  lightboxImg.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  // wait a frame so the image has laid out before we measure it
  requestAnimationFrame(() => positionNoteCallout(lightboxImg, note));
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  refreshNoteForCurrentCard();
}

lightbox.addEventListener("click", closeLightbox);

/* =========================================================
   SCREEN 4 — SWIPEABLE LETTER CARDS
   ========================================================= */
const cardStage = document.getElementById("cardStage");
const progressLabel = document.getElementById("progressLabel");
const progressDotsEl = document.getElementById("progressDots");
let currentCard = 0;

// build the progress dots once
letterContent.forEach(() => {
  const d = document.createElement("span");
  d.className = "p-dot";
  progressDotsEl.appendChild(d);
});
const progressDotEls = [...progressDotsEl.children];

function buildCardEl(data, index) {
  const card = document.createElement("div");
  card.className = "letter-card";
  card.dataset.index = index;

  const imgWrap = document.createElement("div");
  imgWrap.className = "card-image";
  if (data.image) {
    const img = document.createElement("img");
    img.src = data.image;
    img.alt = "";
    imgWrap.appendChild(img);
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "card-image-placeholder-text";
    placeholder.textContent = "photo goes here";
    imgWrap.appendChild(placeholder);
  }

  const textWrap = document.createElement("div");
  textWrap.className = "card-text";
  data.paragraphs.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    textWrap.appendChild(p);
  });

  card.appendChild(imgWrap);
  card.appendChild(textWrap);
  return card;
}

// build the whole stack once — cards stay in the DOM the whole time,
// only their data-depth attribute changes, so the peeking-stack
// transitions animate smoothly instead of popping in and out.
const cardEls = letterContent.map((data, i) => {
  const el = buildCardEl(data, i);
  cardStage.appendChild(el);
  return el;
});

function depthAttr(diff) {
  if (diff < 0) return "passed";
  if (diff === 0) return "0";
  if (diff === 1) return "1";
  if (diff === 2) return "2";
  return "back";
}

function updateStack() {
  cardEls.forEach((el, i) => {
    el.dataset.depth = depthAttr(i - currentCard);
  });
  progressLabel.textContent = `${currentCard + 1} / ${letterContent.length}`;
  progressDotEls.forEach((d, i) => d.classList.toggle("active", i === currentCard));

  // reposition the note right away, then again once the card's
  // slide-into-place transition (0.4s) has finished settling
  refreshNoteForCurrentCard();
  setTimeout(refreshNoteForCurrentCard, 420);
}

function renderCard() {
  updateStack();
}

function goToCard(delta) {
  const next = currentCard + delta;
  if (next < 0) return;
  if (next >= letterContent.length) {
    showScreen("closing");
    startHearts();
    return;
  }
  currentCard = next;
  updateStack();
}

/* ---------------------------------------------------------
   swipe / tap handling — only the top card (depth 0) receives
   pointer events, so this always drags the currently active card.
   Uses pointer capture + a tap-vs-swipe split with no dead zone,
   so quick, small taps on mobile always register as *something*
   (either "open the photo" or "go to the next/prev card").
   --------------------------------------------------------- */
let dragStartX = null;
let dragging = false;
let activeFrontEl = null;
let dragPointerId = null;

const SWIPE_THRESHOLD = 40;
const TAP_THRESHOLD = 10;

cardStage.addEventListener("pointerdown", (e) => {
  const front = e.target.closest('.letter-card[data-depth="0"]');
  if (!front) return;
  dragStartX = e.clientX;
  dragging = true;
  activeFrontEl = front;
  dragPointerId = e.pointerId;
  activeFrontEl.classList.add("dragging");
  if (activeFrontEl.setPointerCapture) {
    try { activeFrontEl.setPointerCapture(e.pointerId); } catch (err) { /* no-op */ }
  }
});

cardStage.addEventListener("pointermove", (e) => {
  if (!dragging || !activeFrontEl || e.pointerId !== dragPointerId) return;
  const deltaX = e.clientX - dragStartX;
  activeFrontEl.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 24}deg)`;
});

function endDrag(e, commit) {
  if (!dragging || dragStartX === null || e.pointerId !== dragPointerId) return;
  dragging = false;
  const deltaX = e.clientX - dragStartX;
  const el = activeFrontEl;
  activeFrontEl = null;
  dragPointerId = null;

  if (el) {
    el.classList.remove("dragging");
    el.style.transform = "";
  }

  if (!commit) {
    dragStartX = null;
    return;
  }

  const isTap = Math.abs(deltaX) < TAP_THRESHOLD;

  if (isTap) {
    const imgTarget = e.target.closest(".card-image");
    const imgEl = imgTarget ? imgTarget.querySelector("img") : null;
    if (imgEl) {
      openLightbox(imgEl.src, letterContent[currentCard].note);
      dragStartX = null;
      return;
    }
  }

  if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
    goToCard(deltaX < 0 ? 1 : -1);
  } else {
    // small/ambiguous movement that wasn't on the photo — treat it as
    // a tap-to-advance: right side of the card = next, left = back
    const rect = cardStage.getBoundingClientRect();
    const tapX = e.clientX - rect.left;
    goToCard(tapX > rect.width * 0.3 ? 1 : -1);
  }
  dragStartX = null;
}

cardStage.addEventListener("pointerup", (e) => endDrag(e, true));
cardStage.addEventListener("pointercancel", (e) => endDrag(e, false));

/* =========================================================
   SCREEN 5 — CLOSING HEARTS + REPLAY
   ========================================================= */
const heartsLayer = document.getElementById("heartsLayer");
let heartsTimer = null;

function startHearts() {
  stopHearts();
  heartsTimer = setInterval(spawnHeart, 550);
}

function stopHearts() {
  if (heartsTimer) clearInterval(heartsTimer);
  heartsTimer = null;
}

function spawnHeart() {
  const heart = document.createElement("span");
  heart.className = "heart-particle";
  heart.textContent = Math.random() > 0.5 ? "🤍" : "❤️";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
  const duration = 5 + Math.random() * 3;
  heart.style.animationDuration = `${duration}s`;
  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

document.getElementById("replayBtn").addEventListener("click", () => {
  stopHearts();
  currentCard = 0;
  showScreen("letter");
  renderCard();
});

// set initial stack depths so cards are positioned correctly
// even before the letter screen is first shown
updateStack();
