import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import Section from "../../components/ui/Section";
import Carousel from "../../components/ui/Carousel";
import Lightbox from "../../components/ui/Lightbox";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../../data/projects";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";

export default function Projects() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const root = useRef(null);

  // `project` is kept after closing so the lightbox can play its exit animation
  const [lb, setLb] = useState({ open: false, project: null, index: 0 });

  const images =
    lb.project?.images.map((image) => ({
      src: image.src,
      alt: lb.project.title,
    })) ?? [];

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(root.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <Section id="projects" title={t("projects.title")}>
      <div ref={root}>
        <Carousel label={t("projects.title")} paused={lb.open}>
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenImages={(index) => setLb({ open: true, project, index })}
            />
          ))}
        </Carousel>
      </div>

      <Lightbox
        images={images}
        index={lb.index}
        open={lb.open}
        onIndexChange={(index) => setLb((s) => ({ ...s, index }))}
        onOpenChange={(open) => setLb((s) => ({ ...s, open }))}
      />
    </Section>
  );
}
