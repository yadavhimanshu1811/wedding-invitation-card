/**
 * ============================================================================
 * 🕊️ WEDDING DETAILS CONFIGURATION
 * ============================================================================
 * 
 * Instructions:
 * Fill in your friend's wedding details below.
 * Everything you change here will automatically update across the whole website!
 * ============================================================================
 */

export const WEDDING_DETAILS = {

  // --------------------------------------------------------------------------
  // 1. GROOM & BRIDE DETAILS
  // --------------------------------------------------------------------------
  couple: {
    groom: {
      firstName: "Tushar",                                  // e.g. "Nilesh"
      fullName: "Tushar Agarwal",                           // e.g. "Nilesh Goyal"
      parents: "Smt. Babita Agarwal & Shri Mukesh Agarwal",        // Groom's parents
    },
    bride: {
      firstName: "Ritu",                                 // e.g. "Lata"
      fullName: "Ritu Agarwal",                          // e.g. "Lata Gagal"
      parents: "Smt. Alka Agarwal & Shri Ashok Agarwal",      // Bride's parents
    },
    initials: "T & R",                                    // 2-3 letters displayed inside the golden crest (e.g. "L & N")
    hashtag: "#TusharKiRitu",                             // e.g. "#LataWedsNilesh"
    tagline: "Two Hearts · One Forever"                   // Tagline displayed under names
  },

  // --------------------------------------------------------------------------
  // 2. WEDDING DATE & TIMING
  // --------------------------------------------------------------------------
  // Main wedding date (Used for the live countdown timer)
  // Format: "YYYY-MM-DDTHH:mm:ss" (e.g. "2026-11-24T20:00:00")
  weddingDate: "2026-12-04T19:30:00",

  // Friendly date displayed on cards
  formattedDate: "04 December 2026",
  formattedDateShort: "04 · 12 · 2026",

  // --------------------------------------------------------------------------
  // 3. VENUE & LOCATION DETAILS
  // --------------------------------------------------------------------------
  venue: {
    name: "Hotel Tirupati",             // Name of hotel / resort / banquet
    subheading: "",        // Brief subtitle
    city: "Jaipur-Delhi highway, Sangteda, Kotputli, Rajasthan",                           // City & State
    fullAddress: "Hotel Tirupati, Jaipur-Delhi highway, Sangteda, Kotputli, Rajasthan 303108",
    googleMapsUrl: "https://maps.app.goo.gl/NiPcZmxdfsEcno5j9", // Google Maps link for directions button
    image: "assets/images/venue.jpg"                      // Place your venue picture in public/assets/images/
  },

  // --------------------------------------------------------------------------
  // 4. SCHEDULE OF CEREMONIES & FUNCTIONS
  // Add, edit, or remove any ceremony from this list.
  // --------------------------------------------------------------------------
  events: [
    {
      id: "chaak",
      number: "01",
      name: "Chaak",
      day: "WEDNESDAY",
      date: "2 DEC 2026",
      time: "3:15 PM Onwards",
      venue: "At Residence, Agarwal family",
    },
    {
      id: "bhaat",
      number: "02",
      name: "Bhaat",
      day: "THURSDAY",
      date: "3 DEC 2026",
      time: "12:15 PM Onwards",
      venue: "Hotel Tirupati (Back garden)",
    },
    {
      id: "lagan-teeka",
      number: "03",
      name: "Lagan Teeka",
      day: "THURSDAY",
      date: "3 DEC 2026",
      time: "3:15 PM Onwards",
      venue: "Hotel Tirupati (Front garden)",
    },
    {
      id: "sangeet",
      number: "04",
      name: "Ladies sangeet",
      day: "THURSDAY",
      date: "3 DEC 2026",
      time: "6:15 PM Onwards",
      venue: "Hotel Tirupati (Front garden)",
    },
    {
      id: "haldi",
      number: "05",
      name: "Haldi ceremony",
      day: "FRIDAY",
      date: "4 DEC 2026",
      time: "10:30 AM Onwards",
      venue: "Hotel Tirupati (Back garden)",
    },
    {
      id: "ghudchadi",
      number: "06",
      name: "Ghudchadi",
      day: "FRIDAY",
      date: "4 DEC 2026",
      time: "4:00 PM Onwards",
      venue: "Hotel Tirupati (Back garden)",
    },
    {
      id: "wedding",
      number: "07",
      name: "Wedding ceremony",
      day: "FRIDAY",
      date: "4 DEC 2026",
      time: "7:30 PM Onwards",
      venue: "Hotel Tirupati (Back garden)",
    }
  ],

  // --------------------------------------------------------------------------
  // 5. PHOTO GALLERY ("BEFORE FOREVER")
  // Put photos in public/assets/images/
  // --------------------------------------------------------------------------
  gallery: [
    {
      image: "assets/images/couple-1.jpg",
    },
    {
      image: "assets/images/couple-2.jpg",
    },
    {
      image: "assets/images/couple-3.jpg",
    },
    {
      image: "assets/images/couple-4.jpg",
    },
    {
      image: "assets/images/couple-5.jpg",
    },
    {
      image: "assets/images/couple-6.jpg",
    }
  ],

  // --------------------------------------------------------------------------
  // 6. BACKGROUND MUSIC
  // Put your audio track MP3 in public/assets/audio/
  // If no MP3 is provided, the website automatically plays a soothing flute raga.
  // --------------------------------------------------------------------------
  music: {
    audioSrc: "assets/audio/theme-song.mp3"
  },

  // --------------------------------------------------------------------------
  // 7. FAMILY GREETING (FOOTER)
  // --------------------------------------------------------------------------
  familyCompliments: "With Best Compliments From Agarwal Family"
};

// Global window compatibility
if (typeof window !== "undefined") {
  window.WEDDING_DETAILS = WEDDING_DETAILS;
  window.WEDDING_CONFIG = WEDDING_DETAILS;
}
