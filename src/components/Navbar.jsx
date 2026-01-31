import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Search, X, ArrowRight, LogIn } from "lucide-react";
import logoImg from "../assets/logo.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const { scrollY } = useScroll();
  const searchInputRef = useRef(null);

  // Visibility logic for promo & category strip
  const isAtTop = useTransform(scrollY, [0, 20], [1, 0]);
  const tickerHeight = useTransform(scrollY, [0, 20], [40, 0]);

  // Transitioning to floating capsule
  const navTop = useTransform(scrollY, [0, 80], [40, 15]);
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "94%"]);
  const navShadow = useTransform(scrollY, [0, 100], ["0px 0px 0px rgba(0,0,0,0)", "0px 15px 30px rgba(0,0,0,0.08)"]);
  const capsuleBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.98)"]);

  const menuItems = [
    { name: "New Arrivals", href: "/new" },
    { name: "Ladies", href: "/ladies" },
    { name: "Men", href: "/men" },
    { name: "Baby", href: "/baby" },
    { name: "Accessories", href: "/accessories" },
    { name: "Sale", href: "/sale", highlight: true },
  ];

  return (
    <>
      {/* --- 1. PROMO TICKER --- */}
      <motion.div
        style={{ height: tickerHeight, opacity: isAtTop }}
        className="fixed top-0 w-full bg-[#111] text-[#ccff00] z-[110] flex items-center overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-20 whitespace-nowrap px-10 text-[9px] font-black uppercase tracking-[0.4em]"
        >
          {[1, 2, 3].map((i) => (
            <span key={i}>Nationwide Delivery • Fast Addis Shipping • New Drop Live</span>
          ))}
        </motion.div>
      </motion.div>

      {/* --- 2. THE FLOATING NAV --- */}
      <motion.header
        style={{
          width: navWidth,
          top: navTop,
          backgroundColor: capsuleBg,
          boxShadow: navShadow,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-[100] backdrop-blur-xl rounded-2xl lg:rounded-[2.5rem] border border-slate-100 transition-all duration-500"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* LEFT: EXPANDING SEARCH BAR */}
          <div className="flex-1 hidden lg:flex items-center">
            <motion.div 
              initial={false}
              animate={{ width: searchActive ? "300px" : "100px" }}
              className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-colors ${searchActive ? 'border-black bg-white' : 'border-transparent hover:bg-slate-50'}`}
              onClick={() => {
                setSearchActive(true);
                searchInputRef.current?.focus();
              }}
            >
              <Search size={18} className={`${searchActive ? 'text-black' : 'text-slate-400'}`} />
              <input 
                ref={searchInputRef}
                onBlur={() => setSearchActive(false)}
                type="text" 
                placeholder="FIND SOMETHING..." 
                className={`bg-transparent outline-none text-[10px] font-black uppercase tracking-widest placeholder:text-slate-300 w-full ${!searchActive && 'cursor-pointer'}`}
              />
            </motion.div>
          </div>

          {/* CENTER: LOGO */}
          <motion.a 
            href="/" 
            animate={{ scale: searchActive ? 0.9 : 1, opacity: searchActive ? 0.5 : 1 }}
            className="flex flex-col items-center flex-shrink-0"
          >
            <img src={logoImg} alt="Olens" className="h-6 md:h-8 w-auto brightness-0" />
            <motion.div style={{ opacity: isAtTop }} className="flex items-center gap-1 mt-1">
              <span className="text-[8px] font-black uppercase tracking-[0.6em] text-slate-400">Store</span>
              <span className="h-1 w-1 rounded-full bg-[#ccff00]" />
            </motion.div>
          </motion.a>

          {/* RIGHT: SMART ACTIONS */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
            <a href="/login" className="hidden xl:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-black transition-colors">
              <LogIn size={14} />
              Login
            </a>

            {/* Responsive Get Started Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#ccff00] text-black px-4 md:px-6 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all whitespace-nowrap"
            >
              <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Get Started</span>
              <ArrowRight size={14} />
            </motion.button>

            <div className="relative p-2.5 bg-slate-50 rounded-full cursor-pointer hover:bg-black group transition-all">
              <ShoppingBag size={18} className="group-hover:text-[#ccff00] transition-colors" />
              <span className="absolute -top-1 -right-1 bg-black text-[#ccff00] text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-white">
                0
              </span>
            </div>

            <button onClick={() => setOpen(true)} className="p-2 flex flex-col gap-1.5 items-end group">
              <span className="h-[2px] w-6 bg-black rounded-full transition-all" />
              <span className="h-[2px] w-4 bg-black rounded-full group-hover:w-6 transition-all" />
            </button>
          </div>
        </div>

        {/* DYNAMIC CATEGORY STRIP */}
        <motion.div 
          style={{ opacity: isAtTop, height: useTransform(scrollY, [0, 20], ["auto", 0]) }}
          className="hidden lg:flex justify-center pb-4 pt-0 gap-8 overflow-hidden"
        >
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`text-[10px] font-black uppercase tracking-[0.15em] relative group ${item.highlight ? 'text-red-500' : 'text-slate-500 hover:text-black transition-colors'}`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ccff00] transition-all group-hover:w-full" />
            </a>
          ))}
        </motion.div>
      </motion.header>

      {/* --- OVERLAY MENU --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[200] p-6 md:p-10 flex flex-col pointer-events-auto shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-10">
               <div className="flex flex-col">
                  <span className="text-2xl font-black uppercase leading-none">Olens</span>
                  <span className="text-[10px] font-bold text-[#ccff00] bg-black px-2 py-0.5 mt-1 self-start tracking-[0.4em] uppercase">Store.</span>
               </div>
               <button onClick={() => setOpen(false)} className="p-4 bg-slate-100 rounded-full hover:bg-[#ccff00] hover:text-black transition-all group">
                  <X size={24} className="group-hover:rotate-90 transition-transform" />
               </button>
            </div>

            <div className="mt-12 flex flex-col gap-4 overflow-y-auto">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  href={item.href}
                  className={`text-5xl md:text-7xl font-black tracking-tighter uppercase italic hover:translate-x-4 transition-transform ${item.highlight ? 'text-red-500' : 'text-black'}`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
               <button className="py-5 rounded-2xl bg-slate-100 font-black uppercase text-[10px] tracking-widest border border-slate-200">Login</button>
               <button className="py-5 rounded-2xl bg-black text-[#ccff00] font-black uppercase text-[10px] tracking-widest">Join Olens</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}