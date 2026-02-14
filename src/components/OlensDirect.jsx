import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Factory, Truck, UserCheck } from 'lucide-react';

const OlensDirect = () => {
  return (
    <section className="bg-white py-20 px-6 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">
            How We <span className="text-[#ccff00] drop-shadow-[2px_2px_0px_#000]">Work.</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">
            Straight from the source. No games.
          </p>
        </div>

        {/* --- THE DIRECT FLOW --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 text-[#ccff00]">
              <Factory size={28} />
            </div>
            <h3 className="font-black uppercase tracking-tighter text-xl mb-3">Wholesale Source</h3>
            <p className="text-xs text-slate-500 font-bold uppercase italic leading-relaxed">
              We buy in bulk directly from the big suppliers. We cut out the middleman so you don't pay their extra fees.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-8 bg-[#ccff00] rounded-[3rem] border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 text-[#ccff00]">
              <Truck size={28} />
            </div>
            <h3 className="font-black uppercase tracking-tighter text-xl mb-3">Addis Warehouse</h3>
            <p className="text-xs text-black font-bold uppercase italic leading-relaxed">
              Everything is already here in Addis Ababa. No waiting for weeks. Once you order, we grab it from our shelf.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 text-[#ccff00]">
              <UserCheck size={28} />
            </div>
            <h3 className="font-black uppercase tracking-tighter text-xl mb-3">Direct To You</h3>
            <p className="text-xs text-slate-500 font-bold uppercase italic leading-relaxed">
              Our riders deliver straight to your door. You get premium quality clothes at the best price in the city.
            </p>
          </div>

        </div>

        {/* --- SUMMARY BOX --- */}
        <div className="mt-16 p-8 bg-black rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-white">
              <p className="text-[#ccff00] font-black text-2xl uppercase tracking-tighter">Real Quality. Real Prices.</p>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">Stop paying double at the mall. Buy direct.</p>
           </div>
           <button className="bg-[#ccff00] text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:scale-105 transition-transform">
              Start Shopping <ArrowRight size={16} />
           </button>
        </div>

      </div>
    </section>
  );
};

export default OlensDirect;