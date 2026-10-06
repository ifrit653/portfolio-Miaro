import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/projects/Projects";
import Process from "./sections/process/Process";
import Gallery from "./sections/gallery/Gallery";
import Reviews from "./sections/reviews/Reviews";
import FinalCta from "./sections/FinalCta";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Process />
        <Gallery />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
