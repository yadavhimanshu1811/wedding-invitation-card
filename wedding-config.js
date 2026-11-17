/**
 * WEDDING INVITATION CONFIGURATION
 * -------------------------------------------------------------
 * Easily customize this file for your friend's wedding!
 * Replace any names, dates, ceremonies, venues, images, or audio.
 * Everything will update across the entire website automatically.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: {
      firstName: "Aarav",
      fullName: "Aarav Sharma",
      parents: "Smt. Sunita & Shri Rajesh Sharma",
      bio: "Son of the Sharmas, adventurer at heart and ready for the greatest adventure of all."
    },
    bride: {
      firstName: "Meera",
      fullName: "Meera Singhal",
      parents: "Smt. Rekha & Shri Mahendra Singhal",
      bio: "Daughter of the Singhals, bringing sunshine, grace and love everywhere she goes."
    },
    initials: "A & M", // Displayed in the golden monogram crest
    hashtag: "#AaravKiMeera",
    tagline: "Two Hearts · One Forever"
  },

  // Main Wedding Date (Used for live countdown & calendar links)
  // Format: YYYY-MM-DDTHH:mm:ss
  weddingDate: "2026-11-28T19:30:00",
  formattedDate: "28 November 2026",
  formattedDateShort: "28 · 11 · 2026",

  // Venue Information
  venue: {
    name: "The Grand Heritage Palace Resort",
    subheading: "Lakeside Royal Palace & Gardens",
    city: "Udaipur, Rajasthan",
    fullAddress: "The Grand Heritage Palace Resort, Lake Pichola Road, Udaipur, Rajasthan 313001",
    googleMapsUrl: "https://maps.google.com/?q=Udaipur+Rajasthan",
    directionsNote: "Valet parking available at Main Royal Porch. 35 mins from Maharana Pratap Airport (UDR).",
    image: "assets/images/venue.jpg"
  },

  // Schedule of Events / Ceremonies
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
      colorBadge: "#10b981",
      calendarTitle: "Mehendi - Aarav & Meera Wedding",
      calendarDetails: "Join us for Mehendi & High Tea at Gulmohar Courtyard."
    },
    {
      id: "sangeet",
      number: "02",
      name: "Sangeet & Cocktail Night",
      day: "FRIDAY",
      date: "27 NOV 2026",
      time: "7:30 PM Onwards",
      venue: "Crystal Grand Ballroom",
      description: "An electrifying evening of Bollywood performances, signature cocktails, and non-stop dancing under the chandeliers.",
      dressCode: "Indo-Western Glitz & Glamour",
      colorBadge: "#8b5cf6",
      calendarTitle: "Sangeet Night - Aarav & Meera Wedding",
      calendarDetails: "Join us for Sangeet & Cocktails at Crystal Grand Ballroom."
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
      calendarTitle: "Haldi Ceremony - Aarav & Meera Wedding",
      calendarDetails: "Haldi rituals and flower shower at Lotus Poolside Lawn."
    },
    {
      id: "wedding",
      number: "04",
      name: "Baraat & Wedding Ceremony",
      day: "SATURDAY",
      date: "28 NOV 2026",
      time: "6:30 PM (Baraat) · 8:00 PM (Pheras)",
      venue: "Royal Lakefront Mandap",
      description: "The sacred vows and seven steps around the holy fire under a canopy of starlight, blessed by our loved ones.",
      dressCode: "Royal Traditional Indian Finery",
      colorBadge: "#e11d48",
      calendarTitle: "Wedding Ceremony - Aarav & Meera Wedding",
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
      description: "A lavish feast under fairy lights to toast the newlyweds, celebrate new beginnings, and dance the night away.",
      dressCode: "Regal Elegance & Black Tie",
      colorBadge: "#d97706",
      calendarTitle: "Wedding Reception - Aarav & Meera Wedding",
      calendarDetails: "Celebratory feast & reception at The Palace Royal Gardens."
    }
  ],

  // Gallery Photos (Dummy high-res images provided; swap with friend's pictures)
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

  // Background Music Settings
  music: {
    title: "Mangalyam & Royal Flute Melody",
    audioSrc: "assets/audio/wedding-flute.mp3", // Will use high-quality Web Audio synthesizer as seamless fallback if file not present
    autoPlayPrompt: true
  },

  // RSVP & Contact Details
  rsvp: {
    deadline: "20 November 2026",
    contactName: "Wedding Helpline / Sharma & Singhal Families",
    phone: "+91 98765 43210",
    whatsappNumber: "919876543210", // Phone with country code for WhatsApp link
    whatsappDefaultMessage: "Namaste! I would love to RSVP for Aarav & Meera's wedding celebration!"
  },

  // Blessings & Pre-filled wishes for the interactive guestbook
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

// Export for module and browser window
if (typeof module !== "undefined" && module.exports) {
  module.exports = WEDDING_CONFIG;
} else if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
export { WEDDING_CONFIG };

