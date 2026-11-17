/**
 * MAIN WEDDING INVITATION APPLICATION
 * Binds config to DOM, coordinates animations, envelope reveal, audio & interactions.
 */

import { WEDDING_DETAILS } from '../wedding-details.js';
import { StarrySky } from './starry-sky.js';
import { WeddingAudioPlayer } from './audio-player.js';
import { PullCard } from './pull-card.js';
import { WeddingCarousel } from './carousel.js';
import { WeddingCountdown } from './countdown.js';
import { Guestbook } from './guestbook.js';

document.addEventListener('DOMContentLoaded', () => {
  const config = window.WEDDING_DETAILS || WEDDING_DETAILS;
  if (!config) {
    console.error('Wedding details config not found!');
    return;
  }

  // 1. Initialize Starry Sky Background Canvas
  const starrySky = new StarrySky('stars-canvas');

  // 2. Initialize Audio Player
  const audioPlayer = new WeddingAudioPlayer(config.music.audioSrc);

  // 3. Hydrate Couple Data & Texts Across Website
  hydrateContent(config);

  // 4. Setup "Tap to Open Invitation" Ceremony
  setupEnvelopeOpening(audioPlayer);

  // 5. Initialize 3D Carousel Gallery
  const carousel = new WeddingCarousel('coverflow-container', config.gallery);

  // 6. Initialize Interactive Pull Card
  const pullCard = new PullCard('pocket-sleeve', 'inner-date-card', 'pull-hint-text');

  // 7. Initialize Live Countdown
  const countdown = new WeddingCountdown(config.weddingDate);

  // 8. Initialize Blessings Wall (Guestbook)
  const guestbook = new Guestbook(config);

  // 9. Setup Scroll Reveal Animations
  setupScrollReveals();

  // 10. Setup Calendar Export Buttons
  setupCalendarButtons(config);
});

/**
 * Injects wedding-config.js values into all designated DOM nodes
 */
function hydrateContent(config) {
  // Page Title
  document.title = `${config.couple.groom.firstName} & ${config.couple.bride.firstName} · Wedding Invitation`;

  // Couple Names
  setText('.couple-groom-name', config.couple.groom.firstName);
  setText('.couple-bride-name', config.couple.bride.firstName);
  setText('.couple-groom-full', config.couple.groom.fullName);
  setText('.couple-bride-full', config.couple.bride.fullName);
  setText('.couple-groom-parents', config.couple.groom.parents);
  setText('.couple-bride-parents', config.couple.bride.parents);
  setText('.couple-tagline', config.couple.tagline);
  setText('.wedding-date-formatted', config.formattedDate);
  setText('.wedding-date-short', config.formattedDateShort);

  // Monogram Initials in SVG Crest
  const monogramEl = document.getElementById('monogram-initials');
  if (monogramEl) {
    monogramEl.textContent = config.couple.initials;
  }

  // Marquee Ticker
  const tickerItems = [
    config.couple.tagline.toUpperCase(),
    `${config.couple.groom.firstName.toUpperCase()} & ${config.couple.bride.firstName.toUpperCase()}`,
    config.formattedDateShort,
    config.venue.name.toUpperCase(),
    config.couple.hashtag.toUpperCase()
  ];
  const tickerText = tickerItems.join('  ✦  ') + '  ✦  ' + tickerItems.join('  ✦  ');
  setText('#marquee-track-1', tickerText);
  setText('#marquee-track-2', tickerText);

  // Venue Section
  setText('.venue-title', config.venue.name);
  setText('.venue-subheading', config.venue.subheading);
  setText('.venue-city', config.venue.city);
  setText('.venue-full-address', config.venue.fullAddress);
  setText('.venue-directions-note', config.venue.directionsNote);

  const venueLink = document.getElementById('venue-map-link');
  if (venueLink) {
    venueLink.href = config.venue.googleMapsUrl;
  }
  const venueImg = document.getElementById('venue-hero-img');
  if (venueImg && config.venue.image) {
    venueImg.src = config.venue.image;
  }

  // Footer Compliments
  if (config.familyCompliments) {
    setText('.footer-family-compliments', config.familyCompliments);
  }

  // Events Timeline Generation
  renderEventsTimeline(config);
}

