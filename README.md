# 🌸 A Little Something For You ♡

A dreamy, interactive, mobile-first website designed for a special someone. Built with HTML5, CSS3, and vanilla JavaScript, crafted to evoke warmth, gentle affection, and the feeling of handwritten notes and sweet memories.

---

## ✨ Features & Experiences

1. **Screen 1: Welcome & Greeting**
   - Typewriter introduction delivering sweet rotating messages.
   - Smooth navigation into the world.
   - Elegant serif typography paired with romantic handwritten fonts (`Caveat` & `Playfair Display`).

2. **Screen 2: Scattered Little Notes**
   - 5 handwritten notes scattered across the screen with natural rotations, tape strips, and gentle floating animations.
   - Fully interactive: tapping any note opens a personalized modal revealing the expanded message.

3. **Screen 3: A Little Letter**
   - A 3D interactive envelope with a wax seal.
   - Tapping breaks the seal, opens the flap, and slides out a folded paper letter with the core heartfelt message.

4. **Screen 4: Little Memories**
   - Original vector illustrations depicting peaceful sunsets, warm latte moments, and starlit skies.
   - Styled polaroid cards with soft transitions.

5. **Screen 5: A Little Surprise**
   - Interactive secret message generator with random sweet affirmations and tap burst heart animations.

6. **Screen 6: Goodbye & Return**
   - Closing sentiment with a gentle return-to-top button.

7. **Ambient Effects & Audio**
   - **Floating hearts**: Max 12 active elements, memory-capped, spawns every ~1.4 seconds on mobile.
   - **Paper airplane**: Glides across the screen periodically.
   - **Touch burst & mouse sparkles**: Heart bursts on tap; starry sparkles on desktop pointer movement (disabled on touch devices to conserve resources).
   - **Synthesizer music box**: Built with Web Audio API. Never autoplays; requires no heavy MP3 file downloads or external licenses.

---

## 📱 Mobile-First Specifications

- **Target widths**: Pixel-perfect for `360px`, `390px`, `414px`, and `430px` modern smartphone displays (iPhone & Android).
- **Safe-area insets**: Uses `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` alongside `100svh` and `100dvh`.
- **Zero horizontal scroll**: Constrained layout guarantees no side overflow.
- **Accessibility**:
  - Full keyboard accessibility (Tab, Enter, Space, Escape to close modals).
  - Complete `prefers-reduced-motion` compliance.

---

## 🚀 How to Host on GitHub Pages

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a new public repository (e.g., `special-world` or `<your-username>.github.io`).

2. **Push the Files**:
   Ensure the following file structure is at the root of your repository:
   ```text
   index.html
   style.css
   script.js
   README.md
   assets/
     images/
       airplane.svg
       heart-bokeh.svg
       memory-1.svg
       memory-2.svg
       memory-3.svg
   ```

3. **Enable GitHub Pages**:
   - Navigate to your repository's **Settings** tab.
   - In the left sidebar, click on **Pages** (under the "Code and automation" section).
   - Under **Build and deployment > Branch**, choose your branch (usually `main`) and folder (`/ (root)`).
   - Click **Save**.
   - Within 1–2 minutes, GitHub will generate your live link (e.g., `https://<your-username>.github.io/<repo-name>/`).

### 🔒 Note on Privacy
GitHub Pages creates public websites that can be indexed or viewed by anyone who knows or discovers the URL.
- **Important**: Frontend-only passcode prompts or unlisted links do **not** provide real privacy or encryption because all assets and text can be viewed in the browser's source code and network inspector.
- If you require true privacy, consider hosting behind an authenticated platform such as Firebase Hosting with Auth, Cloudflare Pages with Cloudflare Access, or a private static hosting provider.

---

## 🛠 Customization

- To personalize the recipient's name, update the text inside `<span class="friend-name">Special Someone</span>` in `index.html`.
- To customize the note messages or the letter, edit the respective attributes in `index.html` or the surprise pool in `script.js`.

