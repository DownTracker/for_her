# happy birthday website

A little password-locked birthday site: numpad lock → song + word reveal → aesthetic blue intro → swipeable letter cards → closing screen.

## before you deploy

1. **Add the song**
   Drop your file into `assets/music/` and name it exactly `favmusic.mp3`
   (already wired up in `index.html`).

2. **Add photos**
   Drop images into `assets/images/` (e.g. `01.jpg`, `02.jpg`, ...).
   Then open `js/script.js` — each letter section in the `letterContent`
   array has a line like:
   ```js
   image: null, // assets/images/01.jpg
   ```
   Change `null` to the path, e.g.:
   ```js
   image: "assets/images/01.jpg",
   ```
   Do this for as many of the 10 sections as you have photos for. Any
   section left as `null` just shows a soft placeholder block instead.

3. **Change the password (optional)**
   At the top of `js/script.js`:
   ```js
   const PASSWORD = "0822";
   ```

## project structure

```
index.html
css/style.css
js/script.js
assets/
  music/favmusic.mp3   <- add this
  images/               <- add your photos here
```

## deploying

**GitHub**
1. Create a new repo and push this folder as-is.
2. Make sure `assets/music/favmusic.mp3` and your images are committed
   too (they're just files — no build step needed).

**Vercel**
1. Import the GitHub repo in Vercel.
2. Framework preset: "Other" / static site — no build command needed,
   output is the project root.
3. Deploy, open the link on her phone.

## notes

- The letter text in `js/script.js` is kept exactly as you wrote it —
  don't run it through a spellchecker/autocorrect when editing.
- The reveal words, the "swipe or tap" hint text, and the closing
  message are all easy to tweak at the top of `js/script.js` /
  inside `index.html` if you want to change the wording later.
