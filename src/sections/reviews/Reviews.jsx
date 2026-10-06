import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import Section from "../../components/ui/Section";
import Carousel from "../../components/ui/Carousel";
import ScoreBlock from "./ScoreBlock";
import ReviewCard from "./ReviewCard";
import { REVIEWS } from "../../data/reviews";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";

export default function Reviews() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const root = useRef(null);

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
    <Section id="reviews" title={t("reviews.title")}>
      <div ref={root}>
        <ScoreBlock />
        <Carousel
          label={t("reviews.title")}
          autoplay={7000}
          slideBasis="min(85%, 520px)"
        >
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
