import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone, ArrowUpRight, Globe, ShieldCheck, Truck } from 'lucide-react';
import logoImg from "../assets/logo.svg"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-8 px-6 lg:px-12 relative overflow-hidden border-t border-slate-100">
      
      {/* High-Contrast "Scanner" Line at the very top of footer */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto">
        
        {/* --- TOP: VALUE PROPOSITION BANNERS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 border-b border-slate-50 pb-20">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-[#ccff00] rounded-2xl text-black">
                    <Truck size={24} />
                </div>
                <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest">Global Sourcing</h5>
                    <p className="text-xs text-slate-400 font-bold uppercase">Regional Hub Logistics</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-black rounded-2xl text-[#ccff00]">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest">Verified Authentic</h5>
                    <p className="text-xs text-slate-400 font-bold uppercase">100% Lab Inspected</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-2xl text-black">
                    <MapPin size={24} />
                </div>
                <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest">Addis Express</h5>
                    <p className="text-xs text-slate-400 font-bold uppercase">Same-Day Availability</p>
                </div>
            </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src={logoImg} alt="Olens Logo" className="h-8 w-auto brightness-0" />
              <span className="text-[10px] font-black bg-black text-[#ccff00] px-2 py-0.5 tracking-widest uppercase">Store.</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed mb-8 font-black uppercase tracking-tighter italic">
              Olens Store • The Digital Backbone of Modern Fashion. <br />
              Sourcing the future for Ethiopia.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -3, backgroundColor: '#ccff00', color: '#000' }}
                  href="#"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 transition-all bg-white"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Shopping Resources */}
          <div className="lg:pl-10">
            <h4 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['New Arrivals', 'Best Sellers', 'Release Radar', 'The Archive'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-black text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 group">
                    <div className="w-0 h-[2px] bg-[#ccff00] group-hover:w-3 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-8">Support Node</h4>
            <ul className="space-y-4">
              {['Track Order', 'Returns Policy', 'Shipping Rates', 'Authenticity'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-black text-[10px] font-black uppercase tracking-widest transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location/Contact */}
          <div className="bg-black p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
            
            <h4 className="text-[#ccff00] font-black text-[10px] uppercase tracking-[0.3em] mb-6">Contact_Terminal</h4>
            <div className="space-y-4 relative z-10">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase">WhatsApp</span>
                <span className="text-sm font-black">+251 924 423 956</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase">Base_Coordinates</span>
                <span className="text-sm font-black italic uppercase">Bole, Addis Ababa</span>
              </div>
              <motion.a 
                href="#"
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-[10px] font-black text-[#ccff00] uppercase tracking-widest mt-4"
              >
                Inquire System <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </div>

        </div>

        {/* --- BOTTOM STRIP --- */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[9px] font-black tracking-[0.2em] uppercase">
            © {currentYear} Olens Store • Internal Distribution 
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Globe size={14} className="text-[#ccff00]" />
              <span className="text-[9px] font-black uppercase tracking-widest">Regional Node: ET_ADD</span>
            </div>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
              Latency: 48HRS Hub-to-Hub
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;