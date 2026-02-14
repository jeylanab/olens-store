import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductGrid from "./components/ProductGrid";
import Auth from "./pages/Auth"; // Import your new Login page

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#ccff00] selection:text-black">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />

          {/* AUTHENTICATION ROUTE */}
          <Route path="/login" element={<Auth />} />

          {/* CATEGORY ROUTES */}
          <Route path="/new" element={<ProductGrid title="New Arrivals" />} />
          <Route path="/men" element={<ProductGrid title="Men's Collection" />} />
          <Route path="/women" element={<ProductGrid title="Women's Collection" />} />
          <Route path="/collections" element={<ProductGrid title="All Collections" />} />

          {/* TRACKING SYSTEM */}
          <Route path="/track" element={
            <div className="pt-44 px-10 min-h-screen flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Tracking_System</h1>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">Protocol Under Development</p>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}