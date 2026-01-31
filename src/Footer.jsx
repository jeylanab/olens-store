import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone, ArrowUpRight, Globe } from 'lucide-react';
import logoImg from "../assets/logo.svg"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-8 px-6 lg:px-12 relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-50 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 right-10 w-64 h-64 bg-blue-50 rounded-full blur-[100px] -z-10 opacity-40" />

      <div className="max-w-7xl mx-auto">
        
        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src={logoImg} alt="Olens Logo" className="h-8 w-auto" />
              <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Studio</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
              Olens Studio • Crafted for Greatness. <br />
              Building high-speed digital products for modern brands.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -3, backgroundColor: '#F0FDF4' }}
                  href="#"
                  className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-green-600 transition-all shadow-sm bg-white"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-8">Studio</h4>
            <ul className="space-y-4">
              {['Our Work', 'Services', 'Pricing', 'Process'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-500 hover:text-green-600 text-sm font-bold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (Addis Ababa Context) */}
          <div>
            <h4 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-8">Get in Touch</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-slate-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="text-sm font-bold text-slate-700">hello@olens.agency</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-slate-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp / Call</p>
                  <p className="text-sm font-bold text-slate-700">+251 924 423 956</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Location Card */}
          <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
            <div className="flex items-center gap-2 mb-4 text-green-600">
              <MapPin size={18} fill="currentColor" className="opacity-20" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Our Base</span>
            </div>
            <p className="text-sm font-bold text-slate-600 leading-relaxed">
              Bole, Addis Ababa <br />
              Ethiopia
            </p>
            <motion.a 
              href="https://maps.google.com"
              target="_blank"
              whileHover={{ x: 5 }}
              className="mt-4 flex items-center gap-2 text-xs font-black text-green-600 uppercase tracking-widest group"
            >
              View on Map <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </motion.a>
          </div>

        </div>

        {/* --- BOTTOM STRIP --- */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase">
            © {currentYear} Olens Studio • All Rights Reserved
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Globe size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Amharic / English</span>
            </div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter italic">
              Borderless Digital Experience
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;