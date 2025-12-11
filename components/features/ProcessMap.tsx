"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket, BarChart } from "lucide-react";

const STEPS = [
  { id: 1, title: "Discovery", icon: <Search />, desc: "Погружение в бизнес-процессы, анализ конкурентов и поиск инсайтов." },
  { id: 2, title: "Design", icon: <PenTool />, desc: "Создание визуального языка, прототипирование UI/UX и анимаций." },
  { id: 3, title: "Develop", icon: <Code />, desc: "Написание чистого кода, интеграция API и настройка CMS." },
  { id: 4, title: "Launch", icon: <Rocket />, desc: "Тестирование, деплой на сервера и финальная оптимизация." },
  { id: 5, title: "Scale", icon: <BarChart />, desc: "Аналитика, поддержка и развитие продукта на основе данных." },
];

export default function ProcessMap() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 bg-odin-dark overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="mb-20 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Путь к <span className="text-odin-gold">Совершенству</span>
          </h2>
          <p className="text-odin-muted text-lg max-w-2xl mx-auto">
            Мы превратили хаос творчества в системный инженерный процесс. 
            Каждый этап — это фундамент для следующего.
          </p>
        </div>

        {/* Интерактивная Линия Времени */}
        <div className="relative">
          {/* Соединительная Линия (Фон) */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden md:block" />
          
          {/* Прогресс Линия (Активная) */}
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-odin-gold -translate-y-1/2 hidden md:block origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (activeStep - 1) / (STEPS.length - 1) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {STEPS.map((step) => (
              <div 
                key={step.id} 
                className="group relative flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setActiveStep(step.id)}
                onClick={() => setActiveStep(step.id)}
              >
                {/* Точка на линии */}
                <motion.div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                    activeStep >= step.id 
                      ? "bg-odin-gold border-odin-gold text-black" 
                      : "bg-odin-dark border-white/20 text-gray-500 group-hover:border-white/50"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {step.icon}
                </motion.div>

                {/* Контент */}
                <div className="mt-6 text-center">
                  <h3 className={`font-bold text-lg mb-2 transition-colors ${
                    activeStep >= step.id ? "text-white" : "text-gray-500"
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Описание (появляется только у активного) */}
                  <div className="h-24 md:h-auto">
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: activeStep === step.id ? 1 : 0,
                        height: activeStep === step.id ? "auto" : 0
                      }}
                      className="text-sm text-gray-400 max-w-[200px] mx-auto hidden md:block"
                    >
                      {step.desc}
                    </motion.p>
                    {/* Мобильная версия описания (всегда видна) */}
                    <p className="text-sm text-gray-400 block md:hidden">
                        {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
