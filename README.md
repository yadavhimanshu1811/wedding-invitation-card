# Royal Wedding Invitation Website 🕊️✨

A luxury interactive wedding invitation web application inspired by royal Indian palace heritage aesthetics.

---

## 🌟 Key Features

1. **Tap-to-Open Envelope Reveal**:
   - Celestial starry night opening screen with twinkling stars and shooting stars on an HTML5 canvas.
   - Pulsing orb trigger button and smooth curtain transition.

2. **Ambient Wedding Audio Player**:
   - Floating audio widget with animated dancing equalizer bars.
   - Integrated soothing instrumental flute raga playback via Web Audio API with local MP3 audio file support.

3. **Sacred Ganesh Motif & Royal Monogram**:
   - Ornate SVG gold Ganesh motif (`॥ श्री गणेशाय नमः ॥`).
   - Customizable royal couple monogram crest with botanical laurels and star crest.

4. **Interactive Pull-Out "Save The Date" Sleeve**:
   - Tactile envelope pocket with click and swipe gestures revealing the wedding date and "Save to Calendar" button.

5. **Ceremonies & Itinerary Timeline**:
   - Detailed schedule for Mehendi, Sangeet Night, Haldi & Phoolon Ki Holi, Baraat & Wedding Ceremony (Pheras), and Reception.
   - Color badge dress codes and one-click Google Calendar & iCal integration.

6. **3D Coverflow "Before Forever" Photo Gallery**:
   - Smooth 3D perspective slider with glowing gold aura around the active photo.
   - Full-screen lightbox modal on click.
   - Touch swipe on mobile & desktop drag.

7. **The Venue Showcase**:
   - Royal palace venue photo, address, travel notes, and direct Google Maps navigation button.

8. **Live Countdown Timer**:
   - Real-time Days, Hours, Minutes, and Seconds countdown to the auspicious ceremony.

9. **Blessings & Wishes Wall**:
   - Beautiful quotes and heartwarming greetings from close family and friends.

---

## 🛠️ How to Customize for Your Friend's Wedding

All content is managed through a single dedicated configuration file: `wedding-details.js`.

### 1. Update Names, Parents, Dates & Venue
Open `wedding-details.js` and modify:
```javascript
couple: {
  groom: {
    firstName: "Friend's Groom Name",
    fullName: "...",
    parents: "..."
  },
  bride: {
    firstName: "Friend's Bride Name",
    fullName: "...",
    parents: "..."
  },
  initials: "G & B",
  hashtag: "#YourHashtag"
},
weddingDate: "2026-12-15T19:00:00",
formattedDate: "15 December 2026",
```

### 2. Replace Photos & Videos
When you have the couple's photos and videos:
- Drop them into `public/assets/images/`:
  - `public/assets/images/couple-1.jpg`
  - `public/assets/images/couple-2.jpg`
  - `public/assets/images/couple-3.jpg`
  - `public/assets/images/couple-4.jpg`
  - `public/assets/images/couple-5.jpg`
  - `public/assets/images/couple-6.jpg`
  - `public/assets/images/venue.jpg`
- Or update the file paths directly in `wedding-details.js` under `gallery` and `venue.image`.

### 3. Add Custom Music
- Place any wedding instrumental MP3 file at `public/assets/audio/dhadak-song.mp3` (or update `music.audioSrc` in `wedding-details.js`).
- If no file is provided, the website automatically synthesizes a tranquil flute raga.

---

## 🚀 Running Locally

```bash
# Start development server
npm run dev

# Or build for production
npm run build
```
Open `http://localhost:5173/` in your browser.
