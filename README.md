# A Little Story for Mr Hamza & Nuri ❤️

A soft, premium, fully animated romantic experience — a small digital gift made
by **Mr Hamza** for **Nuri**.

Everything on the page is interactive: an animated love background, gentle
piano music, a playful proposal with a YES / NO moment, a quote carousel, a
six-step dream journey, dream date cards and a closing letter.

---

## Tech stack

| Piece          | What is used                                        |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 16 (App Router) + React 19                  |
| Styling        | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`) |
| Animation      | Framer Motion + lightweight CSS keyframes           |
| Icons          | lucide-react                                        |
| Language       | JavaScript                                          |
| Deployment     | Netlify (official Next.js Runtime)                  |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/
  layout.js                 # metadata, fonts, background + music providers
  page.js                   # the scene flow: proposal → celebration → story
  globals.css               # theme tokens, keyframes, glassmorphism helpers
components/
  AppProviders.jsx          # global music state + MotionConfig (reduced motion)
  MusicPlayer.jsx           # top-right player + the polite "Play a little music?" invite
  LoveBackground.jsx        # animated background: gradient, petals, sparkles, particles, butterflies
  FloatingHearts.jsx        # hearts drifting from bottom to top
  TeddyDecorations.jsx      # original teddy bear SVGs (heart / flowers / letter)
  HeartShape.jsx            # reusable heart glyph
  HeartBurst.jsx            # reusable heart burst / floating hearts
  ProposalSection.jsx       # opening screen with YES ❤️ and the playful NO 🙈
  RespectfulAnswer.jsx      # gentle screen if the answer is "no" (nothing is trapped)
  CelebrationSection.jsx    # "You Just Made My Day, Nuri!" + Continue
  LoveQuotes.jsx            # quote carousel (auto + manual)
  JourneyTimeline.jsx       # six-step scroll-revealed timeline
  DreamDateCards.jsx        # dream date cards with hand-drawn SVG art
  FinalMessage.jsx          # closing letter + music controls
data/
  loveQuotes.js             # ← edit your words here
  journeySteps.js           # ← edit the timeline here
  dreamDates.js             # ← edit the date cards here
public/
  audio/                    # the locally hosted music
  favicon.svg
scripts/
  generate-music.mjs        # regenerates the background music
```

### Editing the content

Everything romantic lives in `data/`, so it can be changed without touching the
components. Names and headings are plain text inside the components listed
above.

## Music

`public/audio/a-little-story-theme.wav` is an **original composition** generated
by `scripts/generate-music.mjs` (additive synthesis + a simple reverb, ≈58
seconds, loops forever).

- No samples, no third-party recordings, no copyrighted material → safe to
  publish anywhere.
- Regenerate or tweak it any time with `node scripts/generate-music.mjs`.
- Music never autoplays: Nuri is politely invited with "Play a little music? 🎵"
  and can decline — the website works perfectly without sound.

## Accessibility & performance

- `prefers-reduced-motion` is respected (CSS media query + Framer Motion config).
- The playful NO button never traps anyone: it dodges a few times, then stays
  put, and keyboard activation always answers honestly.
- Background animations only animate `transform` / `opacity` so scrolling stays
  smooth on phones; all decorative layers are `aria-hidden`.
- The audio element lives in the root provider, so music never restarts when
  moving between sections, and all timers/listeners are cleaned up on unmount.

## Deploying to GitHub + Netlify

### 1. Push the project to GitHub

```bash
git init
git add .
git commit -m "A little story for Nuri"
git branch -M main
git remote add origin https://github.com/<your-username>/a-little-story-for-nuri.git
git push -u origin main
```

`node_modules`, `.next` and env files are already ignored by `.gitignore`, and
`package-lock.json` is kept so the build is reproducible.

### 2. Connect GitHub to Netlify

1. Sign in at <https://app.netlify.com> → **Add new site** → **Import an
   existing project**.
2. Choose **GitHub** and pick the repository you just pushed.
3. Netlify reads `netlify.toml`, so the settings are already filled in:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `22`
   - Plugin: `@netlify/plugin-nextjs` (installed automatically)
4. Press **Deploy site**. Every later `git push` to `main` triggers a new
   deploy automatically.
5. (Optional) Add a custom domain under **Domain management**.

No environment variables or API keys are required — the site is fully static.
