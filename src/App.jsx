import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Section from "./components/ui/Section";
import Projects from "./sections/projects/Projects";
import Process from "./sections/process/Process";
import Gallery from "./sections/gallery/Gallery";

const PLACEHOLDERS = ["reviews"];

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
        {/* {PLACEHOLDERS.map((id) => (
          <Section key={id} id={id} title={id}>
            <div style={{ minHeight: "70vh" }} />
          </Section>
        ))} */}
      </main>
    </>
  );
}
