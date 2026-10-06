export const SITE = {
  brand: "OKA",
  email: "aromii.work@gmail.com",   
  heroName: "Miarotiana", // TODO: confirm how the name should appear in the hero
};
export const ABOUT_TAGS = [
  "illustration",
  "characterDesign",
  "pixelArt",
  "animation",
  "gameAssets",
  "crossStitch",
  "mangaBd",
];

export const NAV_ITEMS = [
  { id: "about", labelKey: "nav.about" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "process", labelKey: "nav.process" },
  { id: "gallery", labelKey: "nav.gallery" },
  { id: "reviews", labelKey: "nav.reviews" },
];

// "hero" is tracked for the active state but isn't a nav link
export const SECTION_IDS = ["hero", ...NAV_ITEMS.map((item) => item.id)];

// TODO: real profile URLs
export const CONTACT_LINKS = [
//   { id: "upwork", label: "Upwork", href: "#" },
//   { id: "fiverr", label: "Fiverr", href: "#" },
//   { id: "comeup", label: "ComeUp", href: "#" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/aromi.i" },
//   { id: "bluesky", label: "Bluesky", href: "#" },
  { id: "artstation", label: "ArtStation", href: "https://www.artstation.com/miaro" },
//   { id: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/aromi" },
];

