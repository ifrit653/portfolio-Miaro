// src/App.jsx
import Navbar from "./components/layout/Navbar";
import Section from "./components/ui/Section";
import { SECTION_IDS } from "./data/site";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        {SECTION_IDS.map((id) => (
          <Section key={id} id={id} title={id}>
            <div style={{ minHeight: "70vh" }} />
          </Section>
        ))}
      </main>
    </>
  );
}
