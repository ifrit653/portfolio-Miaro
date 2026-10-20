import { useEffect } from "react";
import { createLenis, destroyLenis } from "../../lib/lenis";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// Renders nothing. With reduced motion, Lenis is never created and scrolling stays native.
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    createLenis();
    return destroyLenis;
  }, [reduced]);

  return null;
}
