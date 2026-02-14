import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
// Import the data you created
import { products } from '../data/data'; 
import  OlensDirect from './OlensDirect';

const Home = () => {
  // Extract just the image paths from your data file
  const images = products.map(product => product.image);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper to get side images
  const getIndex = (offset) => (currentIndex + offset + images.length) % images.length;

  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Carousel Container */}
        <div className="flex items-center justify-center gap-4 md:gap-8 h-[500px] md:h-[650px]">
          
          {/* LEFT CARD (Ambient) */}
          <motion.div 
            key={`left-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.4, x: 0 }}
            className="hidden md:block w-1/4 h-[400px] rounded-[3rem] overflow-hidden grayscale border border-slate-100"
          >
            <img src={images[getIndex(-1)]} className="w-full h-full object-cover" alt="prev-slide" />
          </motion.div>

          {/* CENTER CARD (Focus) */}
          <div className="relative w-full md:w-2/5 h-full flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`center-${currentIndex}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex-1 rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl"
              >
                <img src={images[currentIndex]} className="w-full h-full object-cover" alt="active-slide" />
              </motion.div>
            </AnimatePresence>

            {/* Content Box Overlayed or Below */}
            <motion.div 
              className="bg-black text-white p-8 rounded-[3rem] flex flex-col items-center text-center gap-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h3 className="text-2xl font-black uppercase tracking-tighter">
                {products[currentIndex].title} {/* Dynamically show title from data.js */}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px]">
                {products[currentIndex].category} — Verified Exclusive
              </p>
              <button className="bg-[#ccff00] text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
                Shop Drop <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

          {/* RIGHT CARD (Ambient) */}
          <motion.div 
            key={`right-${currentIndex}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.4, x: 0 }}
            className="hidden md:block w-1/4 h-[400px] rounded-[3rem] overflow-hidden grayscale border border-slate-100"
          >
            <img src={images[getIndex(1)]} className="w-full h-full object-cover" alt="next-slide" />
          </motion.div>

        </div>

        {/* CONTROLS */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 md:px-10 pointer-events-none">
          <button 
            onClick={handlePrev} 
            className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-auto hover:bg-[#ccff00] transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext} 
            className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-auto hover:bg-[#ccff00] transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* PROGRESS DOTS */}
        <div className="flex justify-center gap-2 mt-12">
          {images.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-black' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>

      </div>
      {/* --- OLENS DIRECT PROMO --- */}
      <div className="mt-32">
        <OlensDirect />
      </div>
    </section>
  );
};

export default Home;