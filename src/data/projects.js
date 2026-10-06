const img = (seed, n) =>
  Array.from({ length: n }, (_, i) => ({
    src: `https://picsum.photos/seed/${seed}-${i + 1}/1200/800`,
  }));

// TODO: replace with Miaro's real projects (no client names, per spec)
export const PROJECTS = [
  {
    id: "pixel-quest",
    title: "Pixel Quest",
    type: { en: "Game assets", fr: "Assets de jeu" },
    period: "2025",
    description: {
      en: "A full set of tiles, characters and UI elements for a retro platformer, drawn in a limited palette.",
      fr: "Un ensemble complet de tuiles, personnages et éléments d'interface pour un platformer rétro, dessiné avec une palette limitée.",
    },
    skills: ["pixelArt", "gameAssets", "animation"],
    images: img("pixel-quest", 3),
  },
  {
    id: "echoes-of-dawn",
    title: "Echoes of Dawn",
    type: { en: "Character design", fr: "Character design" },
    period: "2024 – 2025",
    description: {
      en: "Design of the main cast for an original fantasy story, from first sketches to final turnarounds.",
      fr: "Conception des personnages principaux d'une histoire fantasy originale, des premiers croquis aux turnarounds finaux.",
    },
    skills: ["characterDesign", "illustration"],
    images: img("echoes-of-dawn", 2),
  },
  {
    id: "tiny-kingdoms",
    title: "Tiny Kingdoms",
    type: { en: "2D animation", fr: "Animation 2D" },
    period: "2024",
    description: {
      en: "Short looping animations for a mobile strategy game: idle cycles, attacks and small environmental effects.",
      fr: "Courtes animations en boucle pour un jeu de stratégie mobile : cycles d'attente, attaques et petits effets d'environnement.",
    },
    skills: ["animation", "illustration"],
    images: img("tiny-kingdoms", 1),
  },
  {
    id: "midnight-tales",
    title: "Midnight Tales",
    type: { en: "Manga / Comics", fr: "Manga / BD" },
    period: "2023 – 2024",
    description: {
      en: "A short comic anthology with storyboards, inked pages and a consistent moody palette across every chapter.",
      fr: "Une courte anthologie de BD avec storyboards, pages encrées et une palette sombre cohérente sur tous les chapitres.",
    },
    skills: ["mangaBd", "illustration", "characterDesign"],
    images: img("midnight-tales", 4),
  },
];