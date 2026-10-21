const COMBOS = [
  ["fanart", "characterDesign"], ["pixelArt"], ["pixelArt", "animation"],
  ["sketch"], ["sketch", "characterDesign"], ["wip", "characterDesign"],
  ["background"], ["background", "pixelArt"], ["storyboard"],
  ["storyboard", "sketch"], ["animation"], ["fanart"],
  ["fanart", "sketch"], ["characterDesign"], ["wip"],
  ["wip", "background"], ["pixelArt", "background"], ["animation", "wip"],
  ["fanart", "wip"], ["sketch"], ["background"],
  ["characterDesign", "sketch"], ["pixelArt", "animation"], ["storyboard"],
  ["fanart", "background"], ["animation", "storyboard"], ["characterDesign"],
  ["pixelArt"], ["wip", "sketch"], ["fanart", "pixelArt"],
];

export const GALLERY_TAGS = [
  "fanart",
  "pixelArt",
  "wip",
  "sketch",
  "storyboard",
  "characterDesign",
  "background",
  "animation",
];

export const GALLERY = COMBOS.map((tags, i) => {
  const n = i + 1;
  return {
    id: `gallery-${n}`,
    tags,
    alt: `Artwork ${n}`,
    thumb: `https://picsum.photos/seed/gallery-${n}/600/600`,
    src: `https://picsum.photos/seed/gallery-${n}/1400/1000`,
  };
});

// The 6 images shown on the home page (TODO: Miaro picks her best six)
export const FEATURED_IDS = [
  "gallery-1", "gallery-6", "gallery-8", "gallery-12", "gallery-17", "gallery-22",
];
export const FEATURED = FEATURED_IDS
  .map((id) => GALLERY.find((item) => item.id === id))
  .filter(Boolean);