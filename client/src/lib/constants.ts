export const APP_NAME = "Ambient Engineering";

export const NAVIGATION_LINKS = [
  { name: "Home", path: "/" },
  { name: "Experience", path: "/stories" },
  { name: "Podcast", path: "/podcast" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
];

export const ANNOUNCEMENT_MESSAGES = [
  "NEW ENVIRONMENTS ADDED WEEKLY",
  "SUBSCRIBE FOR EXCLUSIVE AMBIENT TEMPLATES",
  "OPTIMIZE YOUR SPACE WITH SCIENTIFIC PRECISION"
];

export const SOCIAL_LINKS = [
  { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
  { name: "Twitter", icon: "Twitter", url: "https://twitter.com" },
  { name: "YouTube", icon: "Youtube", url: "https://youtube.com" },
  { name: "Spotify", icon: "Music", url: "https://spotify.com" }
];

export const STORY_CATEGORIES = [
  "Focus",
  "Relaxation",
  "Creativity",
  "Productivity",
  "Sleep"
];

export const FOOTER_LINKS = {
  quickLinks: [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Experience", path: "/stories" },
    { name: "Podcast", path: "/podcast" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" }
  ],
  categories: [
    { name: "Focus", path: "/stories?category=focus" },
    { name: "Relaxation", path: "/stories?category=relaxation" },
    { name: "Creativity", path: "/stories?category=creativity" },
    { name: "Productivity", path: "/stories?category=productivity" },
    { name: "Sleep", path: "/stories?category=sleep" }
  ],
  contact: [
    { type: "address", value: "742 Ambient Avenue, Tech District, CA 94107" },
    { type: "email", value: "contact@ambientengineering.com" },
    { type: "phone", value: "+1 (415) 555-7890" }
  ]
};

export const COMPANY_INFO = {
  name: APP_NAME,
  description: "Empowering users to scientifically optimize their environments for enhanced wellbeing, productivity, and mood regulation.",
  copyrightYear: new Date().getFullYear(),
  policies: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" }
  ]
};
