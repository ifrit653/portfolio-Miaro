import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "../../lib/gsap";
import { getLenis } from "../../lib/lenis";
import { scrollToSection } from "../../lib/scrollToSection";

export default function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = hash.slice(1);

    if (!id) {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      return;
    }

    // give the new page a moment to mount and build its ScrollTriggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToSection(id);
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
