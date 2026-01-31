import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Palette, MapPin, Zap, ArrowUpRight } from 'lucide-react';

const Services = () => {
  const colors = {
    forestGreen: '#15803D',
    ochreGold: '#D97706',
    charcoal: '#1C1C1C'
  };

  const services = [
    {
      title: "Web Development",
      desc: "High-performance, mobile-first websites tailored for the Ethiopian market and beyond.",
      icon: <Globe size={28} />,
      size: "md:col-span-2", // This makes the first card wider
      bg: "bg-slate-900",
      textColor: "text-white"
    },
    {
      title: "Brand Identity",
      desc: "Iconic logos and visual systems that tell your story.",
      icon: <Palette size={28} />,
      size: "md:col-span-1",
      bg: "bg-green-50",
      textColor: "text-slate-900"
    },
    {
      title: "Local SEO",
      desc: "Dominate Google Search and Maps so customers find you first.",
      icon: <MapPin size={28} />,
      size: "md:col-span-1",
      bg: "bg-amber-50",
      textColor: "text-slate-900"
    },
    {
      title: "Fast Launch",
      desc: "Our signature 14-day turnaround from concept to live deployment.",
      icon: <Zap size={28} />,
      size: "md:col-span-2",
      bg: "bg-white border-2 border-slate-100",
      textColor: "text-slate-900"
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-white px-6 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ color: colors.forestGreen }}
              className="font-bold tracking-[0.2em] uppercase text-xs block mb-4"
            >
              Our Expertise
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
              Services built to <br /> 
              <span style={{ color: colors.forestGreen }}>scale your vision.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-xs border-l-2 border-slate-100 pl-6">
            We don't just build sites; we build digital assets that drive revenue.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`${service.size} ${service.bg} ${service.textColor} p-8 lg:p-10 rounded-[2.5rem] flex flex-col justify-between group cursor-pointer transition-all duration-300 shadow-sm hover:shadow-2xl`}
            >
              <div>
                <div className={`p-4 w-fit rounded-2xl mb-8 ${service.bg === 'bg-slate-900' ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                  {React.cloneElement(service.icon, { 
                    style: { color: service.bg === 'bg-slate-900' ? 'white' : colors.forestGreen } 
                  })}
                </div>
                <h3 className="text-2xl lg:text-3xl font-black mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className={`text-sm lg:text-base font-medium leading-relaxed ${service.bg === 'bg-slate-900' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {service.desc}
                </p>
              </div>

              <div className="mt-12 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                </span>
                <div className={`p-3 rounded-full transition-transform group-hover:rotate-45 ${service.bg === 'bg-slate-900' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;