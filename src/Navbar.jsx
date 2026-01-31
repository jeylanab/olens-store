import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react"; // Added MessageCircle for a social link
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.svg"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const colors = {
    forestGreen: '#15803D',
    ochreGold: '#D97706',
    charcoal: '#1C1C1C'
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" }, 
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  const menuVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    opened: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    opened: { opacity: 1, x: 0 }
  };

  return (
    <div className="fixed top-0 w-full z-[100] transition-all duration-300 px-4 md:px-10 py-4">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
          scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 py-2"
          : "bg-transparent py-4"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <img 
            src={logoImg} 
            alt="Olens Logo" 
            className="h-7 md:h-9 w-auto transition-transform group-hover:scale-105" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[11px] font-black uppercase tracking-widest text-gray-700 hover:text-[#15803D] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#15803D] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions - Replaced Login with Social/WhatsApp */}
        <div className="hidden md:flex items-center gap-6">
          <a 
            href="https://wa.me/YOURNUMBER" // Or your Telegram link
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#15803D] transition"
          >
            <MessageCircle size={16} /> Let's Talk
          </a>

          <Link to="/pricing"> {/* Redirects to quote section */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: colors.forestGreen }} // Changed to Green for "Go" signals
              className="px-6 py-3 rounded-xl text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center gap-2"
            >
              Join Free <ArrowRight size={14} />
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-900 z-[200]">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[140] md:hidden"
            />
            
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="fixed top-0 right-0 h-full w-[85%] bg-white z-[150] shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col p-10 md:hidden"
            >
              <div className="mt-20 flex flex-col gap-8">
                {navLinks.map((link) => (
                  <motion.div variants={linkVariants} key={link.name}>
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="text-4xl font-black text-gray-900 hover:text-[#15803D] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={linkVariants} className="mt-auto space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Ready to grow?</p>
                <Link to="/pricing" onClick={() => setOpen(false)}>
                  <button 
                    style={{ backgroundColor: colors.forestGreen }}
                    className="w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl flex items-center justify-center gap-3"
                  >
                    Join Free <ArrowRight />
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}