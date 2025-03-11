export const APP_NAME = "Nocturnal Narratives";

export const NAVIGATION_LINKS = [
  { name: "Home", path: "/" },
  { name: "Stories", path: "/stories" },
  { name: "Videos", path: "/videos" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
];

export const ANNOUNCEMENT_MESSAGES = [
  "NEW STORIES ADDED WEEKLY",
  "SUBSCRIBE TO OUR NEWSLETTER FOR EXCLUSIVE CONTENT",
  "FOLLOW US ON SOCIAL MEDIA FOR DAILY UPDATES"
];

export const SOCIAL_LINKS = [
  { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
  { name: "Twitter", icon: "Twitter", url: "https://twitter.com" },
  { name: "YouTube", icon: "Youtube", url: "https://youtube.com" },
  { name: "Facebook", icon: "Facebook", url: "https://facebook.com" }
];

export const STORY_CATEGORIES = [
  "Fantasy",
  "Adventure",
  "Mystery",
  "Educational",
  "Lullabies"
];

export const FOOTER_LINKS = {
  quickLinks: [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Stories", path: "/stories" },
    { name: "Videos", path: "/videos" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" }
  ],
  categories: [
    { name: "Fantasy", path: "/stories?category=fantasy" },
    { name: "Adventure", path: "/stories?category=adventure" },
    { name: "Mystery", path: "/stories?category=mystery" },
    { name: "Educational", path: "/stories?category=educational" },
    { name: "Lullabies", path: "/stories?category=lullabies" }
  ],
  contact: [
    { type: "address", value: "123 Starlight Avenue, Dreamland, Universe 54321" },
    { type: "email", value: "hello@nocturnalnarratives.com" },
    { type: "phone", value: "+1 (234) 567-890" }
  ]
};

export const COMPANY_INFO = {
  name: APP_NAME,
  description: "Creating magical bedtime stories inspired by the wonders of nature and the night sky.",
  copyrightYear: new Date().getFullYear(),
  policies: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" }
  ]
};
