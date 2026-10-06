import { Clapperboard, Gamepad2, PenTool } from "lucide-react";

const photo = (seed) => `https://picsum.photos/seed/${seed}/1200/800`;

// TODO: replace icons with Miaro's custom ones, and images/text with real WIPs
export const PROCESSES = [
  {
    id: "illustration",
    icon: PenTool,
    title: { en: "2D Illustration", fr: "Illustration 2D" },
    summary: {
      en: "From a rough idea to a polished final piece.",
      fr: "D'une idée brute à une illustration finale soignée.",
    },
    steps: [
      {
        id: "sketch",
        label: { en: "Sketch", fr: "Croquis" },
        text: {
          en: "Loose shapes and thumbnails to explore composition, pose and mood.",
          fr: "Formes libres et vignettes pour explorer la composition, la pose et l'ambiance.",
        },
        image: photo("illustration-sketch"),
      },
      {
        id: "lineart",
        label: { en: "Lineart", fr: "Lineart" },
        text: {
          en: "Clean, confident lines built over the chosen sketch.",
          fr: "Des lignes propres et assurées, construites sur le croquis retenu.",
        },
        image: photo("illustration-lineart"),
      },
      {
        id: "color",
        label: { en: "Color", fr: "Couleur" },
        text: {
          en: "Flat colors first, then shading and lighting to give depth.",
          fr: "Aplats de couleur d'abord, puis ombres et lumières pour donner de la profondeur.",
        },
        image: photo("illustration-color"),
      },
      {
        id: "final",
        label: { en: "Final", fr: "Final" },
        text: {
          en: "Last details, effects and color adjustments before delivery.",
          fr: "Derniers détails, effets et ajustements de couleur avant la livraison.",
        },
        image: photo("illustration-final"),
      },
    ],
  },
  {
    id: "game-assets",
    icon: Gamepad2,
    title: { en: "Game Assets", fr: "Assets de jeu" },
    summary: {
      en: "Consistent, game-ready art built around your technical needs.",
      fr: "Des visuels cohérents et prêts pour le jeu, pensés autour de vos contraintes techniques.",
    },
    steps: [
      {
        id: "concept",
        label: { en: "Concept", fr: "Concept" },
        text: {
          en: "Defining the style, palette and sizes the whole asset set will follow.",
          fr: "Définition du style, de la palette et des tailles que suivra tout l'ensemble.",
        },
        image: photo("assets-concept"),
      },
      {
        id: "base",
        label: { en: "Base sprites", fr: "Sprites de base" },
        text: {
          en: "Drawing each asset at its final resolution, pixel by pixel.",
          fr: "Dessin de chaque asset à sa résolution finale, pixel par pixel.",
        },
        image: photo("assets-base"),
      },
      {
        id: "variants",
        label: { en: "Variants", fr: "Variantes" },
        text: {
          en: "Color variants, states and small details that bring the set to life.",
          fr: "Variantes de couleur, états et petits détails qui donnent vie à l'ensemble.",
        },
        image: photo("assets-variants"),
      },
      {
        id: "export",
        label: { en: "Export", fr: "Export" },
        text: {
          en: "Sprite sheets and files organized and exported for your engine.",
          fr: "Spritesheets et fichiers organisés et exportés pour votre moteur de jeu.",
        },
        image: photo("assets-export"),
      },
    ],
  },
  {
    id: "animation",
    icon: Clapperboard,
    title: { en: "2D Animation", fr: "Animation 2D" },
    summary: {
      en: "Frame-by-frame motion with clear timing and personality.",
      fr: "Un mouvement image par image, avec un timing clair et de la personnalité.",
    },
    steps: [
      {
        id: "storyboard",
        label: { en: "Storyboard", fr: "Storyboard" },
        text: {
          en: "Key poses and timing planned before any frame is drawn.",
          fr: "Poses clés et timing planifiés avant de dessiner la moindre image.",
        },
        image: photo("animation-storyboard"),
      },
      {
        id: "keyframes",
        label: { en: "Keyframes", fr: "Keyframes" },
        text: {
          en: "The main poses that define the action and its rhythm.",
          fr: "Les poses principales qui définissent l'action et son rythme.",
        },
        image: photo("animation-keyframes"),
      },
      {
        id: "inbetweens",
        label: { en: "In-betweens", fr: "Intervalles" },
        text: {
          en: "Frames added between keys for smooth, readable movement.",
          fr: "Images ajoutées entre les clés pour un mouvement fluide et lisible.",
        },
        image: photo("animation-inbetweens"),
      },
      {
        id: "final",
        label: { en: "Final", fr: "Final" },
        text: {
          en: "Cleanup, color and export as a loop, GIF or sprite sheet.",
          fr: "Nettoyage, couleur et export en boucle, GIF ou spritesheet.",
        },
        image: photo("animation-final"),
      },
    ],
  },
];