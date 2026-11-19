/**
 * Dreamy Personal Website - Interactive Engine
 * Mobile-First, Accessible, Vanilla JavaScript
 */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     Device & Preference Detection
     ------------------------------------------------------------------------- */
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------------------------
     1. Floating Hearts Background Generator (Subtle & Minimal)
     Max 7 hearts simultaneously on mobile, gentle 2.2s pace
     ------------------------------------------------------------------------- */
  const heartContainer = document.getElementById("floating-hearts");
  const MAX_HEARTS = isMobile ? 7 : 12;
  const HEART_INTERVAL_MS = isMobile ? 2200 : 1400;

  function spawnFloatingHeart() {
    if (reducedMotion || document.hidden || !heartContainer) return;

    if (heartContainer.children.length >= MAX_HEARTS) {
      return;
    }

    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.4 ? "♡" : "♥";

    // Randomize appearance
    const size = 12 + Math.random() * 16;
    const duration = isMobile ? (6 + Math.random() * 4) : (7 + Math.random() * 5);
    const leftPos = Math.random() * 92 + 4; // Stay within 4% - 96%
    const opacity = 0.5 + Math.random() * 0.45;

    heart.style.left = `${leftPos}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.opacity = `${opacity}`;
    heart.style.animationDuration = `${duration}s`;

    heartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  setInterval(spawnFloatingHeart, HEART_INTERVAL_MS);

  /* -------------------------------------------------------------------------
     2. Typewriter Effect for Hero Screen (Hinglish Welcome Messages)
     ------------------------------------------------------------------------- */
  const typewriterContent = document.querySelector("#typewriterIntro .tw-content");
  const introPhrases = [
    "Waise, tumhari entry ka intezaar tha.",
    "Tumhare liye kuch chhota sa surprise hai...",
    "Bas aise hi hamesha muskurati rehna ♡",
    "Thoda sa blush kar lena, ye sirf tumhare liye hai :)"
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typewriterTimeout = null;

  function runTypewriter() {
    if (!typewriterContent) return;

    if (reducedMotion) {
      typewriterContent.textContent = introPhrases[0];
      return;
    }

    const currentPhrase = introPhrases[phraseIdx];

    if (!isDeleting) {
      typewriterContent.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentPhrase.length) {
        isDeleting = true;
        typewriterTimeout = setTimeout(runTypewriter, 2600); // Pause on completed sentence
        return;
      }
      typewriterTimeout = setTimeout(runTypewriter, 75 + Math.random() * 30);
    } else {
      typewriterContent.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % introPhrases.length;
        typewriterTimeout = setTimeout(runTypewriter, 400);
        return;
      }
      typewriterTimeout = setTimeout(runTypewriter, 40);
    }
  }

  function startTypewriter() {
    stopTypewriter();
    phraseIdx = 0;
    charIdx = 0;
    isDeleting = false;
    runTypewriter();
  }

  function stopTypewriter() {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }
  }

  // Start initial typewriter
  startTypewriter();

  /* -------------------------------------------------------------------------
     3. Cinematic Single-Page Screen Switching Navigation
     6 independent screens with blur, scale, and paper airplane glide transition
     ------------------------------------------------------------------------- */
  const screens = [
    document.getElementById("welcome"),
    document.getElementById("notesSection"),
    document.getElementById("letterSection"),
    document.getElementById("memoriesSection"),
    document.getElementById("surpriseSection"),
    document.getElementById("goodbyeSection")
  ];

  let currentScreenIndex = 0;
  let isTransitioning = false;

  // Set initial screen
  screens.forEach((screen, index) => {
    if (!screen) return;
    if (index === 0) {
      screen.classList.add("active");
    } else {
      screen.classList.remove("active");
      screen.classList.remove("exit");
    }
  });

  const airplaneContainer = document.getElementById("airplaneContainer");

  function triggerAirplaneTransition() {
    if (!airplaneContainer || reducedMotion) return;
    airplaneContainer.classList.remove("flying");
    airplaneContainer.classList.remove("transitioning");
    void airplaneContainer.offsetWidth; // Force reflow
    airplaneContainer.classList.add("transitioning");
  }

  function goToScreen(targetIndex) {
    if (isTransitioning || targetIndex === currentScreenIndex) return;
    if (targetIndex < 0 || targetIndex >= screens.length) return;

    isTransitioning = true;
    const currentScreen = screens[currentScreenIndex];
    const nextScreen = screens[targetIndex];

    if (!currentScreen || !nextScreen) {
      isTransitioning = false;
      return;
    }

    // 1. Trigger paper airplane animation across screen
    triggerAirplaneTransition();

    // 2. Animate current screen exit (blur and fade)
    currentScreen.classList.add("exit");
    currentScreen.classList.remove("active");

    const transitionDelay = reducedMotion ? 50 : 550;

    setTimeout(() => {
      // 3. Deactivate old screen and activate next screen
      currentScreen.classList.remove("exit");
      currentScreen.scrollTop = 0; // Reset scroll position internally

      nextScreen.scrollTop = 0;
      nextScreen.classList.add("active");
      currentScreenIndex = targetIndex;

      // Special screen triggers
      if (targetIndex === 0) {
        // Welcome screen: restart typewriter animation
        startTypewriter();
      } else {
        // Stop typewriter when leaving Welcome screen to save CPU and avoid intervals
        stopTypewriter();
      }

      if (targetIndex === 5) {
        // Goodbye screen: reveal teasing note after entrance
        const teasingNote = document.getElementById("teasingNote");
        if (teasingNote) {
          teasingNote.classList.remove("revealed");
          setTimeout(() => {
            teasingNote.classList.add("revealed");
          }, reducedMotion ? 100 : 700);
        }
      }

      setTimeout(() => {
        isTransitioning = false;
      }, reducedMotion ? 50 : 400);
    }, transitionDelay);
  }

  // Connect Navigation Buttons
  const enterWorldBtn = document.getElementById("enterWorldBtn");
  if (enterWorldBtn) {
    enterWorldBtn.addEventListener("click", () => goToScreen(1)); // Welcome -> Notes
  }

  const notesToLetterBtn = document.getElementById("notesToLetterBtn");
  if (notesToLetterBtn) {
    notesToLetterBtn.addEventListener("click", () => goToScreen(2)); // Notes -> Letter
  }

  const letterToMemoriesBtn = document.getElementById("letterToMemoriesBtn");
  if (letterToMemoriesBtn) {
    letterToMemoriesBtn.addEventListener("click", () => goToScreen(3)); // Letter -> Memories
  }

  const memoriesToSurpriseBtn = document.getElementById("memoriesToSurpriseBtn");
  if (memoriesToSurpriseBtn) {
    memoriesToSurpriseBtn.addEventListener("click", () => goToScreen(4)); // Memories -> Surprise
  }

  const surpriseToGoodbyeBtn = document.getElementById("surpriseToGoodbyeBtn");
  if (surpriseToGoodbyeBtn) {
    surpriseToGoodbyeBtn.addEventListener("click", () => goToScreen(5)); // Surprise -> Goodbye
  }

  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => goToScreen(0)); // Goodbye -> Welcome
  }

  /* -------------------------------------------------------------------------
     4. Scattered Notes Modal Dialog Interaction
     Tapping any note opens the full personalized note in a dreamy modal.
     ------------------------------------------------------------------------- */
  const noteModal = document.getElementById("noteModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const paperNotes = document.querySelectorAll(".paper-note");

  function openNote(noteElement) {
    const title = noteElement.getAttribute("data-title") || "Note";
    const message = noteElement.getAttribute("data-message") || "";

    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.textContent = message;

    if (noteModal) {
      noteModal.classList.add("open");
      noteModal.setAttribute("aria-hidden", "false");
    }

    if (navigator.vibrate) {
      try { navigator.vibrate(25); } catch (e) {}
    }
  }

  function closeNote() {
    if (noteModal) {
      noteModal.classList.remove("open");
      noteModal.setAttribute("aria-hidden", "true");
    }
  }

  paperNotes.forEach((note) => {
    note.addEventListener("click", () => openNote(note));
    note.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openNote(note);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeNote);
  }

  if (noteModal) {
    noteModal.addEventListener("click", (e) => {
      if (e.target === noteModal) {
        closeNote();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && noteModal && noteModal.classList.contains("open")) {
      closeNote();
    }
  });

  /* -------------------------------------------------------------------------
     5. 3D Envelope & Revealed Letter
     Tap to break wax seal, lift flap, and slide out handwritten letter.
     ------------------------------------------------------------------------- */
  const envelopeCard = document.getElementById("envelopeCard");
  const revealedLetter = document.getElementById("revealedLetter");
  const envelopeHint = document.getElementById("envelopeHint");

  function toggleEnvelope() {
    if (!envelopeCard || !revealedLetter) return;

    const isOpen = envelopeCard.classList.contains("open");
    const nextState = !isOpen;

    envelopeCard.classList.toggle("open", nextState);
    envelopeCard.setAttribute("aria-expanded", nextState ? "true" : "false");

    if (nextState) {
      revealedLetter.classList.add("visible");
      if (envelopeHint) envelopeHint.textContent = "Letter khul gaya hai ♡";

      if (navigator.vibrate) {
        try { navigator.vibrate(40); } catch (e) {}
      }
    } else {
      revealedLetter.classList.remove("visible");
      if (envelopeHint) envelopeHint.textContent = "Envelope kholne ke liye seal par tap karo";
    }
  }

  if (envelopeCard) {
    envelopeCard.addEventListener("click", toggleEnvelope);
    envelopeCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleEnvelope();
      }
    });
  }

  /* -------------------------------------------------------------------------
     6. A Little Surprise Message Generator (No-Repeat & Final Message)
     ------------------------------------------------------------------------- */
  const surpriseBtn = document.getElementById("surpriseGeneratorBtn");
  const surpriseText = document.getElementById("surpriseText");
  const surpriseCard = document.getElementById("surpriseCard");
  const surpriseCounter = document.getElementById("surpriseCounter");

  const initialSurprises = [
    "Devi jiii, pranam swikar karen. Hamesha ashirwad banaye rakhna. 🙏✨",
    "Itna toh banta hai, tum special jo ho. ♡",
    "Smile aa gayi? Toh mission successful!",
    "Bas aise hi hamesha muskurati rehna. ♡",
    "Pata nahi kyun, par tumse baat karke lagta hai din ka sabse achha hissa yahi tha.",
    "Ek secret bataun? Tumhari smile dekhkar kisi ka bhi din ban sakta hai :)",
    "Thoda sa aaraam karo, deep breath lo... aur yaad rakhna you're doing great!"
  ];

  // Create a randomized copy that drains without repetition
  function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  let remainingSurprises = shuffleArray(initialSurprises);
  const totalSurprises = initialSurprises.length;
  let drawCount = 0;

  if (surpriseBtn && surpriseText) {
    surpriseBtn.addEventListener("click", () => {
      if (remainingSurprises.length > 0) {
        const nextMessage = remainingSurprises.pop();
        drawCount++;

        // Trigger gentle bounce effect
        if (surpriseCard) {
          surpriseCard.style.transform = "scale(0.96)";
          setTimeout(() => {
            surpriseCard.style.transform = "scale(1)";
          }, 180);
        }

        surpriseText.textContent = nextMessage;

        if (surpriseCounter) {
          surpriseCounter.textContent = `Surprise ${drawCount} of ${totalSurprises} unlocked ♡`;
        }

        // Tap burst effect at button location
        const rect = surpriseBtn.getBoundingClientRect();
        createTapBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

        if (navigator.vibrate) {
          try { navigator.vibrate(30); } catch (err) {}
        }

        // Check if this was the last available surprise
        if (remainingSurprises.length === 0) {
          // Disable/fade out the button smoothly
          surpriseBtn.disabled = true;
          surpriseBtn.classList.add("hidden");

          // Display the final apology message in center with celebration
          setTimeout(() => {
            if (surpriseCard) {
              surpriseCard.classList.add("finished");
            }
            surpriseText.innerHTML = "Bas surprises itne hii thee, maaf krna Devi Ji... aur kuch dimag mein aaya nahi. 😭😂";

            if (surpriseCounter) {
              surpriseCounter.textContent = "Saare surprises khatam ho gaye! ✨";
            }

            // Spawn special shower of burst hearts
            if (surpriseCard) {
              const cardRect = surpriseCard.getBoundingClientRect();
              for (let k = -2; k <= 2; k++) {
                setTimeout(() => {
                  createTapBurst(cardRect.left + cardRect.width / 2 + k * 35, cardRect.top + cardRect.height / 2 + (Math.random() * 20 - 10));
                }, Math.abs(k) * 120);
              }
            }
          }, 450);
        }
      }
    });
  }

  /* -------------------------------------------------------------------------
     7. Flying Paper Airplane Periodic Ambient Flight (Every 28-36 seconds)
     ------------------------------------------------------------------------- */
  function launchAirplane() {
    if (reducedMotion || !airplaneContainer) return;

    airplaneContainer.classList.remove("flying");
    void airplaneContainer.offsetWidth; // Trigger reflow
    airplaneContainer.classList.add("flying");

    // Re-launch on a gentle random cadence
    const nextInterval = 28000 + Math.random() * 12000;
    setTimeout(launchAirplane, nextInterval);
  }

  setTimeout(launchAirplane, 4000);

  /* -------------------------------------------------------------------------
     8. Tap & Click Heart Bursts
     ------------------------------------------------------------------------- */
  function createTapBurst(x, y) {
    if (reducedMotion) return;

    const burst = document.createElement("span");
    burst.className = "burst-heart";
    burst.textContent = Math.random() > 0.5 ? "♡" : "♥";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;

    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 850);
  }

  document.addEventListener("pointerdown", (e) => {
    // Only spawn tap burst if tapping outside buttons/inputs to avoid clutter
    if (!e.target.closest("button") && !e.target.closest("a") && !e.target.closest(".note-modal-card")) {
      createTapBurst(e.clientX, e.clientY);
    }
  });

  /* -------------------------------------------------------------------------
     9. Mouse Sparkles (Desktop Only, Disabled on Touch Devices)
     ------------------------------------------------------------------------- */
  if (!isTouchDevice && !reducedMotion) {
    let lastSparkleTime = 0;
    document.addEventListener("pointermove", (e) => {
      const now = Date.now();
      if (now - lastSparkleTime > 110 && Math.random() > 0.7) {
        lastSparkleTime = now;
        const sparkle = document.createElement("span");
        const isBlueSparkle = Math.random() > 0.45;
        sparkle.className = isBlueSparkle ? "sparkle sparkle-blue" : "sparkle";
        sparkle.textContent = Math.random() > 0.5 ? "✦" : (isBlueSparkle ? "★" : "✧");
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 750);
      }
    });
  }

  /* -------------------------------------------------------------------------
     10. Ambient Music Player (Web Audio API Synthesized Lofi Melody)
     Zero external audio dependencies, never autoplays, gentle & romantic
     ------------------------------------------------------------------------- */
  const musicToggle = document.getElementById("musicToggle");
  let audioCtx = null;
  let isPlaying = false;
  let melodyTimer = null;
  let noteIdx = 0;

  // Gentle pentatonic music sequence (frequencies in Hz: C4, D4, E4, G4, A4, C5...)
  const melodyNotes = [
    261.63, 329.63, 392.00, 523.25,
    392.00, 329.63, 261.63, 293.66,
    329.63, 392.00, 440.00, 523.25,
    440.00, 392.00, 329.63, 293.66
  ];

  function playGentleBell(freq) {
    if (!audioCtx || !isPlaying) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Soft envelope (gentle attack and romantic decaying chime)
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.85);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  function startMelodyLoop() {
    isPlaying = true;
    if (musicToggle) {
      musicToggle.classList.add("playing");
      musicToggle.querySelector(".music-label").textContent = "Melody: On";
    }

    melodyTimer = setInterval(() => {
      if (!isPlaying) return;
      playGentleBell(melodyNotes[noteIdx]);
      noteIdx = (noteIdx + 1) % melodyNotes.length;
    }, 700);
  }

  function stopMelodyLoop() {
    isPlaying = false;
    clearInterval(melodyTimer);
    if (musicToggle) {
      musicToggle.classList.remove("playing");
      musicToggle.querySelector(".music-label").textContent = "Melody: Off";
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }

      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      if (isPlaying) {
        stopMelodyLoop();
      } else {
        startMelodyLoop();
      }
    });
  }

})();
