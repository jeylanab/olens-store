import React from 'react';
import { motion } from "framer-motion";
import { Plus, ShoppingCart } from "lucide-react";
import { products } from '../data/data'; 

export default function ProductGrid() {
  return (
    <div className="bg-white px-4 py-24 md:px-10">
      
      {/* --- HEADER: Simple & Clean --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
          New <span className="text-slate-300">Arrivals</span>
        </h2>
      </div>

      {/* --- GRID: Mobile 2-col | Desktop 4-col --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 rounded-xl mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Simple Tag */}
              {product.tag && (
                <div className="absolute top-3 left-3 bg-black text-[#ccff00] text-[8px] font-black px-2 py-1 uppercase rounded-md">
                  {product.tag}
                </div>
              )}

              {/* Desktop Hover Action */}
              <button className="absolute bottom-4 right-4 bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <Plus size={20} />
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight">{product.name}</h3>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{product.category}</p>
                </div>
                <p className="text-sm font-black tracking-tighter">3,500 <span className="text-[9px]">ETB</span></p>
              </div>
              
              {/* Simple Button for Mobile visibility + Desktop Hover */}
              <button className="w-full mt-2 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black hover:text-[#ccff00] transition-colors">
                <ShoppingCart size={12} />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- FOOTER: Clean and Grounded --- */}
      <div className="mt-24 text-center border-t border-slate-100 pt-12">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[.5em]">Olens System Hub // Addis Ababa</p>
      </div>
    </div>
  );
}