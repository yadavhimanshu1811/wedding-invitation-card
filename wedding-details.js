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
      firstName: "Aarav",                                  // e.g. "Nilesh"
      fullName: "Aarav Sharma",                           // e.g. "Nilesh Goyal"
      parents: "Smt. Sunita & Shri Rajesh Sharma",        // Groom's parents
    },
    bride: {
      firstName: "Meera",                                 // e.g. "Lata"
      fullName: "Meera Singhal",                          // e.g. "Lata Gagal"
      parents: "Smt. Rekha & Shri Mahendra Singhal",      // Bride's parents
    },
    initials: "A & M",                                    // 2-3 letters displayed inside the golden crest (e.g. "L & N")
    hashtag: "#AaravKiMeera",                             // e.g. "#LataWedsNilesh"
    tagline: "Two Hearts · One Forever"                   // Tagline displayed under names
  },

  // --------------------------------------------------------------------------
  // 2. WEDDING DATE & TIMING
  // --------------------------------------------------------------------------
  // Main wedding date (Used for the live countdown timer)
  // Format: "YYYY-MM-DDTHH:mm:ss" (e.g. "2026-11-24T20:00:00")
  weddingDate: "2026-11-28T19:30:00",

  // Friendly date displayed on cards
  formattedDate: "28 November 2026",
  formattedDateShort: "28 · 11 · 2026",

  // --------------------------------------------------------------------------
  // 3. VENUE & LOCATION DETAILS
  // --------------------------------------------------------------------------
  venue: {
    name: "The Grand Heritage Palace Resort",             // Name of hotel / resort / banquet
    subheading: "Lakeside Royal Palace & Gardens",        // Brief subtitle
    city: "Udaipur, Rajasthan",                           // City & State
    fullAddress: "The Grand Heritage Palace Resort, Lake Pichola Road, Udaipur, Rajasthan 313001",
    googleMapsUrl: "https://maps.google.com/?q=Udaipur+Rajasthan", // Google Maps link for directions button
    directionsNote: "Valet parking available at Main Royal Porch. 35 mins from Maharana Pratap Airport (UDR).",
    image: "assets/images/venue.jpg"                      // Place your venue picture in assets/images/
  },

  // --------------------------------------------------------------------------
  // 4. SCHEDULE OF CEREMONIES & FUNCTIONS
  // Add, edit, or remove any ceremony from this list.
  // --------------------------------------------------------------------------
  events: [
    {
      id: "mehendi",
      number: "01",
      name: "Mehendi & High Tea",
      day: "FRIDAY",
      date: "27 NOV 2026",
      time: "2:30 PM Onwards",
      venue: "Gulmohar Courtyard",
      description: "A breezy afternoon of fragrant henna, folk beats, festive chai and sweet laughter.",
      dressCode: "Vibrant Greens, Pinks & Florals",
      colorBadge: "#10b981", // Color dot for dress code badge
      calendarTitle: "Mehendi Ceremony",
      calendarDetails: "Join us for Mehendi & High Tea."
    },
    {
      id: "sangeet",
      number: "02",
      name: "Sangeet & Cocktail Night",
      day: "FRIDAY",
      date: "27 NOV 2026",
      time: "7:30 PM Onwards",
      venue: "Crystal Grand Ballroom",
      description: "An electrifying evening of Bollywood performances, signature cocktails, and non-stop dancing.",
      dressCode: "Indo-Western Glitz & Glamour",
      colorBadge: "#8b5cf6",
      calendarTitle: "Sangeet Night",
      calendarDetails: "Join us for Sangeet & Cocktails."
    },
    {
      id: "haldi",
      number: "03",
      name: "Haldi & Phoolon Ki Holi",
      day: "SATURDAY",
      date: "28 NOV 2026",
      time: "10:30 AM Onwards",
      venue: "Lotus Poolside Lawn",
      description: "A golden morning drenched in fragrant turmeric, floral showers of marigolds and endless smiles.",
      dressCode: "Shades of Sunshine Yellow & Ochre",
      colorBadge: "#f59e0b",
      calendarTitle: "Haldi Ceremony",
      calendarDetails: "Haldi rituals and flower shower."
    },
    {
      id: "wedding",
      number: "04",
      name: "Baraat & Wedding Ceremony",
      day: "SATURDAY",
      date: "28 NOV 2026",
      time: "6:30 PM (Baraat) · 8:00 PM (Pheras)",
      venue: "Royal Lakefront Mandap",
      description: "The sacred vows and seven steps around the holy fire under a canopy of starlight.",
      dressCode: "Royal Traditional Indian Finery",
      colorBadge: "#e11d48",
      calendarTitle: "Wedding Ceremony (Pheras)",
      calendarDetails: "Baraat welcome at 6:30 PM, Sacred Pheras at 8:00 PM."
    },
    {
      id: "reception",
      number: "05",
      name: "Dinner & Reception",
      day: "SATURDAY",
      date: "28 NOV 2026",
      time: "9:30 PM Onwards",
      venue: "The Palace Royal Gardens",
      description: "A lavish feast under fairy lights to toast the newlyweds, celebrate new beginnings, and dance.",
      dressCode: "Regal Elegance & Black Tie",
      colorBadge: "#d97706",
      calendarTitle: "Wedding Reception",
      calendarDetails: "Celebratory feast & reception."
    }
  ],

  // --------------------------------------------------------------------------
  // 5. PHOTO GALLERY ("BEFORE FOREVER")
  // Replace the images with the couple's pictures in assets/images/
  // --------------------------------------------------------------------------
  gallery: [
    {
      image: "assets/images/couple-1.jpg",
      caption: "Two souls, one sacred journey",
      subtitle: "Royal Palace Courtyard"
    },
    {
      image: "assets/images/couple-2.jpg",
      caption: "Walking hand in hand toward forever",
      subtitle: "The Heritage Corridors"
    },
    {
      image: "assets/images/couple-3.jpg",
      caption: "Magic under a starlit night",
      subtitle: "Fairy Light Evenings"
    },
    {
      image: "assets/images/couple-4.jpg",
      caption: "Laughter, timeless memories & endless love",
      subtitle: "Sunset Over the Lake"
    }
  ],

  // --------------------------------------------------------------------------
  // 6. BACKGROUND MUSIC
  // Put your audio track MP3 in assets/audio/wedding-flute.mp3
  // If no MP3 is provided, the website automatically plays a soothing flute raga.
  // --------------------------------------------------------------------------
  music: {
    audioSrc: "assets/audio/wedding-flute.mp3"
  },

  // --------------------------------------------------------------------------
  // 7. FAMILY GREETING & BLESSINGS
  // --------------------------------------------------------------------------
  familyCompliments: "With Best Compliments From Sharma & Singhal Families",

  initialWishes: [
    {
      name: "The Grewal Family",
      message: "Wishing both of you a lifetime of joy, love and endless laughter! Can't wait to dance at the Sangeet!",
      date: "2 days ago"
    },
    {
      name: "Kabir & Ananya",
      message: "From college sweethearts to the altar! So proud and excited for you two. Love you loads!",
      date: "3 days ago"
    },
    {
      name: "Dadi & Dadaji",
      message: "May Ishwar shower His divine blessings upon you both forever. Sada khush raho!",
      date: "Just now"
    }
  ]
};

// Global window compatibility
if (typeof window !== "undefined") {
  window.WEDDING_DETAILS = WEDDING_DETAILS;
  window.WEDDING_CONFIG = WEDDING_DETAILS;
}
