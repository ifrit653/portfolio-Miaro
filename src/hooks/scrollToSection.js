import { gsap, ScrollTrigger } from "../lib/gsap";
import { getLenis } from "../lib/lenis";

export const NAVBAR_OFFSET = 72; // keep in sync with --navbar-height (4.5rem)
const DURATION = 1.2;

export function scrollToY(y, { reduced = false, onComplete } = {}) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(y, { duration: DURATION, onComplete });
    return;
  }
  gsap.to(window, {
    duration: reduced ? 0 : 1,
    ease: "power3.inOut",
    scrollTo: y,
    onComplete,
  });
}

export function scrollToSection(id, { reduced = false } = {}) {
  const isHero = id === "hero";
  const el = document.getElementById(id);
  if (!isHero && !el) return;

  // A pinned section reports a wrong position while it is pinned,
  // so use its ScrollTrigger's start instead.
  const pin = ScrollTrigger.getById(id);
  const y = isHero
    ? 0
    : pin
      ? pin.start
      : el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

  scrollToY(y, {
    reduced,
    onComplete: () =>
      history.replaceState(history.state, "", isHero ? window.location.pathname : `#${id}`),
  });
}