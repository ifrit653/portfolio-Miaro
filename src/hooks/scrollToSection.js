import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const NAVBAR_OFFSET = 72; // keep in sync with --navbar-height (4.5rem)

export function scrollToSection(id, { reduced = false } = {}) {
  const isHero = id === "hero";
  const el = document.getElementById(id);
  if (!isHero && !el) return;

  gsap.to(window, {
    duration: reduced ? 0 : 1,
    ease: "power3.inOut",
    scrollTo: isHero ? 0 : { y: el, offsetY: NAVBAR_OFFSET },
    onComplete: () =>
      history.replaceState(null, "", isHero ? window.location.pathname : `#${id}`),
  });
}