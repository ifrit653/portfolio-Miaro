import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/projects/Projects";
import Process from "../sections/process/Process";
import GalleryShowcase from "../sections/gallery/GalleryShowcase";
import Reviews from "../sections/reviews/Reviews";
import FinalCta from "../sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Process />
      <GalleryShowcase />
      <Reviews />
      <FinalCta />
    </>
  );
}
