import { useEffect } from "react";
import { getLenis } from "../lib/lenis";

export function useLenisStop(active) {
  useEffect(() => {
    if (!active) return;
    const lenis = getLenis();
    lenis?.stop();
    return () => lenis?.start();
  }, [active]);
}