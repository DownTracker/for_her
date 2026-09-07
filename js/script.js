/* =========================================================
   CONFIG
   ========================================================= */
const PASSWORD = "0822";
const REVEAL_WORDS = ["HAPPY", "BIRTHDAY", "LOVEYYY NAKOOO"];

// The full letter, split into cards. Text is kept exactly as
// written — do not "fix" spelling/grammar here.
//
// To add a photo to a section: put the image file in
// assets/images/ and give it a src below — it MUST be in quotes,
// e.g. image: "assets/images/01.jpg" (without the quotes, that line
// crashes the whole script and every button on the page stops
// working). Leave image as null to keep the placeholder block.
//
// "note" is a short caption that shows up next to the photo with a
// little arrow pointing at it (works on the card AND on the
// expanded/lightbox view of the same photo). Change the text or
// set it to null if you don't want a note on that card.
const letterContent = [
  {
    image: "assets/images/01.jpg",
    note: "(click ang photo) Imohang first favorite picture nato duha love",
    paragraphs: [
      "I know wakoy mahatag nga something expensive sa imoha this year and to be honest ba, I wished I could give you more jud hayss. But I wanted to make something nga gikan jud nako like something I could build with my own hands ba and fill with the things na di nako masulti tarung in person.",
      "So I made this little website for you lovelove.",
      "Pwede raka mo click sa mga pictures para mo daks ha?"
    ]
  },
  {
    image: "assets/images/02.jpeg",
    note: "Sa panahong lowkey pa buhay natin tiil ray picturan",
    paragraphs: [
      "It may not be perfect and it definitely isn't worth as much sa uban gifts na maihatag sa uban nimo, but every part of it was made with you in mind. Every word here is something I genuinely wanted you to have and remember."
    ]
  },
  {
    image: "assets/images/03.jpg",
    note: "Seawall momintz pa sila dugay pajd manguli hahaha",
    paragraphs: [
      "You've become such a big part of my life, Love. We've been through happy moments(nga sge ka mangaway), stupid moments, misunderstandings, difficult days, and moments where we weren't sure how things would go. Pero tanawa for some reason, abut gihapun ta ani."
    ]
  },
  {
    image: "assets/images/04.jpeg",
    note: "First anhi nimos amoa balay lovey hehe",
    paragraphs: [
      "I don't want to pretend nga atoang relationship has always been perfect. Kay dijud siya perfect. We've both made mistakes, nay time gipang kapoy ta, and there were times when we struggled to understand each other. Pero despite tanan ana, daghan jud kayong moments na grateful kaayo kos imoha ."
    ]
  },
  {
    image: "assets/images/05.jpg",
    note: "First ano natin dalawa wuy HAHAHAHA",
    paragraphs: [
      "I'm grateful for the laughs, the random conversations, the times I get to visit you, the moments with your family, the little things you do for me, and even the ordinary days that don't seem special until I realize that you're the person I got to spend them with."
    ]
  },
  {
    image: "assets/images/06.jpg",
    note: "Natutulog yung cute nga dragon hehe gwapa jud nimo",
    paragraphs: [
      "And on your birthday, I don't just want to tell you that I love you.",
      "I want you to know that I see you as someone who is still growing, still figuring things out, still chasing things you want, and still becoming the person you're meant to be. I hope you never forget nga you deserve to be proud of yourself pud."
    ]
  },
  {
    image: "assets/images/07.png",
    note: "haysss dini dapat pahilakun akoang cutie nga baby",
    paragraphs: [
      `I hope nga kaning tuiga will brings you more peace, more happiness, more opportunities, and more moments where you can look at yourself and say, "I'm doing okay and nana koy Deym" hahaha`
    ]
  },
  {
    image: "assets/images/08.jpg",
    note: "fyi excited kayo ko mo skwela sauna kay makita tika pirme kada flag nato",
    paragraphs: [
      "And whatever happens in the future, I hope you remember that there was someone who genuinely wanted to see you happy, who was proud of you, who believed in you, and who loved all the little things that made you you."
    ]
  },
  {
    image: "assets/images/09.jpg",
    note: "first night date natin dalawa",
    paragraphs: [
      "Happy motmot and birthday, lovelove nako.",
      "I may not have much na mahatag nako nimo karun, but I gave you something nga kaya nako buhaton",
      "my time, my effort, my creativity, and my heart hehe just like this song, I like Me Better when I'm With you."
    ]
  },
  {
    image: "assets/images/10.jpg",
    note: "I will always try my best palipayun ka love",
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

  if (name === "letter") {
    // wait a frame so the now-visible cards have a real layout to measure
    requestAnimationFrame(refreshNoteForCurrentCard);
  } else if (typeof hideNoteCallout === "function") {
    hideNoteCallout();
  }
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

// remember the music's normal volume so fades can ramp back up to it
const BASE_VOLUME = 1;
bgMusic.volume = BASE_VOLUME;
let fadeInterval = null;

function fadeAudioOut(durationMs = 1500) {
  if (fadeInterval) clearInterval(fadeInterval);
  const steps = 30;
  const stepTime = durationMs / steps;
  const startVolume = bgMusic.volume;
  let step = 0;
  fadeInterval = setInterval(() => {
    step += 1;
    const t = step / steps;
    bgMusic.volume = Math.max(0, startVolume * (1 - t));
    if (step >= steps) {
      clearInterval(fadeInterval);
      fadeInterval = null;
      bgMusic.pause();
    }
  }, stepTime);
}

function resetAudioForReplay() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
  bgMusic.volume = BASE_VOLUME;
  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => {});
}