function setText(selector, text) {
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = text;
  });
}

/**
 * Renders the list of ceremonies dynamically
 */
function renderEventsTimeline(config) {
  const container = document.getElementById('events-timeline-container');
  if (!container) return;

  container.innerHTML = config.events.map((evt, idx) => `
    <div class="event-row scroll-reveal" data-event-id="${evt.id}">
      <div class="event-meta">
        <span class="event-number">${evt.number}</span>
        <div class="event-date-box">
          <span class="event-day">${evt.day}</span>
          <span class="event-date">${evt.date}</span>
        </div>
      </div>

      <div class="event-card-content">
        <h3 class="event-title">${evt.name}</h3>
        <p class="event-desc">${evt.description}</p>
        
        <div class="event-details-pill-row">
          <span class="event-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${evt.time}
          </span>
          <span class="event-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${evt.venue}
          </span>
          <span class="event-pill dress-code" style="--badge-color: ${evt.colorBadge}">
            <span class="color-swatch" style="background-color: ${evt.colorBadge}"></span>
            Dress Code: ${evt.dressCode}
          </span>
        </div>

        <div class="event-actions">
          <button class="cal-action-btn" onclick="addEventToCalendar('${evt.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Envelope opening animation and audio trigger
 */
function setupEnvelopeOpening(audioPlayer) {
  const openScreen = document.getElementById('envelope-cover-screen');
  const openTriggerBtn = document.getElementById('tap-to-open-trigger');
  const mainContent = document.getElementById('invitation-main-content');
  const stickyBar = document.getElementById('sticky-quick-bar');

  // Prevent any wheel or touchmove scrolling while the landing cover is active
  const preventScroll = (e) => {
    if (openScreen && !openScreen.classList.contains('opened')) {
      e.preventDefault();
    }
  };
  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });

  const openEnvelope = () => {
    if (!openScreen || openScreen.classList.contains('opened')) return;

    // Enable page scrolling now that invitation is opened
    document.body.classList.remove('envelope-locked');
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);

    openScreen.classList.add('opened');
    if (mainContent) mainContent.classList.add('visible');
    if (stickyBar) stickyBar.classList.add('visible');

    // Trigger audio on user interaction
    audioPlayer.start();

    // Remove cover from layout after animation completes
    setTimeout(() => {
      openScreen.style.display = 'none';
    }, 1200);
  };

  if (openTriggerBtn) {
    openTriggerBtn.addEventListener('click', openEnvelope);
  }
  if (openScreen) {
    openScreen.addEventListener('click', openEnvelope);
  }
}

/**
 * Scroll reveal observer for luxury fade & upward float
 */
function setupScrollReveals() {
  const elements = document.querySelectorAll('.scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/**
 * Calendar integration for events
 */
function setupCalendarButtons(config) {
  window.addEventToCalendar = (eventId) => {
    const evt = config.events.find(e => e.id === eventId);
    if (!evt) return;

    const gcalUrl = WeddingCountdown.generateGoogleCalendarUrl(
      evt.calendarTitle,
      evt.calendarDetails,
      `${evt.venue}, ${config.venue.name}, ${config.venue.city}`,
      config.weddingDate
    );
    window.open(gcalUrl, '_blank');
  };

  const addAllCalBtn = document.getElementById('add-all-calendar-btn');
  if (addAllCalBtn) {
    addAllCalBtn.addEventListener('click', () => {
      WeddingCountdown.downloadICS(
        `${config.couple.groom.firstName} & ${config.couple.bride.firstName}'s Wedding`,
        `Wedding celebration of ${config.couple.groom.fullName} & ${config.couple.bride.fullName}.\nVenue: ${config.venue.fullAddress}`,
        config.venue.fullAddress,
        config.weddingDate
      );
    });
  }
}
