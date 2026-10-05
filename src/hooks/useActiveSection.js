import { useEffect, useState } from "react";

// `ids` must be a stable reference (module constant)
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    // Thin band around the middle of the viewport: the section crossing it is "active"
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -54% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}