function unlock() {
  showScreen("reveal");

  // user gesture (the 4th numpad tap) makes this autoplay-safe
  bgMusic.volume = BASE_VOLUME;
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
    // once the curtain has fully faded in over the screen, swap
    // what's underneath, then let the curtain fade back out
    setTimeout(() => {
      showScreen("intro");
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

  noteCallout.style.transition = "none";
  noteCallout.classList.add("visible");

  // place the callout at the top-left corner first so the arrow
  // image's on-screen position tells us exactly how far its tip
  // sits from the callout's own top-left corner
  noteCallout.style.left = "0px";
  noteCallout.style.top = "0px";

  const arrowEl = noteCallout.querySelector(".note-arrow");
  const arrowRect = arrowEl.getBoundingClientRect();

  // the arrowhead in note-arrow.png sits near the right edge of the
  // image, a little past its vertical middle
  const tipOffsetX = arrowRect.left + arrowRect.width * 0.98;
  const tipOffsetY = arrowRect.top + arrowRect.height * 0.82;

  const targetRect = targetEl.getBoundingClientRect();
  // pushed further down/right from the photo's top-left corner so the
  // whole callout sits lower and the arrow actually lands ON the
  // photo instead of stopping short above it
  const desiredTipX = targetRect.left + 20;
  const desiredTipY = targetRect.top + 25;

  const calloutRect = noteCallout.getBoundingClientRect();
  let left = desiredTipX - tipOffsetX;
  let top = desiredTipY - tipOffsetY;

  left = Math.max(10, Math.min(left, window.innerWidth - calloutRect.width - 10));
  top = Math.max(10, Math.min(top, window.innerHeight - calloutRect.height - 10));

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
  // never show the note unless we're actually on the letter screen —
  // otherwise it measures a hidden (display:none) card and flies
  // off to the top-left corner of the page
  if (!screens.letter.classList.contains("active")) {
    hideNoteCallout();
    return;
  }
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
    // fade the music out as she leaves the letter for the closing
    // screen, so it doesn't fight with the anniversary video's audio
    fadeAudioOut();
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
let dragStartImgTarget = null;

const SWIPE_THRESHOLD = 40;
const TAP_THRESHOLD = 10;

cardStage.addEventListener("pointerdown", (e) => {
  const front = e.target.closest('.letter-card[data-depth="0"]');
  if (!front) return;
  dragStartX = e.clientX;
  dragging = true;
  activeFrontEl = front;
  dragPointerId = e.pointerId;
  // record this BEFORE setPointerCapture — once captured, e.target on
  // later events (pointerup) gets retargeted to the captured element
  // (the whole card), so this is the only reliable moment to know
  // whether the finger actually landed on the photo.
  dragStartImgTarget = e.target.closest(".card-image");
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
  const imgTarget = dragStartImgTarget;
  activeFrontEl = null;
  dragPointerId = null;
  dragStartImgTarget = null;

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
   SCREEN 5 — CLOSING HEARTS + REPLAY + VIDEO
   ========================================================= */
const heartsLayer = document.getElementById("heartsLayer");
const closingVideo = document.getElementById("closingVideo");
let heartsTimer = null;

// hand-drawn-style heart outline, matching the swipe-arrow line-art
// look, in three palette colors instead of emoji
const HEART_COLORS = ["var(--cream)", "var(--accent-blue)", "var(--gold)"];
const HEART_PATH =
  "M12 21s-7.2-4.6-10-9.3C.3 8.8 1.7 5 5.3 4.2c2-.5 4 .3 5.2 2 .3.4.8 1 1.5 1.9.7-.9 1.2-1.5 1.5-1.9 1.2-1.7 3.2-2.5 5.2-2 3.6.8 5 4.6 3.3 7.5-2.8 4.7-10 9.3-10 9.3z";

function makeHeartSvg(color) {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="${HEART_PATH}" stroke="${color}" stroke-width="1.6" stroke-linejoin="round" fill="${color}" fill-opacity="0.18"/>
  </svg>`;
}

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
  const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
  heart.innerHTML = makeHeartSvg(color);
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
  const duration = 5 + Math.random() * 3;
  heart.style.animationDuration = `${duration}s`;
  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

// safety net: if she taps play on the anniversary video before the
// music has fully faded (e.g. she replayed the letter first), duck
// the music out of the way immediately so she can hear the video
closingVideo.addEventListener("play", () => {
  if (bgMusic.volume > 0 && !bgMusic.paused) {
    fadeAudioOut(400);
  }
});

document.getElementById("replayBtn").addEventListener("click", () => {
  stopHearts();
  currentCard = 0;
  showScreen("letter");
  renderCard();
  resetAudioForReplay();
});

// set initial stack depths so cards are positioned correctly
// even before the letter screen is first shown
updateStack();
