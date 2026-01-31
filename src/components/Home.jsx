import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Globe, ArrowUpRight, Plus, Scan, Sparkles } from 'lucide-react';

const LabHome = () => {
  const { scrollY } = useScroll();
  
  // Parallax effect for the background image
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
  const textScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <div className="bg-white text-black selection:bg-[#ccff00] selection:text-black pt-[100px] overflow-hidden">
      
      {/* --- 1. HERO: IMAGE BACKGROUND & TEXT OVERLAY --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        {/* Animated Image Background */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-10"
            alt="Abstract Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </motion.div>

        <div className="relative z-10 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <Sparkles size={16} className="text-[#ccff00] fill-[#ccff00]" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">
              System Release v2.06 / Addis Ababa
            </span>
          </motion.div>

          <motion.div style={{ scale: textScale }}>
            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-[14vw] md:text-[10vw] font-black leading-[0.75] tracking-tighter uppercase"
            >
              PURE <br /> 
              <span className="text-[#ccff00] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">MOTION.</span>
            </motion.h1>
          </motion.div>

          <div className="mt-16 flex flex-wrap gap-6 items-center">
            <motion.button 
              whileHover={{ scale: 1.05, x: 10 }}
              className="bg-black text-white px-14 py-6 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-4 group transition-all"
            >
              Begin Exploration <ArrowUpRight className="group-hover:text-[#ccff00] transition-colors" />
            </motion.button>
            
            <div className="h-14 w-[1px] bg-slate-200 hidden md:block" />
            
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-[#ccff00] bg-black px-2 py-0.5 self-start uppercase tracking-widest mb-1">
                Network Status
              </span>
              <span className="text-sm font-black uppercase italic tracking-tighter">
                Active in 12 Regional Hubs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. TECH-BENTO: HIGH CONTRAST CARDS --- */}
      <section className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Featured Card with Scan Effect */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="md:col-span-2 relative h-[600px] rounded-[3.5rem] bg-slate-50 overflow-hidden group border border-slate-100"
        >
          <img 
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1000" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            alt="Tech Feature"
          />
          {/* Animated Scanning Line */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-[#ccff00] z-20 shadow-[0_0_15px_#ccff00]"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
          <div className="absolute top-12 left-12 text-white group-hover:text-black transition-colors duration-500">
            <Scan className="mb-6" size={40} />
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Bio-Tech <br/> Fabric.</h2>
          </div>
        </motion.div>

        {/* Info Card 01 */}
        <div className="md:col-span-1 rounded-[3.5rem] bg-[#ccff00] p-12 flex flex-col justify-between border border-black/5">
          <Shield size={40} className="text-black" />
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">Original <br/> Blueprint.</h3>
            <p className="text-[10px] font-bold text-black/60 uppercase tracking-widest leading-relaxed">
              Every item is cross-referenced with the Olens Lab database. Zero replicas. 100% verified.
            </p>
          </div>
        </div>

        {/* Info Card 02 */}
        <div className="md:col-span-1 rounded-[3.5rem] bg-black text-white p-12 flex flex-col justify-between group overflow-hidden relative">
          <Zap size={40} className="text-[#ccff00] fill-[#ccff00]" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -bottom-20 w-60 h-60 border border-white/10 rounded-full flex items-center justify-center"
          >
            <div className="w-40 h-40 border border-white/5 rounded-full" />
          </motion.div>
          <h3 className="text-4xl font-black uppercase tracking-tighter relative z-10">48HR <br/> LOGIC.</h3>
        </div>
      </section>

      {/* --- 3. SYSTEM DROPS: THE GRID --- */}
      <section className="py-32 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Live Inventory</span>
            </div>
            <h2 className="text-6xl font-black tracking-tighter italic uppercase">System_Drops</h2>
          </div>
          <div className="flex gap-4">
             {['All', 'Outerwear', 'Hardware'].map(tag => (
               <button key={tag} className="px-8 py-3 rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-[#ccff00] transition-all">
                 {tag}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[1, 2, 3].map((item) => (
            <motion.div 
              key={item} 
              whileHover={{ scale: 0.98 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] bg-slate-50 rounded-[4rem] overflow-hidden border border-slate-100 p-8">
                {/* Product Tag */}
                <div className="absolute top-10 left-10 bg-white border border-slate-200 px-4 py-1.5 rounded-full z-10">
                   <span className="text-[8px] font-black uppercase tracking-[0.2em]">Batch_00{item}</span>
                </div>
                
                <img 
                  src={`https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800`} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-all duration-700" 
                  alt="Product"
                />

                {/* Buy Button Overlay */}
                <div className="absolute inset-0 bg-[#ccff00]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <motion.button 
                    whileHover={{ scale: 1.1 }}
                    className="bg-black text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl"
                   >
                     Deploy to Bag +
                   </motion.button>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#ccff00] bg-black px-2 py-0.5 self-start mb-2">NEW ARRIVAL</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Olens Core Shell</h3>
                </div>
                <span className="text-xl font-black italic">2,400 ETB</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LabHome;