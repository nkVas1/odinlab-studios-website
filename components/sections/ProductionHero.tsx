"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function ProductionHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* Фоновая текстура пленки */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{
             backgroundImage: "url(data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E)",
             backgroundSize: "2px 2px"
           }}>
      </div>

      {/* Виньетка (затемнение края) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.8))] pointer-events-none" />

      {/* Основной контент */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          
          {/* Верхний текст */}
          <motion.p 
            className="font-mono text-sm tracking-[0.3em] text-odin-gold uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            OdinLab Production Presents
          </motion.p>

          {/* Главный заголовок */}
          <motion.h1 
            className="font-display text-7xl md:text-9xl font-bold text-white mb-8 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            VISUAL<br />STORIES
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Кинематографический видеопродакшн высочайшего качества
          </motion.p>

          {/* Кнопка Play */}
          <motion.button 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-odin-gold text-odin-gold hover:bg-odin-gold hover:text-black transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 fill-current" />
          </motion.button>

        </motion.div>

      </div>

      {/* Нижний текст (кредиты) */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 text-center text-gray-600 text-sm font-mono space-y-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p>Est. 2025</p>
        <p>Dir. N. Vasilyuk</p>
        <p>Loc. Moscow</p>
      </motion.div>

    </section>
  );
}
