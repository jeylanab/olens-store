import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import your new Footer
import Home from "./components/Home";


// Ensure your logo is available globally if needed, 
// though it is usually imported directly in Navbar/Footer
import logoImg from "./assets/logo.svg"; 

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* The Navbar stays at the top. 
          Make sure Navbar has 'fixed' or 'sticky' class if you want it to follow scroll. 
      */}
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
      </main>

      {/* The Footer is placed outside <Routes> so it appears on every page.
          This gives your site a professional, consistent anchor.
      */}
      <Footer />
    </div>
  );
}