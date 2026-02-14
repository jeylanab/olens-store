import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProfileDrawer from "./ProfileDrawer"; 
import logoImg from "../assets/logo.svg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Added mobile menu state
  const { scrollY } = useScroll();
  
  const isAdmin = user?.email === "your-email@gmail.com";
  
  // Animation Transforms
  const navTop = useTransform(scrollY, [0, 50], [36, 12]);
  const navWidth = useTransform(scrollY, [0, 50], ["100%", "94%"]);
  const isAtTop = useTransform(scrollY, [0, 20], [1, 0]);

  const navLinks = [
    { name: "New", href: "/new" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Sale", href: "/sale" },
  ];

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR (Fades on scroll) */}
      <motion.div 
        style={{ opacity: isAtTop }} 
        className="fixed top-0 w-full bg-black text-[#ccff00] z-[110] h-9 flex items-center justify-center text-[8px] font-black uppercase tracking-[0.3em]"
      >
        Free Shipping Within Addis Ababa • Authentic Premium Apparel
      </motion.div>

      {/* 2. FLOATING HEADER */}
      <motion.header 
        style={{ width: navWidth, top: navTop }} 
        className="fixed left-1/2 -translate-x-1/2 z-[100] bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-full shadow-sm transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          
          {/* Desktop Nav */}
          <div className="flex-1 hidden lg:flex items-center gap-6">
            {navLinks.map(m => (
              <Link 
                key={m.name} 
                to={m.href} 
                className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors"
              >
                {m.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex-1">
            <button onClick={() => setMenuOpen(true)} className="p-2">
              <Menu size={20} />
            </button>
          </div>

          {/* Center Logo */}
          <Link to="/" className="shrink-0 flex items-center justify-center">
            <img src={logoImg} alt="Olens" className="h-5 brightness-0" />
          </Link>

          {/* Right Actions */}
          <div className="flex-1 flex items-center justify-end gap-2">
            {user ? (
              <button 
                onClick={() => setProfileOpen(true)} 
                className="h-9 w-9 rounded-full border-2 border-[#ccff00] overflow-hidden hover:scale-105 transition-transform active:scale-95 shadow-sm"
              >
                <img src={user.photoURL} className="h-full w-full object-cover" alt="profile" />
              </button>
            ) : (
              <button 
                onClick={() => navigate("/login")} 
                className="hidden md:block bg-black text-white px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all"
              >
                Join Olens
              </button>
            )}
            
            <button className="relative p-2.5 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
              <ShoppingBag size={18} />
              <span className="absolute top-1 right-1 bg-black text-[#ccff00] text-[8px] h-4 w-4 rounded-full flex items-center justify-center border border-white font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* 3. MOBILE NAVIGATION OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[200] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <img src={logoImg} className="h-5 brightness-0" alt="logo" />
              <button onClick={() => setMenuOpen(false)} className="p-3 bg-slate-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map(m => (
                <Link 
                  key={m.name} 
                  to={m.href} 
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter hover:text-[#ccff00] transition-colors"
                >
                  {m.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
               {!user && (
                 <button 
                  onClick={() => { navigate("/login"); setMenuOpen(false); }}
                  className="w-full py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs"
                 >
                   Sign In
                 </button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. PROFILE DRAWER */}
      <AnimatePresence>
        {profileOpen && (
          <ProfileDrawer 
            onClose={() => setProfileOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}