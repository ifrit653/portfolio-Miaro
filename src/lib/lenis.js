import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis = null;
const tick = (time) => lenis?.raf(time * 1000);

export const getLenis = () => lenis;

export function createLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({ autoRaf: false, lerp: 0.1 }); // lower lerp = floatier
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function destroyLenis() {
  if (!lenis) return;
  gsap.ticker.remove(tick);
  gsap.ticker.lagSmoothing(500, 33); // GSAP defaults
  lenis.destroy();
  lenis = null;
}