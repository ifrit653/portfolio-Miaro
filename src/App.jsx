import { Navigate, Route, Routes } from "react-router-dom";
import SmoothScroll from "./components/layout/SmoothScroll";
import RouteEffects from "./components/layout/RouteEffects";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./sections/gallery/GalleryPage";

export default function App() {
  return (
    <>
      <SmoothScroll />
      <RouteEffects />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
